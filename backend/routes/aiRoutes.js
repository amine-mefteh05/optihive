import express from 'express';
import { getAiSuggestions } from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/prioritization', getAiSuggestions);

export default router;
