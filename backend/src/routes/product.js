const router = require("express").Router();
const productController = require("../controllers/Product");
const verifyToken = require("../verify/verifyToken");

router.post("/", verifyToken, productController.createProduct );
router.put("/:id", verifyToken, productController.updateProduct );
router.delete("/:id", verifyToken, productController.deleteProduct );
router.get("/find/:id", productController.getProductById );
router.get("/", productController.getAllProduct );

module.exports = router;