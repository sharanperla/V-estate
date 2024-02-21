import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/user.route.js'
import authRouter from './Routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);
});

const app=express();

app.use(express.json())

app.listen(3000,()=>{
    console.log('server is runing on port 3000');
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
