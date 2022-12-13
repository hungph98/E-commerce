const User = require("../models/User");
const createError = require("../verify/err")

class UserController {

    // Update User
    updateUser = async (req, res, next) => {
        if (req.params.id === req.user.id) {
            try {
                const updateUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: res.body
                },{ new: true});
                res.status(200).json(updateUser);
            } catch (err){
                next(err);
            }
        }
        return next(createError(403, "You can update only your account!!"))
    }

    // Delete User
    deleteUser = async (req, res, next) => {
        if (req.params.id === req.user.id) {
            try {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted!!");
            } catch (err){
                next(err);
            }
        }
        return next(createError(403, "You can delete only your account!!"))
    }

    // Get user by Id
    getUserById =  async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    // Get user
    getAllUser = async (req, res, next) => {
        try {
            const user = await User.find();
            res.status(200).json(user)
        } catch (err) {
            next(err);
        }
    }

    // Get User stats
    getUserStats = async (req, res, next) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear}} },
                {
                    $project: {
                        month: { $month: "$createdAt" }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 }
                    }
                }
            ])
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new UserController;