import express from 'express';
import { getProjectDashboard } from '../controllers/dashboardController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

// GET /api/projects/:projectId/dashboard
router.get('/:projectId/dashboard', getProjectDashboard);

export default router;