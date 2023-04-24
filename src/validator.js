const Joi = require('joi');

//validator use schema and return function payload wiht the info to be validated
const validator= (schema)=>(payload)=>
    schema.validate(payload, {abortEarly: false});

const newProductSchema = Joi.object({
    //id: Joi.number().optional(),
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).required(),
    availableUnits: Joi.number().integer().positive().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().min(2).max(50).required(),
});

const updateProduct = Joi.object({
    // id: Joi.number().required(),
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    availableUnits: Joi.number().optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional()
}).min(1);

const delProduct = Joi.object({
    id: Joi.number().integer().required()
});


exports.validateSignup= validator(newProductSchema)
exports.validateUpdateProduct = validator(updateProduct)
exports.validateDelProduct = validator(delProduct)