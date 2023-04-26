//Routs of cliet request
const { Router } = require("express");
const { Product } = require("../models/models");
const { healthCheck, welcomePage } = require("../controllers/healthCheckController");
//const { validateSignup } = require("../validator");
//const { validateUpdateProduct } = require("../validator");
// const { validateDelProduct } = require("../validator");

const routes = new Router();

//all APIs should have a health check that is a request to review that our server is working
//routes.get("/health", (_, res) => res.send("check"));
routes.get("/", welcomePage)
routes.get("/health", healthCheck)
//routes.use("/v1/", require("./v1"));

//GET
routes.get("/api/v1/products", async (_, res) => {
    console.log("Product -> getAllProducts");
    const products = await Product.find();
    res.json(products);
});

//GET by ID
routes.get("/api/v1/products/:id", async (req, res) => {
    console.log("Product -> getProductById");
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
});


//POST
//routes.post("/api/v1/products", validateSignup, async (req, res) => {
routes.post("/api/v1/products", async (req, res) => {
    console.log("Product -> createProduct");
    const product = await new Product(req.body).save();
    res.json(product);
});

//DELETE by ID
routes.delete("/api/v1/products/:id", async (req, res) => {
    console.log("Product -> deleteProduct");
    const { id } = req.params;
    const product = await Product.findByIdAndRemove(id);
    res.json({ message: `Product ${product.name} has been deleted` });
});

//PATCH by ID
routes.patch("/api/v1/products/:id", async (req, res) => {
    console.log("Product -> updateProduct");
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(product);
});
module.exports = routes;