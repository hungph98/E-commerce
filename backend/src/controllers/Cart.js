const Cart = require("../models/Cart");

class CartController {

    // Create cart
    createCart = async (req, res, next) => {
        const newCart = new Cart(req.body);
        try {
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        } catch (err) {
            next(err)
        }
    }

    // Update Cart
    updateCart = async (req, res, next) => {
        try {
            const updateCart = await Cart.findByIdAndUpdate(req.params.id,{
                $set: req.body
            }, { new: true})
            res.status(200).json(updateCart);
        } catch (err) {
            next(err)
        }
    }

    // Delete Cart
    deleteCart = async (req, res, next) => {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Cart successfully!");
        } catch (err) {
            next(err)
        }
    }

    // Get User Cart
    getUserCart = async (req, res, next) => {
        try {
            const cart = await Cart.findOne({userId: req.body.userId});
            res.status(200).json(cart);
        } catch (err) {
            next(err)
        }
    }

    // Get All Cart
    getAllCart = async (req, res, next) => {
        try {
            const getAllCart = await Cart.find();
            res.status(200).json(getAllCart);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CartController;