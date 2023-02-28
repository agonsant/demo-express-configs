import { RequestHandler } from 'express';
import { Robot, RobotModel } from './robot-schema';

export const updateRobotByIdController: RequestHandler = async (req, res) => {
  const { idRobot } = req.params;
  const filter = { id: idRobot };
  const robotToUpdate: Robot = {
    id: idRobot,
    ...req.body,
  };
  if (robotToUpdate.name === undefined || robotToUpdate.name === null) {
    return res.status(400).json({ message: 'Property name is required' });
  }

  if (robotToUpdate.name.length < 3 || robotToUpdate.name.length > 30) {
    return res.status(400).json({
      message: 'Property name should have length between 3 and 30 characters',
    });
  }

  if (robotToUpdate.imgUrl === undefined || robotToUpdate.imgUrl === null) {
    return res.status(400).json({ message: 'Property imgUrl is required' });
  }

  if (!robotToUpdate.imgUrl.startsWith('https://')) {
    return res
      .status(400)
      .json({ message: 'The imgUrl must be a secure HTTP url' });
  }

  if (
    robotToUpdate.characteristics.speed === undefined ||
    robotToUpdate.characteristics.speed === null
  ) {
    return res.status(400).json({ message: 'Property speed is required' });
  }

  if (
    !(
      robotToUpdate.characteristics.speed >= 1 &&
      robotToUpdate.characteristics.speed <= 10
    )
  ) {
    return res.status(400).json({
      message: 'Property speed should be between 1 and 10',
    });
  }

  const creationDate = new Date(robotToUpdate.characteristics.creationDate);
  const YEAR_MS = 31536000000;
  const OVER_AGE = 18 * YEAR_MS;
  const lowerLimitDate = Date.now() - OVER_AGE;
  if (creationDate.getTime() > lowerLimitDate) {
    return res.status(400).json({
      message: 'Robot should have at least 18 years old',
    });
  }

  try {
    const dbRes = await RobotModel.updateOne(filter, robotToUpdate).exec();
    if (dbRes.matchedCount === 0) {
      return res.sendStatus(404);
    }

    if (dbRes.modifiedCount === 1) {
      return res.json(robotToUpdate);
    }

    return res.sendStatus(500);
  } catch (err) {
    res.status(500).json(err);
  }
};
