import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new Error('Authentication error: User not found'));
    }

    // Attache l'utilisateur au socket pour l'utiliser partout
    socket.user = user;
    next();

  } catch (err) {
    next(new Error('Authentication error: Invalid token'));
  }
};

export default socketAuthMiddleware;
