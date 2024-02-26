import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    avatar:{
        type: String,
        default:"https://www.istockphoto.com/signature/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration-gm1300845620-393045799",
    },


},{timestamps:true});
 
const User= mongoose.model('User',userSchema);

export default User; 