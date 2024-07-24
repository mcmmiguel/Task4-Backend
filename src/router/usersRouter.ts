import { Router } from "express";
import { deleteUser, getUsers, toggleBlockStatus } from "../handlers/user";
import { body, param } from 'express-validator';
import { authenticate, handleInputErrors } from "../middleware";

const usersRouter = Router();

usersRouter.use(authenticate);

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