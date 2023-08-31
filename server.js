const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = 8000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is from home side");
});

app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => console.log("This is listening port", PORT));