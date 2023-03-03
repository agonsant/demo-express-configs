import { RequestHandler } from 'express';
import {
  PROFILE_BUCKET_NAME,
  supabase,
} from '../../database/supabase-client.js';
import log from '../../logger.js';
import { UserLocalsAuthInfo } from '../auth/auth-types.js';
import { User, UserModel } from './user-schema.js';

export const getUserInfoController: RequestHandler<
  {},
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

export const updateUserProfileController: RequestHandler<
  never,
  never,
  never,
  never,
  UserLocalsAuthInfo
> = async (req, res) => {
  const { email } = res.locals;
  const fileBuffer = req.file?.buffer;
  if (fileBuffer !== undefined) {
    const fileName = `${email}${Date.now()}${req.file?.originalname}`;
    const { error } = await supabase.storage
      .from(PROFILE_BUCKET_NAME)
      .upload(fileName, fileBuffer);
    log.info('Error from supabase', error);
    if (error === null) {
      const { data } = supabase.storage
        .from(PROFILE_BUCKET_NAME)
        .getPublicUrl(fileName);
      log.info('Public URL generated', data.publicUrl);
      const dbRes = await UserModel.updateOne(
        { email },
        { profileURL: data.publicUrl },
      ).exec();
      log.info('Users modified', dbRes.modifiedCount);
      if (dbRes.modifiedCount === 1) {
        return res.sendStatus(204);
      }
    }
  }

  res.sendStatus(500);
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
