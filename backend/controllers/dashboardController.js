import Task from '../models/Task.js';
import Feature from '../models/Feature.js';
import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const countByStatus = (tasks, status) => tasks.filter((t) => t.status === status).length;

const toAlertShape = (task) => ({
  id: task._id,
  title: task.title,
  deadline: task.deadline,
  assignedTo: task.assignedTo?.name ?? 'Unassigned',
  status: task.status,
});

// ─── GET /api/projects/:projectId/dashboard ───────────────────────────────────
export const getProjectDashboard = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId)
    .populate('owner', 'name email')
    .populate('members', 'name email');

  if (!project) return res.status(404).json({ message: 'Project not found' });

  const isMember =
    project.owner._id.toString() === req.user.id ||
    project.members.some((m) => m._id.toString() === req.user.id);

  if (!isMember) return res.status(403).json({ message: 'Access denied' });

  const tasks = await Task.find({ project: projectId })
    .populate('assignedTo', 'name email')
    .populate('feature', 'title status');

  // ─── Task statistics ──────────────────────────────────────────────────────
  const totalTasks = tasks.length;
  const completedTasks = countByStatus(tasks, 'completed');
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // ─── Workload per member ──────────────────────────────────────────────────
  const workloadMap = {};
  for (const task of tasks) {
    if (!task.assignedTo) continue;
    const memberId = task.assignedTo._id.toString();
    workloadMap[memberId] ??= {
      id: memberId,
      name: task.assignedTo.name,
      email: task.assignedTo.email,
      total: 0,
      completed: 0,
      inProgress: 0,
      overdue: 0,
    };
    workloadMap[memberId].total++;
    if (task.status === 'completed') workloadMap[memberId].completed++;
    if (task.status === 'in-progress') workloadMap[memberId].inProgress++;
    if (task.status === 'overdue') workloadMap[memberId].overdue++;
  }

  // ─── Feature progress ─────────────────────────────────────────────────────
  const features = await Feature.find({ project: projectId });
  const featureProgress = features.map((feature) => {
    const featureTasks = tasks.filter(
      (t) => t.feature?._id.toString() === feature._id.toString()
    );
    const featureCompleted = countByStatus(featureTasks, 'completed');
    const featureTotal = featureTasks.length;
    return {
      id: feature._id,
      title: feature.title,
      status: feature.status,
      totalTasks: featureTotal,
      completedTasks: featureCompleted,
      progress: featureTotal > 0 ? Math.round((featureCompleted / featureTotal) * 100) : 0,
    };
  });

  // ─── Alerts ───────────────────────────────────────────────────────────────
  const now = new Date();
  const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const overdue = tasks.filter((t) => t.status === 'overdue').map(toAlertShape);
  const upcoming = tasks
    .filter((t) => t.deadline && t.deadline > now && t.deadline <= in48Hours && t.status !== 'completed')
    .map(toAlertShape);

  // ─── Time evolution ───────────────────────────────────────────────────────
  const completedByDay = {};
  for (const task of tasks.filter((t) => t.completedAt)) {
    const day = task.completedAt.toISOString().split('T')[0];
    completedByDay[day] = (completedByDay[day] || 0) + 1;
  }
  const evolution = Object.entries(completedByDay)
    .map(([date, count]) => ({ date, completed: count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  res.status(200).json({
    project: { id: project._id, title: project.title, status: project.status, owner: project.owner },
    progress,
    tasks: {
      total: totalTasks,
      completed: completedTasks,
      inProgress: countByStatus(tasks, 'in-progress'),
      inReview: countByStatus(tasks, 'in-review'),
      todo: countByStatus(tasks, 'todo'),
      overdue: countByStatus(tasks, 'overdue'),
    },
    workload: Object.values(workloadMap),
    featureProgress,
    alerts: { overdue, upcoming },
    evolution,
  });
});