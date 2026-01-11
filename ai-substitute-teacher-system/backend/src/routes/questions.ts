import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { submitQuestion, getQuestionById } from '../controllers/questionController';

const router = Router();

// Student submits question (anonymous allowed)
router.post('/', authMiddleware('student'), submitQuestion);
router.get('/:id', authMiddleware(), getQuestionById);

export default router;
