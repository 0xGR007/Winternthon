import { Request, Response } from 'express';
import Question from '../models/Question';

let sessionActive = false; // simple in-memory session toggle for demo

export async function startSession(req: Request, res: Response) {
  sessionActive = true;
  return res.json({ sessionActive });
}

export async function endSession(req: Request, res: Response) {
  sessionActive = false;
  return res.json({ sessionActive });
}

export async function listHardQuestions(req: Request, res: Response) {
  const questions = await Question.find({ category: 'hard', status: 'teacher-pending' }).sort({ createdAt: -1 }).lean();
  return res.json({ sessionActive, questions });
}

export async function teacherAnswer(req: Request, res: Response) {
  const { id } = req.params;
  const { answer, dismiss } = req.body;
  const q = await Question.findById(id);
  if (!q) return res.status(404).json({ error: 'not found' });
  if (dismiss) {
    q.status = 'irrelevant';
    await q.save();
    return res.json({ status: 'dismissed' });
  }
  q.answer = answer;
  q.status = 'teacher-pending' ? 'ai-answered' : q.status; // simple: store teacher answer as final
  q.status = 'ai-answered';
  await q.save();
  return res.json({ status: 'answered', id: q._id });
}
