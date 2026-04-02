import Feature from '../models/Feature.js';
import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const FEATURE_ALLOWED_FIELDS = ['title', 'description', 'status', 'priority', 'deadline'];

const pickFields = (body, fields) =>
  Object.fromEntries(fields.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]));

const isProjectMember = (project, userId) =>
  project.owner.toString() === userId ||
  project.members.some((m) => m.toString() === userId);

// POST /api/features
export const createFeature = asyncHandler(async (req, res) => {
  const { title, description, status, priority, deadline, project } = req.body;

  if (!title) return res.status(400).json({ message: 'Feature title is required' });
  if (!project) return res.status(400).json({ message: 'Project ID is required' });

  const existingProject = await Project.findById(project);
  if (!existingProject) return res.status(404).json({ message: 'Project not found' });
  if (!isProjectMember(existingProject, req.user.id))
    return res.status(403).json({ message: 'Access denied to this project' });

  const feature = await Feature.create({
    title, description, status, priority, deadline, project,
    createdBy: req.user.id,
  });

  await feature.populate('createdBy', 'name email');
  await feature.populate('project', 'title');

  res.status(201).json({ message: 'Feature created successfully', feature });
});

// GET /api/features?project=projectId
export const getFeatures = asyncHandler(async (req, res) => {
  const { project, status, priority } = req.query;
  if (!project) return res.status(400).json({ message: 'Project ID is required' });

  const filter = { project };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const features = await Feature.find(filter)
    .populate('createdBy', 'name email')
    .populate('project', 'title')
    .sort({ createdAt: -1 });

  res.status(200).json({ count: features.length, features });
});

// GET /api/features/:id
export const getFeatureById = asyncHandler(async (req, res) => {
  const feature = await Feature.findById(req.params.id)
    .populate('createdBy', 'name email')
    .populate('project', 'title');

  if (!feature) return res.status(404).json({ message: 'Feature not found' });

  res.status(200).json({ feature });
});

// PUT /api/features/:id
export const updateFeature = asyncHandler(async (req, res) => {
  const feature = await Feature.findById(req.params.id);
  if (!feature) return res.status(404).json({ message: 'Feature not found' });

  const project = await Project.findById(feature.project);
  const isAuthorized =
    feature.createdBy.toString() === req.user.id ||
    project.owner.toString() === req.user.id;

  if (!isAuthorized)
    return res.status(403).json({ message: 'Not authorized to update this feature' });

  const updated = await Feature.findByIdAndUpdate(
    req.params.id,
    pickFields(req.body, FEATURE_ALLOWED_FIELDS),
    { new: true, runValidators: true }
  )
    .populate('createdBy', 'name email')
    .populate('project', 'title');

  res.status(200).json({ message: 'Feature updated successfully', feature: updated });
});

// DELETE /api/features/:id
export const deleteFeature = asyncHandler(async (req, res) => {
  const feature = await Feature.findById(req.params.id);
  if (!feature) return res.status(404).json({ message: 'Feature not found' });

  const project = await Project.findById(feature.project);
  const isAuthorized =
    feature.createdBy.toString() === req.user.id ||
    project.owner.toString() === req.user.id;

  if (!isAuthorized)
    return res.status(403).json({ message: 'Not authorized to delete this feature' });

  await feature.deleteOne();
  res.status(200).json({ message: 'Feature deleted successfully' });
});