import express from 'express';
import {
  createStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  updateStudentByIdController,
} from './students-controllers.js';

const router = express.Router();

router.route('/').get(getStudentsController).post(createStudentController);

router
  .route('/:id')
  .get(getStudentByIdController)
  .patch(updateStudentByIdController)
  .delete(deleteStudentByIdController);

export default router;
