import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config.js';
import { verifyJWTToken } from '../utils/jwtUtils.js';

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        const decoded = verifyJWTToken(token);
        req.userId = decoded.userId;
        next();

    } catch (err) {
        console.log({ err })
        return res.status(401).send('Unauthorized');
    }
}

export default verifyToken;
