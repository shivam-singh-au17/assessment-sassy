const taskService = require('../services/taskService');
const mongoose = require('mongoose');
const { responseHandler, httpStatusCodes, responseStatus } = require('../utils');

const { handleResponse, handleError } = responseHandler;
const { CREATED, BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = httpStatusCodes;
const { SUCCESS, FAIL } = responseStatus;

exports.createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);

        return handleResponse(
            res,
            CREATED,
            SUCCESS,
            "Task created successfully",
            task
        );

    } catch (err) {

        return handleError(
            res,
            INTERNAL_SERVER_ERROR,
            FAIL,
            `Failed to create task, ${err}`
        );
    }
};

exports.updateTask = async (req, res) => {

    const taskId = req.params.taskId;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            "Invalid taskId provided!"
        );
    }

    try {
        const task = await taskService.updateTask(taskId, req.body);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "Task updated successfully",
            task
        );

    } catch (err) {

        return handleError(
            res,
            INTERNAL_SERVER_ERROR,
            FAIL,
            `Failed to update task, ${err}`
        );
    }
};

exports.deleteTask = async (req, res) => {

    const taskId = req.params.taskId;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            "Invalid taskId provided!"
        );
    }

    try {
        const task = await taskService.deleteTask(taskId);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "Task deleted successfully",
            task
        );

    } catch (err) {

        return handleError(
            res,
            INTERNAL_SERVER_ERROR,
            FAIL,
            `Failed to delete task, ${err}`
        );
    }
};

exports.getOneTask = async (req, res) => {

    const taskId = req.params.taskId;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            "Invalid taskId provided!"
        );
    }

    try {
        const task = await taskService.getOneTask(taskId);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "Task received successfully",
            task
        );

    } catch (err) {

        return handleError(
            res,
            INTERNAL_SERVER_ERROR,
            FAIL,
            `Failed to get task, ${err}`
        );
    }
};

exports.getAllTasks = async (req, res, next) => {
    
    try {

        const task = await taskService.getAllTasks(req.query);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "All tasks received successfully",
            task
        );

    } catch (err) {

        return handleError(
            res,
            INTERNAL_SERVER_ERROR,
            FAIL,
            `Failed to get all tasks, ${err}`
        );
    }
};
