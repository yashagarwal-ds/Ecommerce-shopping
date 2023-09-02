const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },

    products : [
        {
            productId : {
                type : String
            },

            quantity : {
                type : Number,
                default : 1
            }
        }
    ],

    date : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true});

module.exports = new mongoose.model("Cart", CartSchema);