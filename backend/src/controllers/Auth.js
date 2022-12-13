const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

class AuthController {

    // Register
    register = async (req, res, next) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASS).toString()
        });
        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser)
        } catch (err) {
            next(err)
        }
    }

    // Login
    login = async (req, res, next) => {
        try {
            const user = await User.findOne({
                username: req.body.username
            })
            if (!user) {
                res.status(201).json("Wrong credentials!")
            }

            const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASS);
            const pass = hashPassword.toString(CryptoJS.enc.Utf8);
            if (pass !== req.body.password) {
                res.status(401).json("Wrong credentials!")
            }

            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.SECRET_PASS, {expiresIn:"3d"})

            const { password, ...others } = user._doc;

            res.cookie("token", token, {
                httpOnly: true
            }).status(200).json({detail: {...others}, token});
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthController;