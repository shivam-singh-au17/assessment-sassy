const { httpStatusCodes } = require('../utils');
const { BAD_REQUEST } = httpStatusCodes;

module.exports = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(BAD_REQUEST).json({ errors: error.details.map(item => item.message).join(', ') });
    } else {
        next();
    }
};
