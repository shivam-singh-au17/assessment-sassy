const Joi = require('joi');

module.exports = {
    task: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        dueDate: Joi.date().required(),
        status: Joi.string().valid('COMPLETED', 'NOT_COMPLETED').default('NOT_COMPLETED')
    }),

    getAllTasks: Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        sortBy: Joi.string().optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').optional(),
        search: Joi.string().optional(),
    }),
};
