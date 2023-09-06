const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const PORT = 8000;

connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is from home side");
});

app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/product", require("./routes/product"));
app.use("/cart", require("./routes/cart"));
app.use("/order", require("./routes/order"));

app.listen(PORT, () => console.log("This is listening port", PORT));