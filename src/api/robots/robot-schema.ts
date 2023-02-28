import mongoose, { Schema } from 'mongoose';

export interface Robot {
  id: string;
  name: string;
  imgUrl: string;
  characteristics: {
    speed: number;
    endurance: number;
    creationDate: Date;
  };
}

const robotSchema = new Schema<Robot>({
  id: String,
  name: String,
  imgUrl: String,
  characteristics: {
    speed: Number,
    endurance: Number,
    creationDate: Date,
  },
});

export const RobotModel = mongoose.model<Robot>('Robot', robotSchema, 'robots');
