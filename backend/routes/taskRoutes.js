import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Toutes les routes tasks nécessitent un JWT valide
router.use(protect);

// POST   /api/tasks        → créer une tâche
// GET    /api/tasks        → lister les tâches (?project=id&feature=id&status=todo)
router.route('/').post(createTask).get(getTasks);

// GET    /api/tasks/:id    → détail d'une tâche
// PUT    /api/tasks/:id    → modifier une tâche
// DELETE /api/tasks/:id    → supprimer une tâche
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

export default router;