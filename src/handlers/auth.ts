import { Request, Response } from 'express'
import User from '../models/User';
import Token from '../models/Token';
import { hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';

export const registerUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            const error = new Error('User is already registered');
            return res.status(409).json({ error: error.message });
        }

        const user = await User.create({
            ...req.body,
            password: await hashPassword(password),
        });

        await Token.create({
            token: generateToken(),
            userId: user.id,
        });

        res.json({ data: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}