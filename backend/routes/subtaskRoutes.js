import express from 'express';
import {
  createSubtask,
  getSubtasks,
  updateSubtask,
  deleteSubtask,
} from '../controllers/subtaskController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createSubtask)
  .get(getSubtasks);

router.route('/:id')
  .put(updateSubtask)
  .delete(deleteSubtask);

export default router;
