const { Router } = require("express");
const router = Router();
const {healthCheck, welcomePage}=require("../controllers/healthCheckController")

router
    .get("/", welcomePage)
    .get("/health", healthCheck)
   .use("/api/v1/products", require("./v1"))
   .use("/api/v1/users", require("./userRoute"));

module.exports = router;