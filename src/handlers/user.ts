import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            order: [
                ['id', 'ASC']
            ]
        });

        res.json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}

export const blockUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.isBlocked) return;
        user.isBlocked = true;

        await user.save();

        res.json(user.isBlocked);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}
export const unlockUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.isBlocked) return;
        user.isBlocked = false;

        await user.save();

        res.json(user.isBlocked);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.json('The user has been deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong. Try again later' });
    }
}