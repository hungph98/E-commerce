const router = require("express").Router();
const stripeController = require("../controllers/Stripe");

router.post("/payment", stripeController.createPayment);

module.exports = router;