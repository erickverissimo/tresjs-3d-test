import 'dotenv/config';
import 'express-async-errors';

import { connectDatabase } from './database';
import app from './app';
import { loadRoutes } from './routes';
import { errorHandler } from './errors/errorHandler';
import logger from './logger';
import http from 'http';
import { Environment } from './config/environment';

const port = Environment.getPort();

async function start() {
  const server = http.createServer(app);

  await connectDatabase();
  await loadRoutes(app);

  app.use(errorHandler);

  server.listen(port, () => logger.info(`Servidor no ar ${port}`));
}

start();
