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

export const verifyJWTToken = (token) => {
  if (!token || !token.startsWith('Bearer ')) {
    throw new Error('Invalid token');
  }

  const decoded = jwt.verify(token.split('Bearer ')[1], JWT_SECRET);

  return decoded;
}

