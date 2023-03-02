import express from 'express';
import { updateRobotByIdController } from './robots-controller.js';

const router = express.Router();

router.route('/:idRobot').put(updateRobotByIdController);

export default router;
