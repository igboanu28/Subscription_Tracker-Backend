import { Router } from "express";

import authorize from "../middlewares/auth.middleware.js";

import { deleteUser, editUser, getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.put('/:id', authorize, editUser);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;