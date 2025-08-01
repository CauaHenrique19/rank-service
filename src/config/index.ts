import { config } from 'dotenv';

config();

export const CONFIG = {
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT)
    : 5432,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3003,
  NODE_ENV: process.env.NODE_ENV?.trim(),
  SERVICE_NAME: process.env.SERVICE_NAME,
  KAFKA_BROKER_HOST: process.env.KAFKA_BROKER_HOST || 'localhost:9092',
};
