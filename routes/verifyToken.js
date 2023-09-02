const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if(token){
        jwt.verify(token.split(" ")[1], "yash", (err, user) => {
            console.log(user);
            if(err){
                return res.status(403).json({msg : "You are not authenticated!"})
            }else{
                req.user = user;
                next();
            }
        })
    }else{
        return res.status(401).json({msg : "You are not authenticated!"})
    }
};

module.exports = {verifyToken};