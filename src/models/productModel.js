//Use models to create new products as a JS object

//schema from MOONGOSE
const mongoose=require("mongoose");

const ProductsSchema=mongoose.Schema({
    name: {type: String, required: true},
    description:{type: String, required: false},
    availableUnits:{type: Number, default: 0},//Dont use require because I using defaul when no data
    price:{type: Number, required: true},
    category:{type: String, required: true}
}, { versionKey: false });

exports.Product=mongoose.model("products", ProductsSchema)
