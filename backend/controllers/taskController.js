import Task from '../models/Task.js';
import Feature from '../models/Feature.js';
import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const TASK_ALLOWED_FIELDS = ['title', 'description', 'status', 'priority', 'deadline', 'assignedTo'];

const pickFields = (body, fields) =>
  Object.fromEntries(fields.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]));

const isProjectMember = (project, userId) =>
  project.owner.toString() === userId ||
  project.members.some((m) => m.toString() === userId);

const populateTask = (query) =>
  query
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .populate('feature', 'title')
    .populate('project', 'title');

// POST /api/tasks
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, deadline, assignedTo, feature, project } = req.body;

  if (!title) return res.status(400).json({ message: 'Task title is required' });
  if (!feature) return res.status(400).json({ message: 'Feature ID is required' });
  if (!project) return res.status(400).json({ message: 'Project ID is required' });

  const [existingFeature, existingProject] = await Promise.all([
    Feature.findById(feature),
    Project.findById(project),
  ]);

  if (!existingFeature) return res.status(404).json({ message: 'Feature not found' });
  if (!existingProject) return res.status(404).json({ message: 'Project not found' });
  if (!isProjectMember(existingProject, req.user.id))
    return res.status(403).json({ message: 'Access denied to this project' });

  const { _id } = await Task.create({
    title, description, status, priority, deadline, assignedTo, feature, project,
    createdBy: req.user.id,
  });

  const task = await populateTask(Task.findById(_id));
  res.status(201).json({ message: 'Task created successfully', task });
});

// GET /api/tasks?project=id&feature=id&status=todo&assignedTo=id
export const getTasks = asyncHandler(async (req, res) => {
  const { project, feature, status, priority, assignedTo } = req.query;

  const filter = {};
  if (project) filter.project = project;
  if (feature) filter.feature = feature;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignedTo) filter.assignedTo = assignedTo;

  const tasks = await populateTask(Task.find(filter)).sort({ createdAt: -1 });

  res.status(200).json({ count: tasks.length, tasks });
});

// GET /api/tasks/:id
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await populateTask(Task.findById(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json({ task });
});

// PUT /api/tasks/:id
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const project = await Project.findById(task.project);
  const isAuthorized =
    task.createdBy.toString() === req.user.id ||
    task.assignedTo?.toString() === req.user.id ||
    project.owner.toString() === req.user.id;

  if (!isAuthorized)
    return res.status(403).json({ message: 'Not authorized to update this task' });

  const updates = pickFields(req.body, TASK_ALLOWED_FIELDS);
  if (updates.status === 'completed') updates.completedAt = new Date();

  const updated = await populateTask(
    Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
  );

  res.status(200).json({ message: 'Task updated successfully', task: updated });
});

// DELETE /api/tasks/:id
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const project = await Project.findById(task.project);
  const isAuthorized =
    task.createdBy.toString() === req.user.id ||
    project.owner.toString() === req.user.id;

  if (!isAuthorized)
    return res.status(403).json({ message: 'Not authorized to delete this task' });

  await task.deleteOne();
  res.status(200).json({ message: 'Task deleted successfully' });
});