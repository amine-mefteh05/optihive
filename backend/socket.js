import Message from './models/Message.js';
import Notification from './models/Notification.js';
import socketAuthMiddleware from './middlewares/socket.middleware.js';

export default function socketHandler(io) {

  // ─── Middleware JWT pour Socket.io ──────────────────────────────────────────
  // Vérifie le token avant chaque connexion socket
  io.use(socketAuthMiddleware);

  // ─── Connexion d'un utilisateur ─────────────────────────────────────────────
  io.on('connection', (socket) => {
    console.log(`⚡ Socket connected: ${socket.user.name} (${socket.user.id})`);

    // ─── Join rooms ────────────────────────────────────────────────────────
    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`🔌 ${socket.user.name} joined room: ${room}`);
    });

    socket.on('leaveRoom', (room) => {
      socket.leave(room);
      console.log(`🚶 ${socket.user.name} left room: ${room}`);
    });

    // ─── Envoyer un message dans une room (Chat) ───────────────────────────
    socket.on('sendMessage', async ({ projectId, message }) => {
      if (!projectId || !message) {
        return socket.emit('error', { message: 'projectId and message are required' });
      }

      const room = `project_${projectId}`;

      try {
        // Enregistrer en DB
        const savedMessage = await Message.create({
          project: projectId,
          sender: socket.user._id,
          content: message,
        });

        const populatedMsg = await savedMessage.populate('sender', 'name email role');

        // Broadcaster à la room
        io.to(room).emit('newMessage', populatedMsg);
      } catch (err) {
        console.error('Socket message error:', err);
      }
    });

    // ─── Envoyer une Notification en temps réel ────────────────────────────
    socket.on('sendNotification', async (data) => {
      // payload: { type, message, recipient, project, task }
      try {
        const notif = await Notification.create(data);
        // Emits to a personal room `user_12345`
        io.to(`user_${data.recipient}`).emit('newNotification', notif);
      } catch (err) {
        console.error('Socket Notification Error:', err);
      }
    });

    // ─── Typing indicator ──────────────────────────────────────────────────
    socket.on('typing', (projectId) => {
      const room = `project_${projectId}`;
      socket.to(room).emit('userTyping', {
        userId: socket.user._id,
        name: socket.user.name,
      });
    });

    socket.on('stopTyping', (projectId) => {
      const room = `project_${projectId}`;
      socket.to(room).emit('userStoppedTyping', {
        userId: socket.user._id,
        name: socket.user.name,
      });
    });

    // ─── Déconnexion ───────────────────────────────────────────────────────
    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.user.name}`);
    });
  });
}