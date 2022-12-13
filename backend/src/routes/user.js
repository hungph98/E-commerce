const router = require("express").Router();
const userController = require("../controllers/User");
const verifyToken = require("../verify/verifyToken");

router.put("/:id",verifyToken, userController.updateUser);
router.delete("/:id",verifyToken, userController.deleteUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUser);
router.get("/stats", verifyToken, userController.getUserStats);

module.exports = router;