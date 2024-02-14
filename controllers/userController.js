const userService = require('../services/userService');
const { responseHandler, httpStatusCodes, responseStatus } = require('../utils');

const { handleResponse, handleError } = responseHandler;
const { CREATED, BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = httpStatusCodes;
const { SUCCESS, FAIL } = responseStatus;

exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);

        return handleResponse(
            res,
            CREATED,
            SUCCESS,
            "User registered successfully",
            { username: user.username, email: user.email }
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `Could not register user, ${err}`
        );
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await userService.authenticateUser(req.body);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "The user has been logged in successfully",
            user
        );

    } catch (err) {

        return handleError(
            res,
            BAD_REQUEST,
            FAIL,
            `The user's login attempt was unsuccessful, ${err}`
        );
    }
};

exports.getAllUsers = async (req, res) => {
    try {

        const user = await userService.getAllUsers(req.query);

        return handleResponse(
            res,
            OK,
            SUCCESS,
            "All users received successfully",
            user
        );

    } catch (err) {

        return handleError(
            res,
            INTERNAL_SERVER_ERROR,
            FAIL,
            `Failed to get all users, ${err}`
        );
    }
};
