const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
     },
     otp:{
        type: String,
        required: true,
     },
     createdAt:{
        type:Date,
        default: Date.now(),
        expires: 60*6,
     }
});

otpSchema.pre("save", async function(next){
    try{
       const response= await mailSender(this.email,`Otp for Shopping App registration`,`Otp is valid for only 6 minutes:  ${this.otp}`);
       console.log(response);
    } catch(error){
       console.log("error in sending mail for otp")
       console.log(error.message);
    }
    next();
})

module.exports = mongoose.model("Otp",otpSchema);