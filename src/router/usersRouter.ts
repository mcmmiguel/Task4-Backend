import { Router } from "express";
import { deleteUser, getUsers, toggleBlockStatus } from "../handlers/user";
import { param } from 'express-validator';
import { authenticate, handleInputErrors, verifyStatus } from "../middleware";

const usersRouter = Router();

usersRouter.use(authenticate, verifyStatus);

usersRouter.get('/', getUsers);

usersRouter.patch('/update-block-status/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    toggleBlockStatus
);

usersRouter.delete('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    deleteUser,
);

export default usersRouter;