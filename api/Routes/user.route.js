import express from "express";
import { test } from "../Controllers/user.controller.js ";

const userRouter= express.Router(); 

userRouter.get('/test',test)

export default userRouter;