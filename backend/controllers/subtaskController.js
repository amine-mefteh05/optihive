import Subtask from '../models/Subtask.js';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const isProjectMember = async (taskId, userId) => {
  const task = await Task.findById(taskId);
  if (!task) return false;
  const project = await Project.findById(task.project);
  if (!project) return false;
  return (
    project.owner.toString() === userId ||
    project.members.some((m) => m.toString() === userId)
  );
};

// POST /api/subtasks
export const createSubtask = asyncHandler(async (req, res) => {
  const { title, task, assignedTo, status } = req.body;
  if (!title || !task) return res.status(400).json({ message: 'Title and Task ID are required' });

  const authorized = await isProjectMember(task, req.user.id);
  if (!authorized) return res.status(403).json({ message: 'Access denied to this task' });

  const subtask = await Subtask.create({ title, task, assignedTo, status });
  
  if (assignedTo) await subtask.populate('assignedTo', 'name email');
  
  res.status(201).json({ message: 'Subtask created', subtask });
});

// GET /api/subtasks?task=taskId
export const getSubtasks = asyncHandler(async (req, res) => {
  const { task } = req.query;
  if (!task) return res.status(400).json({ message: 'Task ID is required' });

  const authorized = await isProjectMember(task, req.user.id);
  if (!authorized) return res.status(403).json({ message: 'Access denied to this task' });

  const subtasks = await Subtask.find({ task }).populate('assignedTo', 'name email').sort({ createdAt: 1 });
  res.status(200).json({ subtasks });
});

// PUT /api/subtasks/:id
export const updateSubtask = asyncHandler(async (req, res) => {
  const subtask = await Subtask.findById(req.params.id);
  if (!subtask) return res.status(404).json({ message: 'Subtask not found' });

  const authorized = await isProjectMember(subtask.task, req.user.id);
  if (!authorized) return res.status(403).json({ message: 'Access denied' });

  const { title, status, assignedTo } = req.body;
  
  const updated = await Subtask.findByIdAndUpdate(
    req.params.id,
    { title, status, assignedTo },
    { new: true, runValidators: true }
  ).populate('assignedTo', 'name email');

  res.status(200).json({ message: 'Subtask updated', subtask: updated });
});

// DELETE /api/subtasks/:id
export const deleteSubtask = asyncHandler(async (req, res) => {
  const subtask = await Subtask.findById(req.params.id);
  if (!subtask) return res.status(404).json({ message: 'Subtask not found' });

  const authorized = await isProjectMember(subtask.task, req.user.id);
  if (!authorized) return res.status(403).json({ message: 'Access denied' });

  await subtask.deleteOne();
  res.status(200).json({ message: 'Subtask deleted' });
});
