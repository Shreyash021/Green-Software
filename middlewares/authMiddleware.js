const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userModel");

exports.requireSignIn = async(req,res,next)=>{
    try{
        const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch(e){
        console.log(e);
    }
}

exports.isAdmin=async (req,res,next)=>{
    try{
        const user = await User.findById(req.user._id);
        if(user.role!=="admin"){
            return res.status(401).send({
                success:false,
                message:"not an admin"
            })
        }else{
            next();
        }

    }catch(e){
        console.log(e);
        return res.send({
            success:false,
            e
        })
    }
}