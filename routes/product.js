const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");
const {verifyToken} = require("./verifyToken");

router.get("/", async(req, res) => {
    const query = req.query.new;
    try{
        const product = query ? await ProductModel.find().sort({createdAt : -1}) : await ProductModel.find();

        res.status(200).json(product);
    }catch(error){
        res.status(400).json({msg : error});
    }
});

router.get("/:id", async(req, res) => {
    try{
        const product = await ProductModel.findById(req.params.id);

        res.status(200).json(product);
    }catch(error){
        res.status(400).json({msg : error})
    }
});

router.post("/", verifyToken, async(req, res) => {
    const {title, desc, img, category, size, price} = req.body;

    if(!title || !desc || !img || !category || !size || !price){
        return res.status(400).json({msg : "Please fill the details properly"});
    };

    try{
        let product = new ProductModel({
            title : title,
            desc : desc,
            img : img,
            category : category,
            size : size,
            price : price
        });

        await product.save();

        res.status(200).json(product);
    }catch(error){
        res.status(400).json({msg : error});
    }
});

module.exports = router;