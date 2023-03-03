import mongoose, { Schema } from 'mongoose';
import { Student } from '../students/student-schema';

export interface User {
  email: string;
  password: string;
  profileURL: string;
  student: Student;
}

const userSchema = new Schema<User>({
  email: String,
  password: String,
  profileURL: String,
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
