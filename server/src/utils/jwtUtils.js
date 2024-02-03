import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';

export const generateToken = (userId) => {
  const secretKey = JWT_SECRET;
  const expiresIn = '1h'; 

  const payload = {
    userId,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};


