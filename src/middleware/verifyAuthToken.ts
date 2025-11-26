import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET = '' } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json('Missing authorization header');
            return;
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, TOKEN_SECRET);
        next();
    } catch (err) {
        res.status(401).json('Access denied, invalid token');
    }
};

export default verifyAuthToken;
