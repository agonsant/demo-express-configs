import express from 'express';
import cors from 'cors';
import apiRouter from './api/api-router.js';
import { authMiddleware } from './api/auth/auth-middleware.js';
import authRouter from './api/auth/auth-router.js';
import { appErrorHandler } from './errors/error-handler.js';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});
app.use(express.json());
app.use('/auth', authRouter);
app.use('/api/v1', authMiddleware, apiRouter);

app.use(appErrorHandler);

export default app;
