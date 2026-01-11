import { Schema, model } from 'mongoose';

export interface IFAQ {
  question: string;
  answer: string;
  tags?: string[];
}

const faqSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tags: { type: [String], default: [] }
});

export default model<IFAQ>('FAQ', faqSchema);
