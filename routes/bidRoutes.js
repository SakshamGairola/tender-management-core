import { Router } from 'express';
import { createBid, getBids } from '../controllers/bidController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authenticate, authorize(['user']), createBid);
router.post('/byTender', authenticate, authorize(['user']), getBids);

export default router;
