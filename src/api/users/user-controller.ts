import { RequestHandler } from 'express';
import { UserLocalsAuthInfo } from '../auth/auth-types.js';
import { User, UserModel } from './user-schema.js';

export const getUserInfoController: RequestHandler<
  never,
  Omit<User, 'password'>,
  never,
  never,
  UserLocalsAuthInfo
> = async (_req, res) => {
  const { email } = res.locals;
  const user = await UserModel.findOne(
    { email },
    { password: 0, __v: 0, id: 0 },
  )
    .populate('student')
    .exec();

  if (user !== null) {
    return res.json(user);
  }

  res.sendStatus(404);
};

export const addStudentByIdController: RequestHandler<
  { idStudent: string },
  never,
  never,
  never,
  UserLocalsAuthInfo
> = async (req, res) => {
  const { email } = res.locals;
  const { idStudent } = req.params;
  const resDb = await UserModel.updateOne(
    { email },
    { student: idStudent },
  ).exec();
  if (resDb.matchedCount === 0) {
    return res.sendStatus(404);
  }

  if (resDb.modifiedCount === 1) {
    return res.sendStatus(204);
  }

  res.sendStatus(500);
};
