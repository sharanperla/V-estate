import express from "express";
import { test } from "../Controllers/user.controller.js ";
import { updateUser } from "../Controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter= express.Router(); 

userRouter.get('/test',test);
userRouter.post('/update/:id',verifyToken,updateUser);


export default userRouter;