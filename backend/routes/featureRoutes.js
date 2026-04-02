import express from 'express';
import {
  createFeature,
  getFeatures,
  getFeatureById,
  updateFeature,
  deleteFeature,
} from '../controllers/featureController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Toutes les routes features nécessitent un JWT valide
router.use(protect);

// POST   /api/features        → créer une feature
// GET    /api/features        → lister les features d'un projet (?project=id)
router.route('/').post(createFeature).get(getFeatures);

// GET    /api/features/:id    → détail d'une feature
// PUT    /api/features/:id    → modifier une feature
// DELETE /api/features/:id    → supprimer une feature
router.route('/:id').get(getFeatureById).put(updateFeature).delete(deleteFeature);

export default router;