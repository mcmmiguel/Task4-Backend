import { Router } from "express";
import { registerUser } from "../handlers/user";

const loginRouter = Router();

loginRouter.post('/');

export default loginRouter;