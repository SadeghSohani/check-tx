import { Router } from 'express';
import { deleteUser } from '#root/controllers/user.controller';

const userRouter = Router();

userRouter.delete('/delete', deleteUser);

export default userRouter;