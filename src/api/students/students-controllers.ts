import crypto from 'node:crypto';
import { RequestHandler } from 'express';
import { createStudent, findAll, findById, Student } from './students-model.js';

export const getStudentsController: RequestHandler = (_req, res) => {
  res.json(findAll());
};

export const createStudentController: RequestHandler = (req, res) => {
  const id = crypto.randomUUID();
  const student: Student = {
    id,
    ...req.body,
  };
  createStudent(student);
  res.status(201).json(student);
};

export const getStudentByIdController: RequestHandler = (req, res) => {
  const { id } = req.params;
  const student = findById(id);
  if (student === undefined) {
    res.sendStatus(404);
  } else {
    res.json(student);
  }
};

export const updateStudentByIdController: RequestHandler = (req, res) => {
  res.sendStatus(405);
};

export const deleteStudentByIdController: RequestHandler = (req, res) => {
  res.sendStatus(405);
};
