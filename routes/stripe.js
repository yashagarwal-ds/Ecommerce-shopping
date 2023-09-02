const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async(req, res) => {
    const { amount, token } = req.body;

    try {
      const charge = await stripe.charges.create({
        amount : amount,
        currency: 'usd',
        source: token.id,
        description: 'Charge for test@example.com',
      });
  
      res.status(200).json({msg : "Payment Successfull"});
    } catch (error) {
      res.status(500).json({msg : error})
    }
});

module.exports = router;