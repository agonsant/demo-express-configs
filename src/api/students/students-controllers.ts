import { RequestHandler } from 'express';
import crypto from 'node:crypto';
import { CustomHTTPError } from '../../errors/custom-http-error.js';
import log from '../../logger.js';
import { Student, StudentModel } from './student-schema.js';

const queryProjection = { __v: 0, subjects: 0 };

export const getStudentsController: RequestHandler = async (_req, res) => {
  const foundStudents = await StudentModel.find({}, queryProjection).exec();
  res.json(foundStudents);
};

export const createStudentController: RequestHandler<
  unknown,
  Student,
  Omit<Student, 'id'>
> = async (req, res) => {
  const id = crypto.randomUUID();
  const student: Student = {
    id,
    ...req.body,
  };
  await StudentModel.create(student);
  res.status(201).json(student);
};

export const getStudentByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { email } = res.locals;
  log.debug(`The email in the request is ${email}. Use with caution`);
  const student = await StudentModel.findById(id, queryProjection).exec();
  if (student === null) {
    throw new CustomHTTPError(404, 'The student does not exists');
  } else {
    res.json(student);
  }
};

export const updateStudentByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const dbRes = await StudentModel.updateOne(
    { _id: id },
    { ...req.body },
  ).exec();
  if (dbRes.matchedCount === 0) {
    throw new CustomHTTPError(404, 'The student does not exists');
  }

  if (dbRes.modifiedCount === 1) {
    res.sendStatus(204);
  } else {
    throw new CustomHTTPError(
      500,
      'An unknown error with student in database occurs. Try later',
    );
  }
};

export const deleteStudentByIdController: RequestHandler<{
  id: string;
}> = async (req, res) => {
  const { id } = req.params;
  const dbRes = await StudentModel.deleteOne({ _id: id }).exec();
  if (dbRes.deletedCount === 0) {
    throw new CustomHTTPError(404, 'The student does not exists');
  } else {
    res.sendStatus(204);
  }
};
