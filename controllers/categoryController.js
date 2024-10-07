
const Category = require("../models/categoryModel")
const slugify = require("slugify");

exports.createCategoryController = async(req,res)=>{
    try{

        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                message:"Name is required"
            })
        }

        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.send({
                message: "Category already exists"
            })
        }

        const created = await new Category({name:name,slug:slugify(name)}).save();
    
        return res.send({
            success:true,
            message:"successfully created",
            created,
        })

    } catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
}


exports.updateCategoryController = async(req,res)=>{
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});

        return res.send({
            success:true,
            message:"category updated",
            category,
        })
    } catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
}

exports.categoryController = async(req,res)=>{
    try{
        const category = await Category.find({});
        return res.send({
            success:true,
            category,
        })
    } catch(e){
        return res.send({
            sucess:false,
            e,
        })
    }
}

exports.singleCategoryController=async(req,res)=>{
    try{
        const category = await Category.findOne({slug:req.params.slug})
        return res.send({
            success:true,
            category,
        })
    } catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
}

exports.deleteCategoryController=async(req,res)=>{
    try{
        const {id} = req.params;
        await Category.findByIdAndDelete(id);
        return res.send({
            success:true,
            message:"deleted category"
        })
    }catch(e){
        console.log(e);
        return res.send({
            success:false,
            e,
        })
    }
}