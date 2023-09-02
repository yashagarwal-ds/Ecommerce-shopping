const express = require("express");
const router = express.Router();
const OrderModel = require("../models/order");
const {verifyToken} = require("./verifyToken");

router.get("/", verifyToken, async(req, res) => {
    try{
        if(req.user.isAdmin){
            const order = await OrderModel.find();

            return res.status(200).json(order);
        }else{
            return res.status(403).json({msg : "You are not allowed to do that!"});
        }
    }catch(error){
        res.status(200).json({msg : error})
    }
});

router.get("/:id", verifyToken, async(req, res) => {
    console.log(req.params.id);
    try{
        if(req.user.id == req.params.id){
            const order = await OrderModel.find({userId : req.params.id});

            return res.status(200).json(order);
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
        let order = new OrderModel(req.body);

        await order.save();

        res.status(200).json(order);
    }catch(error){
        res.status(400).json({msg : error})
    }
});

router.put("/:id", verifyToken, async(req, res) => {
    try{
        if(req.user.id == req.params.id){
            const updatedorder = await OrderModel.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true});

            return res.status(200).json(updatedorder);
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
            const deletedorder = await OrderModel.findByIdAndDelete(req.params.id);

            res.status(200).json(deletedorder);
        }else{
            return res.status(403).json({msg : "You are not allowed to do that!"});
        }
    }catch(error){
        res.status(400).json({msg : error});
    }
});

module.exports = router;