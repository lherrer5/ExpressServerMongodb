const Joi = require('joi');

//validator use schema and return function payload wiht the info to be validated
// const validator= (schema)=>(payload)=>
//     schema.validate(payload, {abortEarly: false});

// const validate = (schema) => (req, res, next) => {
//     const { error } = schema.validate(req.body, { abortEarly: false });
//     if (error) {
//         const errors = error.details.map((err) => err.message);
//         return res.status(422).json({ errors });
//     }
//     next(null); // pasar null como argumento indica que no hay errores
// };
// function validator (schema, property){
//     return (req, res, next) => {
//             const data=req[property];
//             const { error } = schema.validate(data, { abortEarly: false });
//             if (error) {
//                 res.json(error.message);
//                 //next(error);
//             }
//             next();
//         };
// }

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

// const delProduct = Joi.object({
//     id: Joi.number().integer().required()
// });


// exports.validatenewProduct = validator(newProductSchema)
// exports.validateUpdateProduct = validator(updateProduct)
// exports.validateDelProduct = validator(delProduct)
//module.exports = validator
module.exports = newProductSchema
module.exports =updateProduct
//module.exports =delProduct
