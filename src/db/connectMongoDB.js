// / Library
import mongoose from 'mongoose';
// / Model
import { Student } from '../models/student.js';

export const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    await mongoose.connect(mongoUri);

    console.log('✅ MongoDB connection established successfully');

    await Student.syncIndexes();
    console.log('Indexes synced successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);

    process.exit(1); // abnormal termination of the program
  }
};
