import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
        req.user = { userId: decoded.userId, email: decoded.email };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Veuillez vous authentifier.' });
    }
};