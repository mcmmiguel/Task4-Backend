import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware";
import { registerUser } from "../handlers/auth";

const authRouter = Router();

authRouter.post('/register',
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

authRouter.post('/login',)

export default authRouter;