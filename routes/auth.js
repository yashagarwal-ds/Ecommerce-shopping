const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async(req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(500).json({msg : "please fill the details properly"})
    };

    try{
        let user = await UserModel.findOne({email : email});

        if(user){
            return res.status(400).json({msg : "User is already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user = new UserModel({
            username : username,
            email : email,
            password : hashPassword
        });

        await user.save();

        return res.status(200).json({user : user, isSuccess : true});
    }catch(error){
        res.status(500).json({msg : error})
    }
});

router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await UserModel.findOne({email : email});

        if(!user){
            return res.status(400).json({msg : "User doesn't exists"});
        }else{
            const passwordMatch = await bcrypt.compare(password, user.password)

            if(!passwordMatch){
                return res.status(400).json({msg : "Wrong credentials"});
            }

            // const {password, ...others} = user._doc

            const accessToken = jwt.sign({
                id : user._id,
                isAdmin : user.isAdmin
            }, "yash", {expiresIn : 36000});

            return res.status(200).json({user, accessToken, isSuccess : true});
        }
    }catch(error){
        res.status(500).json({msg : error});
    }
})

module.exports = router;