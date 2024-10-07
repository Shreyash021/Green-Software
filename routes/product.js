const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController } = require("../controllers/productController");

const express=require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const formidable = require("express-formidable");

router.post("/create-product",requireSignIn,isAdmin,createProductController);

router.put("/update-product/:pid",requireSignIn,isAdmin,updateProductController);

router.get("/get-product",getProductController);

router.get("/get-product/:id",getSingleProductController);

//router.get("/product-list/:page", productListController);

router.get("/product-photo/:pid",productPhotoController);

router.delete("/delete-product/:pid",deleteProductController);

module.exports=router;