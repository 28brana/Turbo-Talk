import dotenv from 'dotenv';
dotenv.config();

export const MONGO_URL=process.env.MONGO_URL
export const PORT = process.env.PORT
export const JWT_SECRET=process.env.JWT_SECRET;
export const REDIS_HOST=process.env.REDIS_HOST;
export const REDIS_PORT=process.env.REDIS_PORT;
