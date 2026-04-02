import Message from '../models/Message.js';
import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/chat/:projectId
export const getMessages = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  // Only project members can read chat
  const isMember = (
    project.owner.toString() === req.user.id ||
    project.members.some(m => m.toString() === req.user.id)
  );

  if (!isMember && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const messages = await Message.find({ project: projectId })
    .populate('sender', 'name email role')
    .sort({ createdAt: 1 })
    .limit(100);

  res.status(200).json({ messages });
});
