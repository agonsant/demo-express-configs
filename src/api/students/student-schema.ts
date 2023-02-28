import mongoose, { Schema } from 'mongoose';

export interface Student {
  id: string;
  name: string;
  score: number;
  subjects: string[];
}

const studentSchema = new Schema<Student>({
  id: String,
  name: String,
  score: Number,
  subjects: [String],
});

export const StudentModel = mongoose.model<Student>(
  'Student',
  studentSchema,
  'students',
);
