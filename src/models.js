//Use models to create new products as an JS object

//schema from MOONGOSE
const mongoose=require("mongoose");

const PorductsSchema=mongoose.Schema({
    name: {type: String, required: true},
    description:{type: String, required: false},
    availableUnits:{type: Number, default: 0},//Dont use require because I using defaul when no data
    price:{type: Number, required: true},
    category:{type: String, required: true}
});

exports.Product=mongoose.model("products", PorductsSchema)