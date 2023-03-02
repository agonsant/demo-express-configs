import express from 'express';
import {
  addStudentByIdController,
  getUserInfoController,
} from './user-controller.js';

const router = express.Router();

router.route('/').get(getUserInfoController);

router.route('/student/:idStudent').patch(addStudentByIdController);

export default router;
