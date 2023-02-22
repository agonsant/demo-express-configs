import express from 'express';
import studentsRouter from './students/students-router.js';

const router = express.Router();

router.use('/students', studentsRouter);

export default router;
