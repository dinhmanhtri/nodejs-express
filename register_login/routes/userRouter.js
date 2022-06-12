const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');

router.get("/", UserController.getAllUser);

router.post("/", UserController.createUser);

router.post("/login", UserController.loginUser);

router.put("/:id", UserController.updatePassword);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
