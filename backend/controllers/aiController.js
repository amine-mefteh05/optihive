import Task from '../models/Task.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/ai/prioritization
// Heuristic-based "AI" prioritization suggestion engine
export const getAiSuggestions = asyncHandler(async (req, res) => {
  // Find all uncompleted tasks for the user
  const tasks = await Task.find({
    assignedTo: req.user.id,
    status: { $nin: ['completed', 'in-review'] }
  }).populate('project', 'title');

  if (tasks.length === 0) {
    return res.status(200).json({ suggestions: [], message: 'No pending tasks to prioritize.' });
  }

  // Scoring weights
  const PRIORITY_WEIGHT = { high: 50, medium: 20, low: 5 };
  
  // Scorer
  const scoredTasks = tasks.map(task => {
    let score = 0;
    let reasons = [];

    // 1. Base Priority
    score += PRIORITY_WEIGHT[task.priority] || 10;
    reasons.push(task.priority === 'high' ? 'High priority task' : 'Medium priority');

    // 2. Deadline proximity
    if (task.deadline) {
      const daysLeft = Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24));
      if (daysLeft < 0) {
        score += 100;
        reasons.push('Overdue (Urgent)');
      } else if (daysLeft <= 2) {
        score += 60;
        reasons.push('Deadline approaching very soon');
      } else if (daysLeft <= 7) {
        score += 30;
        reasons.push('Due this week');
      }
    } else {
      reasons.push('No deadline set');
    }

    // 3. Status momentum
    if (task.status === 'in-progress') {
      score += 15;
      reasons.push('Already in progress (keep momentum)');
    }

    return {
      task,
      score,
      reasons,
    };
  });

  // Sort by highest score first
  scoredTasks.sort((a, b) => b.score - a.score);

  // Return the top 3 suggestions
  const topSuggestions = scoredTasks.slice(0, 3).map(s => ({
    taskId: s.task._id,
    title: s.task.title,
    project: s.task.project?.title || 'Unknown Project',
    status: s.task.status,
    priority: s.task.priority,
    deadline: s.task.deadline,
    aiScore: s.score,
    aiReasoning: s.reasons.join(', ')
  }));

  res.status(200).json({
    message: 'AI analyzed your workload.',
    suggestions: topSuggestions
  });
});
