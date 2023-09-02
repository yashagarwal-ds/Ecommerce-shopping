const express = require("express");
const router = express.Router();
const CartModel = require("../models/cart");
const {verifyToken} = require("./verifyToken");

router.get("/", verifyToken, async(req, res) => {
    try{
        if(req.user.isAdmin){
            const cart = await CartModel.find();

            return res.status(200).json(cart);
        }else{
            return res.status(403).json({msg : "You are not allowed to do that!"});
        }
    }catch(error){
        res.status(200).json({msg : error})
    }
});

router.get("/:id", verifyToken, async(req, res) => {
    try{
        if(req.user.id == req.params.id){
            const cart = await CartModel.findById(req.params.id);

            return res.status(200).json(cart);
        }else{
            return res.status(403).json({msg : "You are not allowed to do that!"});
        }
    }catch(error){
        res.status(400).json({msg : error});
    }
})

router.post("/", verifyToken, async(req, res) => {
    const {userId} = req.body;

    if(!userId){
        return res.status(400).json({msg : "please fill the details properly"})
    };

    try{
        let cart = new CartModel(req.body);

        await cart.save();

        res.status(200).json(cart);
    }catch(error){
        res.status(400).json({msg : error})
    }
});

router.put("/:id", verifyToken, async(req, res) => {
    try{
        if(req.user.id == req.params.id){
            const updatedCart = await CartModel.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true});

            return res.status(200).json(updatedCart);
        }else{
            return res.status(403).json({msg : "You are not allowed to that!"})
        }
    }catch(error){
        res.status(400).json({msg : error})
    }
});

router.delete("/:id", verifyToken, async(req, res) => {
    try{
        if(req.user.id == req.params.id){
            const deletedCart = await CartModel.findByIdAndDelete(req.params.id);

            res.status(200).json(deletedCart);
        }else{
            return res.status(403).json({msg : "You are not allowed to do that!"});
        }
    }catch(error){
        res.status(400).json({msg : error});
    }
});

module.exports = router;