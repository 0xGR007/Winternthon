import { Schema, model } from 'mongoose';

export type Role = 'student' | 'teacher';

export interface IUser {
  username: string;
  password: string; // hashed
  role: Role;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true }
});

export default model<IUser>('User', userSchema);
