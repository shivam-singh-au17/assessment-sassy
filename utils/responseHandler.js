/**
 * Function to handle successful responses by sending a JSON response with the specified status code, message, and data.
 * 
 * @param {object} res The response object to send the response.
 * @param {number} [statusCode=200] The HTTP status code.
 * @param {boolean} [status=true] The status of the response.
 * @param {string} [message="Success"] The message associated with the response.
 * @param {*} [data] Additional data to include in the response.
 */
const handleResponse = (res, statusCode = 200, status = true, message = "Success", data) => {
    const responseObject = { status, message };
    if (data !== undefined) responseObject.data = data;

    res.status(statusCode).json(responseObject);
};

/**
 * Function to handle errors by sending a JSON error response with the specified status code and message.
 * 
 * @param {object} res The response object to send the error response.
 * @param {number} [statusCode=500] The HTTP status code.
 * @param {boolean} [status=false] The status of the response.
 * @param {string} [message="Internal Server Error"] The error message.
 */
const handleError = (res, statusCode = 500, status = false, message = "Internal Server Error") => {
    res.status(statusCode).json({ status, message });
};

module.exports = { handleResponse, handleError };
