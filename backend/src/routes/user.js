const router = require("express").Router();
const userController = require("../controllers/User");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin} = require("../verify/verifyToken");

router.put("/:id",verifyTokenAndAuthorization, userController.updateUser);
router.delete("/:id",verifyTokenAndAuthorization, userController.deleteUser);
router.get("/find/:id",verifyTokenAdmin, userController.getUserById);
router.get("/",verifyTokenAdmin, userController.getAllUser);
router.get("/stats", verifyToken, userController.getUserStats);

module.exports = router;