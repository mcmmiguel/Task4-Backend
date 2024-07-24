import { Router } from "express";
import { deleteUser, getUsers, registerUser, toggleBlockStatus } from "../handlers/user";
import { body, param } from 'express-validator';
import { handleInputErrors } from "../middleware";

const usersRouter = Router();

usersRouter.post('/register',
    body('name')
        .notEmpty().trim().withMessage('The name must not be empty'),
    body('email')
        .notEmpty().trim().isEmail().withMessage('Invalid email'),
    body('password')
        .notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    handleInputErrors,
    registerUser
);

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