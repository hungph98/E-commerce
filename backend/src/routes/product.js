const router = require("express").Router();
const productController = require("../controllers/Product");
const {verifyTokenAdmin} = require("../verify/verifyToken");

router.post("/", verifyTokenAdmin, productController.createProduct );
router.put("/:id", verifyTokenAdmin, productController.updateProduct );
router.delete("/:id", verifyTokenAdmin, productController.deleteProduct );
router.get("/find/:id", productController.getProductById );
router.get("/", productController.getAllProduct );

module.exports = router;