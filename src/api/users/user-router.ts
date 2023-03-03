import express from 'express';
import { upload } from './avatar-upload-middleware.js';
import {
  addStudentByIdController,
  getUserInfoController,
  updateUserProfileController,
} from './user-controller.js';

const router = express.Router();

router.route('/').get(getUserInfoController);

router.route('/student/:idStudent').patch(addStudentByIdController);

router
  .route('/avatar')
  .patch(upload.single('profileAvatar'), updateUserProfileController);

export default router;
