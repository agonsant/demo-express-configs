import express from 'express';
import studentsRouter from './students/students-router.js';
import robotsRouter from './robots/robots-router.js';

const router = express.Router();

router.use('/students', studentsRouter);
router.use('/robots', robotsRouter);

export default router;
