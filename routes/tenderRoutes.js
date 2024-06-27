import { Router } from 'express';
import { createTender, getTenders, getAvailableTenders } from '../controllers/tenderController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authenticate, authorize(['admin']), createTender);
router.get('/', authenticate, authorize(['admin']), getTenders);
router.get('/available', authenticate, authorize(['user', 'admin']), getAvailableTenders);

export default router;
