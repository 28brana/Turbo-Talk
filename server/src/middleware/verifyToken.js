import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config.js';

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        if (!token || !token.startsWith('Bearer ')) {
            throw new Error('Invalid token');
        }

        const decoded = jwt.verify(token.split('Bearer ')[1], JWT_SECRET);
        req.userid=decoded.userid;
        next();

    } catch (err) {
        console.log({err})
        return res.status(401).send('Unauthorized');
    }
}

export default verifyToken;
