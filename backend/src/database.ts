import mongoose from 'mongoose';
import logger from './logger';
import { Environment } from './config/environment';

const mongoUrl = Environment.getDBUrl();

export async function connectDatabase() {
  logger.info(`Conectando ao banco de dados: ${mongoUrl}`);

  return mongoose.connect(mongoUrl);
}

export async function closeConnection(): Promise<void> {
  return mongoose.disconnect();
}
