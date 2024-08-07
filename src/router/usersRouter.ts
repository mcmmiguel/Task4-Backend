import { Router } from "express";
import { blockUser, deleteUser, getUsers, unlockUser } from "../handlers/user";
import { param } from 'express-validator';
import { authenticate, handleInputErrors, verifyStatus } from "../middleware";

const usersRouter = Router();

usersRouter.use(authenticate, verifyStatus);

usersRouter.get('/', getUsers);

usersRouter.patch('/block-user/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    blockUser
);
usersRouter.patch('/unlock-user/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    unlockUser
);

usersRouter.delete('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    deleteUser,
);

export default usersRouter;