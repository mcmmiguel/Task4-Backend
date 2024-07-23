import { Router } from "express";
import { getUsers, registerUser } from "../handlers/user";


const usersRouter = Router();

usersRouter.post('/', registerUser);

usersRouter.get('/', getUsers);




export default usersRouter;