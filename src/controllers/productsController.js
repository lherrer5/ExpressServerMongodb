const { Product } = require("../models/models");
const { validatenewProduct } = require("../middlewares/validator");
const { validateUpdateProduct } = require("../middlewares/validator");
const { validateDelProduct } = require("../middlewares/validator");


//GET
const getAllProducts = async (_, res) => {
    console.log("Correct getAllProducts");

    const allProducts = await Product.find();
    res.json(allProducts);
};

//GET by ID
const getProductById = async (req, res) => {
    console.log("Correct getProductById");
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
};
//POST
const createProduct = async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log("Correct createProduct");
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};
// const createProduct = async (req, res) => {
//     console.log("Correct createProduct");
//     const productUpdated= validatenewProduct(req.body, { abortEarly: false });;
//     const product = await new Product(productUpdated).save();
//     //const product = await new Product(req.body).save();
//     res.json(product);
// };

//DELETE by ID
const deleteProduct = async (req, res) => {
    console.log("Correct deleteProduct");
    const { id } = req.params;
    const product = await Product.findByIdAndRemove(id);
    res.json({ message: `Product ${product.name} has been deleted` });
};

//PATCH by ID
const updateProduct = async (req, res) => {
    console.log("Correct updateProduct");
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(product);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};

