const router = require("express").Router();
const cartController = require("../controllers/Cart");
const {verifyTokenAdmin, verifyToken, verifyTokenAndAuthorization} = require("../verify/verifyToken");

router.post("/", verifyToken, cartController.createCart);
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, cartController.getUserCart );
router.get("/", verifyTokenAdmin, cartController.getAllCart);

module.exports = router;