const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const {verifyToken} = require("./verifyToken");

router.get("/alluser", async(req, res) => {
    try{
        const user = await UserModel.find();

        return res.status(200).json(user);
    }catch(error){
        res.status(400).json({msg : error})
    }
});

router.get("/:id", verifyToken, async(req, res) => {
    try{
        if(req.user.id == req.params.id){
            const user = await UserModel.findById(req.params.id);

            return res.status(200).json(user);
        }else{
            return res.status(403).json({msg : "You are not allowed to do that!"});
        }
    }catch(error){
        res.status(400).json({msg : error})
    }
});

router.post("/", verifyToken, (req, res) => {
    res.status(200).send("You are authenticated user");
});

router.put("/:id", verifyToken, async(req, res) => {
    console.log(req.user);
    try{
        if(req.user.id == req.params.id){
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true});

            return res.status(200).json(updatedUser);
        }else{
            return res.status(403).json({msg : "You are not allowed to do that!"});
        }
    }catch(error){
        res.status(400).json({msg : error})
    }
});

router.delete("/:id", verifyToken, async(req, res) => {
    try{
        if(req.user.isAdmin){
            const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

            return res.status(200).json(deletedUser);
        }else{
            return res.status(403).json({msg : "You are not allowed to do that!"});
        }
    }catch(error){
        res.status(400).json({msg : error})
    }
});

module.exports = router;