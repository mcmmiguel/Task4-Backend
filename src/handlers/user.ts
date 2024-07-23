import { Request, Response } from 'express'
import User from '../models/User';
import Token from '../models/Token';
import { hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';

export const registerUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        // Avoid duplicates
        const userExists = await User.findOne(email);

        if (userExists) {
            const error = new Error('User is already registered');
            return res.status(409).json({ error: error.message });
        }

        const user = await User.create(req.body);

        user.password = await hashPassword(password);

        // Generate token
        const token = new Token();
        token.token = generateToken();
        token.userId = user.id;

        await Promise.allSettled([user.save(), token.save()]);

        res.send('Account registered successfully');
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}