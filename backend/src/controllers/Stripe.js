const stripe = require("stripe")(process.env.SECRET_STRIPE);

class StripeController {

    //
    createPayment = async (req, res, next) => {
        await stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        }, (stripeErr, stripeRes) => {
            if (stripeErr) {
                next(stripeErr)
            } else {
                res.status(200).json(stripeRes)
            }
        })
    }
}

module.exports = new StripeController;