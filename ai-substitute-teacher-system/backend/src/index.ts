import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import questionRoutes from './routes/questions';
import teacherRoutes from './routes/teacher';
import analyticsRoutes from './routes/analytics';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/teacher', teacherRoutes);
app.use('/analytics', analyticsRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/ai_substitute';
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  }
}

start();
