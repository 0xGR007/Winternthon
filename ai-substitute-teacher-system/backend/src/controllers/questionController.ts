import { Request, Response } from 'express';
import axios from 'axios';
import Question from '../models/Question';
import FAQ from '../models/FAQ';
import { AuthRequest } from '../middleware/auth';

// Student submits a question
export async function submitQuestion(req: AuthRequest, res: Response) {
  const { questionText } = req.body;
  if (!questionText) return res.status(400).json({ error: 'questionText required' });

  // Call AI-1: question analyzer
  try {
    const analyzerUrl = process.env.ANALYZER_URL || 'http://localhost:8000/analyze';
    const r = await axios.post(analyzerUrl, { question: questionText });
    const { category, confidenceScore } = r.data;

    // Route logic
    if (category === 'irrelevant') {
      const q = await Question.create({ questionText, category, status: 'irrelevant' });
      return res.json({ status: 'ignored', id: q._id });
    }

    if (category === 'basic' && confidenceScore > 0.8) {
      // check FAQ
      const faqMatch = await FAQ.findOne({ question: { $regex: questionText.split(' ').slice(0,6).join(' '), $options: 'i' } });
      if (faqMatch) {
        const q = await Question.create({ questionText, category, status: 'auto-answered', answer: faqMatch.answer });
        return res.json({ id: q._id, category, answer: faqMatch.answer });
      }
      // else escalate to AI-2
    }

    if (category === 'hard' || (category === 'complex' && confidenceScore < 0.6)) {
      const q = await Question.create({ questionText, category, status: 'teacher-pending' });
      return res.json({ id: q._id, status: 'teacher-pending' });
    }

    // complex -> send to AI Answer engine
    if (category === 'complex') {
      const answerUrl = process.env.ANSWER_URL || 'http://localhost:8001/answer';
      const ans = await axios.post(answerUrl, { question: questionText });
      const aiAnswer: string = ans.data.answer;
      const q = await Question.create({ questionText, category, status: 'ai-answered', answer: aiAnswer });
      return res.json({ id: q._id, category, answer: aiAnswer });
    }

    // fallback: mark as teacher pending
    const q = await Question.create({ questionText, category: 'complex', status: 'teacher-pending' });
    return res.json({ id: q._id, status: 'teacher-pending' });

  } catch (err: any) {
    console.error('analyze error', err.message || err);
    return res.status(500).json({ error: 'analysis failed' });
  }
}

export async function getQuestionById(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const q = await Question.findById(id).lean();
  if (!q) return res.status(404).json({ error: 'not found' });
  res.json(q);
}
