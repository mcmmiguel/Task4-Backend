import { Router } from "express";
import { deleteUser, getUsers, registerUser, toggleBlockStatus } from "../handlers/user";
import { param } from 'express-validator';
import { handleInputErrors } from "../middleware";

const usersRouter = Router();

usersRouter.post('/', registerUser);

usersRouter.get('/', getUsers);

usersRouter.patch('/updateBlockStatus/:id',
    param('id').isInt().withMessage('ID not valid'),
    handleInputErrors,
    toggleBlockStatus
);

usersRouter.delete('/:id',
    param('id').isInt().withMessage('ID not valid'),
    handleInputErrors,
    deleteUser,
);




export default usersRouter;