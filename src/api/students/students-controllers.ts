import { RequestHandler } from 'express';
import crypto from 'node:crypto';
import { StudentModel } from './student-schema.js';
import { Student } from './students-model.js';

export const getStudentsController: RequestHandler = async (_req, res) => {
  try {
    const foundStudents = await StudentModel.find({});
    res.json(foundStudents);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createStudentController: RequestHandler = async (req, res) => {
  const id = crypto.randomUUID();
  const student: Student = {
    id,
    ...req.body,
  };
  try {
    await StudentModel.create(student);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getStudentByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await StudentModel.findById(id);
    if (student === null) {
      res.sendStatus(404);
    } else {
      res.json(student);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateStudentByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const dbRes = await StudentModel.updateOne({ _id: id }, { ...req.body });
    if (dbRes.matchedCount === 0) {
      res.sendStatus(404);
    }

    if (dbRes.modifiedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteStudentByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const dbRes = await StudentModel.deleteOne({ _id: id });
    if (dbRes.deletedCount === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
