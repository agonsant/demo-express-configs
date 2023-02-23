import mongoose, { Schema } from 'mongoose';

const studentSchema = new Schema({
  id: String,
  name: String,
  score: Number,
  subjects: [String],
});

export const StudentModel = mongoose.model(
  'Student',
  studentSchema,
  'students',
);
