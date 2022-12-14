const Product = require("../models/Product");

class productController {

    // Create product
    createProduct = async (req, res, next) => {
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct)
        } catch(err) {
            next(err);
        }
    }

    // Update product
    updateProduct = async (req, res, next) => {
        try {
            const updateProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true}
            )
            res.status(200).json(updateProduct);
        } catch (err) {
            next(err)
        }
    }

    // Delete product
    deleteProduct = async (req, res, next) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete product successfully!")
        } catch (err) {
            next(err)
        }
    }

    // Get product By Id
    getProductById = async (req, res, next) => {
        try {
            const getProductById = await Product.findById(req.params.id);
            res.status(200).json(getProductById);
        } catch (err) {
            next(err)
        }
    }

    // Get all product to category
    getAllProduct = async (req, res, next) => {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        try {
            let products;

            if (qNew) {
                products = await Product.find().sort({
                    createdAt: -1
                }).limit(5)
            } else if (qCategory) {
                products = await  Product.find({
                    categories: {
                        $in: [qCategory],
                    }
                })
            } else {
                products = await Product.find();
            }

            res.status(200).json(products)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new productController;