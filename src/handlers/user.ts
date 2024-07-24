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

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();

        res.json({ data: users });

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}

export const toggleBlockStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({ data: user.isBlocked });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.json({ data: 'The user has been deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}