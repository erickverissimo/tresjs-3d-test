import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import logRouter from './middlewares/logRouter';

const app = express();

app.use(cors());
app.use(logRouter);
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

export default app;
