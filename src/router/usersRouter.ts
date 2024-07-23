import { Router } from "express";
import { registerUser } from "../handlers/user";


const usersRouter = Router();

usersRouter.post('/', registerUser);

// Main
usersRouter.get('/', (req, res) => {
    res.json('All the users');
});




export default usersRouter;