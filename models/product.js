const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    desc : {
        type : String,
        required : true
    },

    img : {
        type : String,
        required : true
    },

    category : {
        type : Array,
        required : true
    },

    size : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    date : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true});

module.exports = new mongoose.model("Product", ProductSchema);