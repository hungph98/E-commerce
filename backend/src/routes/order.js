const router = require("express").Router();
const orderController = require("../controllers/Order");
const { verifyToken, verifyTokenAdmin, verifyTokenAndAuthorization } = require("../verify/verifyToken");

router.post("/", verifyToken, orderController.createOrder);
router.put("/:id", verifyTokenAdmin, orderController.updateOrder);
router.delete("/:id", verifyTokenAdmin, orderController.deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, orderController.getUserOrder);
router.get("/", verifyTokenAdmin, orderController.getAllOrder);
router.get("/income", verifyTokenAdmin, orderController.getMonthlyIncome);

module.exports = router;