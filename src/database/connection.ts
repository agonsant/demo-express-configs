import mongoose from 'mongoose';

const connectDB = (urlBD: string) => mongoose.connect(urlBD);

export default connectDB;
