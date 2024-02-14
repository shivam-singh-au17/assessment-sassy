const express = require('express');
const taskController = require('../controllers/taskController');
const { authMiddleware, parameterValidation, queryValidation } = require("../middleware");
const { task, getAllTasks } = require('../validations/taskValidation');

const router = express.Router();

router.post('/task', authMiddleware, parameterValidation(task), taskController.createTask);

router.patch('/task/:taskId', authMiddleware, parameterValidation(task), taskController.updateTask);

router.delete('/task/:taskId', authMiddleware, taskController.deleteTask);

router.get('/task/:taskId', authMiddleware, taskController.getOneTask);
router.get('/tasks', authMiddleware, queryValidation(getAllTasks), taskController.getAllTasks);

module.exports = router;
