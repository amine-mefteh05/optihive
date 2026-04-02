import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const PROJECT_ALLOWED_FIELDS = ['title', 'description', 'status', 'priority', 'dueDate', 'members'];

const pickFields = (body, fields) =>
  Object.fromEntries(fields.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]));

export const getProjects = asyncHandler(async (req, res) => {
  const { status, priority } = req.query;
  const filter = { $or: [{ owner: req.user.id }, { members: req.user.id }] };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const projects = await Project.find(filter)
    .populate('owner', 'name email')
    .populate('members', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({ count: projects.length, projects });
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('owner', 'name email')
    .populate('members', 'name email');

  if (!project) return res.status(404).json({ message: 'Project not found' });

  const isMember =
    project.owner._id.toString() === req.user.id ||
    project.members.some((m) => m._id.toString() === req.user.id);

  if (!isMember) return res.status(403).json({ message: 'Access denied' });

  res.status(200).json({ project });
});

export const createProject = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate, members } = req.body;
  if (!title) return res.status(400).json({ message: 'Project title is required' });

  const project = await Project.create({
    title,
    description,
    status,
    priority,
    dueDate,
    members: members ?? [],
    owner: req.user.id,
  });

  await project.populate('owner', 'name email');
  res.status(201).json({ message: 'Project created successfully', project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (project.owner.toString() !== req.user.id)
    return res.status(403).json({ message: 'Only the project owner can update it' });

  const updates = pickFields(req.body, PROJECT_ALLOWED_FIELDS);
  const updated = await Project.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  })
    .populate('owner', 'name email')
    .populate('members', 'name email');

  res.status(200).json({ message: 'Project updated successfully', project: updated });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (project.owner.toString() !== req.user.id)
    return res.status(403).json({ message: 'Only the project owner can delete it' });

  await project.deleteOne();
  res.status(200).json({ message: 'Project deleted successfully' });
});