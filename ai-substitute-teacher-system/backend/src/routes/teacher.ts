import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { startSession, endSession, listHardQuestions, teacherAnswer } from '../controllers/teacherController';

const router = Router();

router.post('/session/start', authMiddleware('teacher'), startSession);
router.post('/session/end', authMiddleware('teacher'), endSession);
router.get('/hard', authMiddleware('teacher'), listHardQuestions);
router.post('/questions/:id/answer', authMiddleware('teacher'), teacherAnswer);

export default router;
