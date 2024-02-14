const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleware, parameterValidation, queryValidation } = require("../middleware");
const { registerUser, loginUser, getAllUsers } = require('../validations/userValidation');

const router = express.Router();

router.post('/user/register', parameterValidation(registerUser), userController.registerUser);
router.post('/user/login', parameterValidation(loginUser), userController.loginUser);

router.get('/users', authMiddleware, queryValidation(getAllUsers), userController.getAllUsers);

module.exports = router;
