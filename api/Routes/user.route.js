import express from "express";
import { test } from "../Controllers/user.controller.js ";
import { deleteUser, getUserListing, updateUser,getUser} from "../Controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter= express.Router(); 

userRouter.get('/test',test);
userRouter.post('/update/:id',verifyToken,updateUser);
userRouter.delete('/delete/:id',verifyToken,deleteUser);
userRouter.get('/listings/:id',verifyToken,getUserListing);
userRouter.get('/:id',verifyToken,getUser);


export default userRouter; 