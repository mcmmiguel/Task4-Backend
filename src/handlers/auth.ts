import { Request, Response } from 'express'
import User from '../models/User';
import Token from '../models/Token';
import { checkPassword, hashPassword } from '../utils/auth';
import { generateToken } from '../utils/token';
import { generateJWT } from '../utils/jwt';

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

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        const isPasswordCorrect = await checkPassword(password, user.password);

        if (!isPasswordCorrect) res.status(401).json({ error: 'Invalid password' });

        // Generar JWT
        const token = generateJWT({ id: user.id });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}