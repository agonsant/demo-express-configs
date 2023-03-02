import express from 'express';
import studentsRouter from './students/students-router.js';
import robotsRouter from './robots/robots-router.js';
import userRouter from './users/user-router.js';

const router = express.Router();

router.use('/students', studentsRouter);
router.use('/robots', robotsRouter);
router.use('/user', userRouter);

export default router;
