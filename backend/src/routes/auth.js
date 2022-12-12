const router = require("express").Router();
const AuthController = require("../controllers/Auth");

router.post("/register", AuthController.register);
router.post("/register", AuthController.login);

module.exports = router;