const Joi = require('joi');

//el validador toma el esquema y devuelve la func payload con la info q queremos validar ya revisada
const validator= (schema)=>(payload)=>
    schema.validate(payload, {abortEarly: false});

const nuevoProductoSchema = Joi.object({
    id: Joi.number().optional(),
    nombre: Joi.string().min(2).max(12).required(),
    precio: Joi.number().positive().required(),
    unidades: Joi.number().integer().positive().required(),
    categoria: Joi.string().required(),
    descripción: Joi.string().required()
});

const actProducto = Joi.object({
    // id: Joi.number().required(),
    nombre: Joi.string().optional(),
    precio: Joi.number().optional(),
    unidades: Joi.number().optional(),
    categoria: Joi.string().optional(),
    descripción: Joi.string().optional()
}).min(1);

const delProducto = Joi.object({
    id: Joi.number().integer().required()
});


exports.validateSignup= validator(nuevoProductoSchema)
exports.validateActProducto = validator(actProducto)
exports.validateDelProducto = validator(delProducto)