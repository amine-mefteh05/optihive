import express from 'express';
import { generateReport } from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/:projectId', generateReport);

export default router;
