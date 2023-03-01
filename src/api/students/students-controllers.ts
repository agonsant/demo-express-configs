import { RequestHandler } from 'express';
import crypto from 'node:crypto';
import log from '../../logger.js';
import { Student, StudentModel } from './student-schema.js';

export const getStudentsController: RequestHandler = async (_req, res) => {
  try {
    const foundStudents = await StudentModel.find({}).exec();
    res.json(foundStudents);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createStudentController: RequestHandler<
  unknown,
  Student | Error,
  Omit<Student, 'id'>
> = async (req, res) => {
  const id = crypto.randomUUID();
  const student: Student = {
    id,
    ...req.body,
  };
  try {
    await StudentModel.create(student);
    res.status(201).json(student);
  } catch (error: any) {
    res.status(500).json(error);
  }
};

export const getStudentByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { email } = res.locals;
  log.debug(`The email in the request is ${email}. Use with caution`);
  try {
    const student = await StudentModel.findById(id).exec();
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
    const dbRes = await StudentModel.updateOne(
      { _id: id },
      { ...req.body },
    ).exec();
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

export const deleteStudentByIdController: RequestHandler<{
  id: string;
}> = async (req, res) => {
  const { id } = req.params;

  try {
    const dbRes = await StudentModel.deleteOne({ _id: id }).exec();
    if (dbRes.deletedCount === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
