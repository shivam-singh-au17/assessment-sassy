const Joi = require("joi");

module.exports = {
    registerUser: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().min(8).max(20),
    }),

    loginUser: Joi.object({
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required().min(8).max(20),
    }),

    getAllUsers: Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        sortBy: Joi.string().optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').optional(),
        search: Joi.string().optional(),
    }),
};
