const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/add", userController.addUser);

router.post("/auth", userController.authenticateUser);

module.exports = router;