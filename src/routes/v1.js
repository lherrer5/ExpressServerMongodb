const express = require("express");
const controller = require("../controllers/productsController");
const { healthCheck, welcomePage } = require("../controllers/healthCheckController");
const productsRouter = express.Router();
const { validatenewProduct, validateUpdateProduct, validateDelProduct } = require("../middlewares/validator");

//all APIs should have a health check that is a request to review that our server is working
productsRouter.get("/", welcomePage);
productsRouter.get("/health", healthCheck);
productsRouter.get("/api/v1/products", controller.getAllProducts);
productsRouter.post("/api/v1/products", validatenewProduct, controller.createProduct);
productsRouter.get("/api/v1/products/:id", controller.getProductById);
productsRouter.patch("/api/v1/products/:id", validateUpdateProduct, controller.updateProduct);
productsRouter.delete("/api/v1/products/:id", validateDelProduct, controller.deleteProduct);

module.exports = productsRouter;
