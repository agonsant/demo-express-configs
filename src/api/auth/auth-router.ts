import express from 'express';
import { validate } from 'express-validation';
import {
  loginUserController,
  registerUserController,
} from './auth-controller.js';
import { authValidation } from './auth-validations.js';

const router = express.Router();

router.use(validate(authValidation, {}, {}));

router.route('/register').post(registerUserController);

router.route('/login').post(loginUserController);

export default router;
