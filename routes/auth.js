const express = require("express");
const router = express.Router();

const {registerController,loginController,testController, forgotPasswordController, updateProfileController, getAllUsers, otpSender}=require("../controllers/authController");

const {requireSignIn,isAdmin}= require("../middlewares/authMiddleware");

router.post("/register",registerController);

router.post("/login",loginController);

router.post("/forgot-password",forgotPasswordController);


// //test route
// router.get("/test",requireSignIn,isAdmin,testController);

//protected route
router.get('/user-auth',requireSignIn,(req,res)=>{res.status(200).send({ok:true})});

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{res.status(200).send({ok:true})});

router.put("/profile", requireSignIn, updateProfileController);

router.get('/viewUsers',requireSignIn,isAdmin,getAllUsers);

router.post('/sendotp',otpSender);

module.exports = router;