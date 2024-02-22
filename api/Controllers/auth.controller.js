import User from "../Models/user.models.js";
import bcryptjs from "bcryptjs";

export const signup= async(req,res,next)=>{
    const {username,email,password}=req.body;  

    console.log('psd'+password)
    console.log('name'+password)
    console.log('email'+password)
    const hashPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password}); 
    try {
        
        await newUser.save()
        res.status(201).json('created successfully');  
    } catch (error) {
       next(error)
    }
}