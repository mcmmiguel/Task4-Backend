import jwt from 'jsonwebtoken';
import User from '../models/User';

type UserPayload = {
    id: User['id'];
}

export const generateJWT = (payload: UserPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    return token;
}