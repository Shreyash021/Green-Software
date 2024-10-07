const Product = require("../models/productModel")
// const fs = require("fs");
// const { MdProductionQuantityLimits } = require("react-icons/md");
const slugify = require("slugify");
// const Product = require("../models/productModel");
const { uploadFileToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createProductController = async(req,res)=>{
    try{
        console.log("This is the requesr");
        console.log(req.body);
        console.log("This is name");
        console.log(req.body.name);
        const {name,description,category,price,quantity} = req.body;
        const {photo} = req.files;
        
        switch(true){
            case !name:
                return res.status(500).send({message:"Name is required"});
            case !description:
                return res.status(500).send({message:"Description is required"})
            case !category:
                return res.status(500).send({message:"category is required"})
            case !price:
                return res.status(500).send({message:"Name is required"})
            case !quantity:
                return res.status(500).send({message:"Quantity is required"})
            case photo && photo.size >1000000:
                return res.status(500).send({message:"photo is required"})
        }
        

        const img = await uploadFileToCloudinary(photo,process.env.FOLDER);

        const products = new Product({name,description,category,price,quantity,slug:slugify(name),photo:img.secure_url});

        await products.save();

        res.send({
            success:true,
            products,
        })

    } catch(e){
        console.log("error in creating product");
        console.log(e);
        return res.send({
            success:true,
            e,
        })
    }
}


exports.getProductController = async(req,res)=>{
    try{
        const products=await Product.find({}).populate("category").limit(12).sort({createdAt:-1});
        return res.json({
            success:true,
            total:products.length,
            data:products,
            
        })
    }catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
}


exports.getSingleProductController = async(req,res)=>{
    try{
        const product = await Product.findOne({slug:req.params.id}).populate('category');
        return res.send({
            success:true,
            product,
        })
    } catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
}

exports.productPhotoController = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);

        return res.status(200).send(product);

    } catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
}

exports.deleteProductController = async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.pid).select("-photo");
        return res.send({
            success:true,
            message:"product deleted"
        })
    } catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
}


exports.updateProductController=async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.files);
        const {name,description,category,price,quantity} = req.body;
        const {photo} = req.files;
        
        switch(true){
            case !name:
                return res.status(500).send({message:"Name is required"});
            case !description:
                return res.status(500).send({message:"Description is required"})
            case !category:
                return res.status(500).send({message:"category is required"})
            case !price:
                return res.status(500).send({message:"Name is required"})
            case !quantity:
                return res.status(500).send({message:"Quantity is required"})
            // case photo && photo.size >100000:
            //     return res.status(500).send({message:"photo is required"})
        }

        const img = await uploadFileToCloudinary(photo,process.env.FOLDER);
        
        const products = await Product.findByIdAndUpdate(req.params.pid,{...req.body,slug:slugify(name),photo:img.secure_url},{new:true})


        await products.save();

        res.send({
            success:true,
            products,
        })

    } catch(e){
        console.log(e);
        return res.send({
            success:true,
            e,
        })
    }
}