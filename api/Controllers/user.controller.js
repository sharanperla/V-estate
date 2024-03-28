import Listing from "../Models/listing.model.js";
import User from "../Models/user.models.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res, next) => {
  res.json({
    message: "hello",
  });
};

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,"you can only update your own account"))
    try {
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,  
            }     
        },{new:true})

        const {password,...rest}=updateUser._doc 

        res.status(200).json(rest);
    } catch (error) {
        
    }
};
export const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,"you can only update your own account"))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
         res.status(200).json('user hass been deleted!');
    } catch (error) {
        next(error);
    }
};

export const getUserListing = async (req,res,next)=>{

    if(req.user.id === req.params.id)
    {
        try {
            
            const listings =await Listing.find({userRef:req.params.id})
            res.status(200).json(listings)

        } catch (error) {
            next(error)
        }

    }else{
        return next(errorHandler(401,'you can only update your lsiting'))
    }

}
