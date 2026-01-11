import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import FAQ from './models/FAQ';
import Question from './models/Question';
import bcrypt from 'bcryptjs';

dotenv.config();

async function seed() {
  const uri = process.env.MONGO_URL || 'mongodb://localhost:27017/ai_substitute';
  await mongoose.connect(uri);
  console.log('Seeding DB...');

  await User.deleteMany({});
  await FAQ.deleteMany({});
  await Question.deleteMany({});

  const tpass = bcrypt.hashSync('teacherpass', 8);
  const spass = bcrypt.hashSync('studentpass', 8);

  await User.create({ username: 'teacher1', password: tpass, role: 'teacher' });
  await User.create({ username: 'student1', password: spass, role: 'student' });

  await FAQ.create({ question: 'What is a variable?', answer: 'A variable stores a value, like a box labeled with a name.' });
  await FAQ.create({ question: 'What is a function?', answer: 'A function is a reusable block of code that performs a task.' });

  console.log('Done.');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
