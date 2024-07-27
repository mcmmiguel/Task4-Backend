import { Request, Response } from 'express'
import User from '../models/User';
import { checkPassword, hashPassword } from '../utils/auth';
import { generateJWT } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            const error = new Error('User is already registered');
            return res.status(409).json({ error: error.message });
        }

        await User.create({
            ...req.body,
            password: await hashPassword(password),
        });

        res.json('User created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordCorrect = await checkPassword(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ error: 'Invalid password' });

        const token = generateJWT({ id: user.id });

        const currentDate = Date.now();
        user.lastLogin = new Date(currentDate);

        await user.save();

        res.json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}

export const user = async (req: Request, res: Response) => {
    return res.json(req.user);
}
