import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = bearer.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decodedToken === 'object' && decodedToken.id) {
            const user = await User.findByPk(decodedToken.id, {
                attributes: ['id', 'name', 'email'],
            });

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(500).json({ error: 'Invalid token' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Invalid token' });
    }
}

export const verifyStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /*  req.user = if I have JWT - This is for protected routes, less login
            req.body = if I don't have JWT, take the email from the form - LOGIN
            This implementation is complemented by the authentication middleware
        */
        const { email } = req.user || req.body;
        const user = await User.findOne({ where: { email } });
        if (user.isBlocked) return res.status(403).json({ error: 'Account blocked. Please request another user to unlock it.' });

        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ error: 'something went wrong' })
    }
}