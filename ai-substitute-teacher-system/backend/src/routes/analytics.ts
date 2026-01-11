import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { analytics } from '../controllers/analyticsController';

const router = Router();

router.get('/', authMiddleware(), analytics);

export default router;
