const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb+srv://yashagarwal:iVXw5Wd3ucqd4zc5@cluster0.ogrznn8.mongodb.net/").then(() => console.log("Connection successfull")).catch(error => console.log(error))
};

module.exports = connectDB;