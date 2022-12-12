const User = require("../models/User");

class AuthController {

    // Register
    register = async (req, res, next) => {
        const newUser = new User(req.body);
        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser)
        } catch (err) {
            next(err)
        }
    }

    // Login
    login = async (req, res, next) => {

    }
}

module.exports = new AuthController;