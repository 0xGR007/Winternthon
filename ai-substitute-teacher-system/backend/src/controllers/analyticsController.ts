import { Request, Response } from 'express';
import Question from '../models/Question';

export async function analytics(req: Request, res: Response) {
  const total = await Question.countDocuments();
  const byCategory = await Question.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  const byStatus = await Question.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  res.json({ total, byCategory, byStatus });
}
