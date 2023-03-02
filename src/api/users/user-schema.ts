import mongoose, { Schema } from 'mongoose';
import { Student } from '../students/student-schema';

export interface User {
  id: string;
  email: string;
  password: string;
  student: Student;
}

const userSchema = new Schema<User>({
  id: String,
  email: String,
  password: String,
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
