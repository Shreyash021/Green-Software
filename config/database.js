const mongoose = require("mongoose");
require("dotenv").config();

const {DATABASE_URL} = process.env;

exports.dbConnect = ()=>{
    mongoose.connect(DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB Connection Successful"))
    .catch((e)=>{
        console.log("error in db connection");
        console.log(e);
        process.exit(1);
    })
}