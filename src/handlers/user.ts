import { Request, Response } from 'express'
import User from '../models/User';
import Token from '../models/Token';
import { hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';

export const registerUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        // Avoid duplicates
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            const error = new Error('User is already registered');
            return res.status(409).json({ error: error.message });
        }

        // Create user and update password hashed
        const user = await User.create({
            ...req.body,
            password: await hashPassword(password),
        });

        // Generate token
        await Token.create({
            token: generateToken(),
            userId: user.id,
        });

        res.send('Account registered successfully');
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();

        res.json({ data: users });

    } catch (error) {
        console.log(error);
    }
}
