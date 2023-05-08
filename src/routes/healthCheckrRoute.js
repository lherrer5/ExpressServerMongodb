const { Router } = require("express");
const router = Router();
const { healthCheck, welcomePage } = require("../controllers/healthCheckController");

router
    .get("/", welcomePage)
    .get("/health", healthCheck)
    .use("/v1/", require("./v1"));

module.exports = router;