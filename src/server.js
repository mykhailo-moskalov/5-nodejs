// / Libraries
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
// / Database
import { connectMongoDB } from './db/connectMongoDB.js';
// / Middlewares
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
// / Routes
import studentsRoutes from './routes/studentsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(cors());
app.use(cookieParser());

// ! Routes

app.use(studentsRoutes);
app.use(authRoutes);
app.use(userRoutes);

// ! Middlewares

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// ! Connecting to MongoDB
await connectMongoDB();

// ! Server startup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
