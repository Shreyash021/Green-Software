require("dotenv").config();
const nodemailer = require("nodemailer");

exports.mailSender = async(reciever,subject,message)=>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.HOST,
            auth:{
                user:process.env.USER,
                pass:process.env.PASSWORD,
            }
        })

        const mail = await transporter.sendMail({
            from:`Shopping App`,
            to:`${reciever}`,
            subject:`${subject}`,
            html:`${message}`,
        });

        console.log(mail);

    } catch(error){
        console.log(error.message);
        console.log("email sending failed")
    }
}
