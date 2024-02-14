require('dotenv').config();
const jwt = require('jsonwebtoken');
const { responseHandler, httpStatusCodes, responseStatus } = require('../utils');

/**
 * Function to verify a JWT token using a secret key.
 * 
 * @param {string} token The JWT token to be verified.
 * @returns {Promise<object>} A Promise that resolves with the decoded user object if the token is valid.
 * @throws {Error} If there's an error verifying the token or if the JWT_SECRET_KEY environment variable is not defined.
 */
const verifyToken = async (token) => {
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = async (req, res, next) => {

    const bearerToken = req?.headers?.authorization;

    if (!bearerToken) {
        return responseHandler.handleError(res, httpStatusCodes.UNAUTHORIZED, responseStatus.FAIL, 'Authorization header is missing');
    }

    if (!bearerToken.startsWith("Bearer ")) {
        return responseHandler.handleError(res, httpStatusCodes.UNAUTHORIZED, responseStatus.FAIL, 'Authorization header must start with "Bearer"');
    }


    const token = bearerToken.split(" ")[1].trim();

    try {

        const user = await verifyToken(token);
        req.user = user.user;
        return next();

    } catch (error) {

        return responseHandler.handleError(res, httpStatusCodes.UNAUTHORIZED, responseStatus.FAIL, 'Unauthorized, invalid token!');
    }
};
