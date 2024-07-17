import { Router } from 'express';
import { registerUser, loginUser } from '#root/controllers/authentication.controller';

const authRouter = Router();

authRouter.post('/login', loginUser);

authRouter.post('/register', registerUser);

export default authRouter;