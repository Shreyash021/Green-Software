const express = require("express");
const morgan = require("morgan");
const cors=require("cors");
const fileUpload = require("express-fileupload");
const app=express();
require("dotenv").config();

//middlewrae
app.use(cors());

// app.use(morgan('dev'));

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);



const authRoutes = require("./routes/auth")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
app.use(express.json());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

require("./config/database").dbConnect();
require("./config/cloudinary").cloudinaryConnect();

app.get("/",(req,res)=>{
    res.send({
        message: "App started"
    })
})



const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`Server started on ${port}`);
})