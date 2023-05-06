const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/userController");

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser);

module.exports = router;