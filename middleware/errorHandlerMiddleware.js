const { responseHandler, httpStatusCodes, responseStatus } = require('../utils');

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    responseHandler.handleError(res, httpStatusCodes.INTERNAL_SERVER_ERROR, responseStatus.FAIL, 'Something broke!');
};
