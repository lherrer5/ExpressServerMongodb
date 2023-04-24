//Routs of cliet request
const {Router}=require("express");
const {Product}=require("./models");

const routes=new Router();

//all APIs should have a health check that is a request to review that our server is working
routes.get("/health", (_, res)=>res.send("check"));

//get
//routes.get("/api/v1/products", [productValidator], async (_, res)=>{
routes.get("/api/v1/products", async (_, res)=>{
    console.log("Product -> getAllProducts");
    const products = await Product.find();
    res.json(products);
})

module.exports=routes;