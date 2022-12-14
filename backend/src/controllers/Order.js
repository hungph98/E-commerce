const Order = require("../models/Order");

class OrderController{

    // Create Order
    createOrder = async (req, res, next) => {
        const newOrder = new Order(req.body);
        try {
            const createOrder = await newOrder.save();
            res.status(200).json(createOrder);
        } catch (err) {
            next(err)
        }
    }

    // Update Order
    updateOrder = async (req, res, next) => {
        try {
            const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true});
            res.status(200).json(updateOrder);
        } catch (err) {
            next(err);
        }
    }

    // Delete Order
    deleteOrder = async (req, res, next) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete order successfully!")
        } catch (err) {
            next(err)
        }
    }

    // Get user order
    getUserOrder = async (req, res, next) => {
        try {
            const getUserOrder = await Order.find({ userId: req.params.userId})
            res.status(200).json(getUserOrder)
        } catch (err) {
            next(err)
        }
    }

    // Get all order
    getAllOrder = async (req, res, next) => {
        try {
            const getAllOrder = await Order.find();
            res.status(200).json(getAllOrder);
        } catch (err) {
            next(err)
        }
    }

    // Get monthly income
    getMonthlyIncome = async (req, res, next) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth }}},
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sale: "$amount"
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: false}
                    }
                }
            ]);
            res.status(200).json(income)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new OrderController;