import { RequestHandler } from 'express';
import crypto from 'node:crypto';
import { CustomHTTPError } from '../../errors/custom-http-error.js';
import logger from '../../logger.js';
import { UserModel } from '../users/user-schema.js';
import { AuthRequest, LoginResponse } from './auth-types.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

export const registerUserController: RequestHandler<
  unknown,
  unknown,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  logger.debug(`User ${email} is trying to register`);

  const existingDbUser = await UserModel.findOne({ email }).exec();
  if (existingDbUser !== null) {
    throw new CustomHTTPError(409, 'User is already registered in app');
  }

  const user = {
    id: crypto.randomUUID(),
    email,
    password: encryptPassword(password),
  };
  await UserModel.create(user);
  res.sendStatus(201);
};

export const loginUserController: RequestHandler<
  unknown,
  LoginResponse,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  const filterUser = {
    email,
    password: encryptPassword(password),
  };

  const existingUser = await UserModel.find(filterUser).exec();

  if (existingUser === null) {
    throw new CustomHTTPError(404, 'User or password does not exists');
  }

  const tokenJWT = generateJWTToken(email);
  res.status(201).json({
    accessToken: tokenJWT,
  });
};
