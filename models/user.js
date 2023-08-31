const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
        unique : true
    },

    isAdmin : {
        type : Boolean,
        default : false
    },

    date : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true});

module.exports = new mongoose.model("User", UserSchema);