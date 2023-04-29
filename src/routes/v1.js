const express = require("express");
const controller = require("../controllers/productsController");
const { healthCheck, welcomePage } = require("../controllers/healthCheckController");
const productsRouter = express.Router();
//const { validatenewProduct, validateUpdateProduct, validateDelProduct } = require("../middlewares/validator");
const pdtoSchemaValidation=require("../middlewares/pdtSchemaValidation");
const updateSchemaValidation=require("../middlewares/pdtSchemaValidation");
const joiValidationId= require("../middlewares/pdtsValidator");
//const {newProductSchema} = require("../middlewares/validator")
//const validator = require("../middlewares/validator")

//all APIs should have a health check that is a request to review that our server is working
productsRouter.get("/", welcomePage);
productsRouter.get("/health", healthCheck);
productsRouter.get("/api/v1/products", controller.getAllProducts);
productsRouter.get("/api/v1/products/:id", joiValidationId, controller.getProductById);
productsRouter.post("/api/v1/products", pdtoSchemaValidation, controller.createProduct);
productsRouter.patch("/api/v1/products/:id", joiValidationId, updateSchemaValidation, controller.updateProduct);
productsRouter.delete("/api/v1/products/:id", joiValidationId, controller.deleteProduct);

module.exports = productsRouter;
