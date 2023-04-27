const Joi = require('joi');

const joiMongooseId = Joi.string().pattern(new RegExp
    ("^[a-zA-Z0-9]{24}$")).required();

const joiValidationId = async (req, res, next) => {
    const { id } = req.params;
    const { error } = await joiMongooseId.validate(id);
    if (error) {
        res.json(error.message);
        next(error);
    }
    next();
};


module.exports = joiValidationId

