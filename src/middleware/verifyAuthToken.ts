import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        jwt.verify(token as string, process.env.TOKEN_SECRET as string);

        next();
    } catch (err) {
        res.status(401).json('Access denied, invalid token');
    }
};
