const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("This is from user side");
});

router.post("/", (req, res) => {
    const {username} = req.body;
    res.status(200).send(`This is from user side ${username}`);
});

module.exports = router;