import { Schema, model } from 'mongoose';

export type Category = 'basic' | 'complex' | 'hard' | 'irrelevant';
export type Status = 'auto-answered' | 'ai-answered' | 'teacher-pending' | 'irrelevant';

export interface IQuestion {
  questionText: string;
  category: Category;
  status: Status;
  createdAt: Date;
  answer?: string;
}

const questionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  category: { type: String, enum: ['basic', 'complex', 'hard', 'irrelevant'], required: true },
  status: { type: String, enum: ['auto-answered', 'ai-answered', 'teacher-pending', 'irrelevant'], required: true },
  createdAt: { type: Date, default: () => new Date() },
  answer: { type: String }
});

export default model<IQuestion>('Question', questionSchema);
