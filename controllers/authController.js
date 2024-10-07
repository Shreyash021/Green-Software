const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const Otp = require("../models/otpModel");
const otpGenerator = require("otp-generator");
exports.registerController = async(req,res)=>{
    try{
        const {name,email,password,mobileno,otp}=req.body;

        if(!name){
            return res.send({message:"Name required"})
        }
        if(!email){
            return res.send({message:"email required"})
        }
        if(!password){
            return res.send({message:"password required"})
        }
        if(!mobileno){
            return res.send({message:"mobileno required"})
        }
        if(!otp){
            return res.send({message:"Otp required"})
        }

        const existinguser = await User.findOne({email});

        if(existinguser){
            return res.send({
                success:false,
                message:"Already registered user"
            })
        }

        const response=await Otp.find({email:email}).sort({ createdAt: -1 }).limit(1);

        if(response.length==0){
            return res.send({
                success:false,
                message: "No otp found for specified email"
            })
        }
        if(otp!==response[0].otp){
            return res.send({success:false,message:"Otp is invalid"})
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const user = await User.create({name,email,mobileno,password:hashedPassword,role:"user"});

        res.status(200).send({
            success:true,
            message:"user registered successfully"
        })

    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            message:"Error in registration"
        })
    }
}


exports.loginController = async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"please enter fields"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.send({
                success:false,
                message:"user do not exist"
            })
        }

        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.send({
                success:false,
                message:"incorrect password"
            })
        }

        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"Login successful",
            user:{
                name:user.name,
                email:user.email,
                mobileno:user.mobileno,
                role:user.role,
            },token,
        })



    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            message:"error in login"
        })
    }
}

exports.testController =(req,res)=>{
    res.send("protected route")
}

exports.forgotPasswordController=async(req,res)=>{
    try{
        const {email,question,newPassword}=req.body;

        if(!email){
            
        }

    }catch(e){
        console.log(e);
        return res.send({
            success:false,
            error:e,
        })
    }
}

exports.updateProfileController = async (req, res) => {
    try {

        console.log("In backend");
        console.log(`${req}`);

      const { name, email, password, mobileno } = req.body;
      const user = await User.findById(req.user._id);
      //password
    //   if (password && password.length < 6) {
    //     return res.json({ error: "Passsword is required and 6 character long" });
    //   }
      const hashedPassword = await bcrypt.hash(password,10);
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          mobileno: mobileno || user.mobileno,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };


  exports.getAllUsers=async(req,res)=>{
    try{
        const users = await User.find({role:"user"});
        return res.send({
            success:true,
            users,
        })
    }catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
  }


  exports.otpSender = async(req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.send({
                success: false,
                message: "User is already existing"
            })
        }

        var response;
        let otp;
        do{
            otp = otpGenerator.generate(5,{specialChars:false,upperCaseAlphabets:false,lowerCaseAlphabets:false});
            response = await Otp.findOne({otp:otp});
        }while(response);

        const createdOtp = await Otp.create({email,otp});
        res.status(200).send({
            success: true,
            message:"Otp created successfully",
            data: otp,
        })

    } catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
}