const { Task } = require('../models');

/**
 * Function to create a new task.
 * 
 * @param {Object} payload The task data to be created.
 * @returns {Promise<Object>} A Promise that resolves to the created task object.
 * @throws {Error} If there's an error while creating the task.
 */
exports.createTask = async (payload) => {
    return await Task.create(payload);
};

/**
 * Function to update a task by its ID.
 * 
 * @param {string} taskId The ID of the task to be updated.
 * @param {Object} payload The new data to update the task.
 * @returns {Promise<Object>} A Promise that resolves to the updated task object.
 * @throws {Error} If there's an error while updating the task.
 */
exports.updateTask = async (taskId, payload) => {
    return await Task.findByIdAndUpdate(taskId, payload, { new: true });
};

/**
 * Function to delete a task by its ID.
 * 
 * @param {string} taskId The ID of the task to be deleted.
 * @returns {Promise<Object>} A Promise that resolves to the deleted task object.
 * @throws {Error} If there's an error while deleting the task.
 */
exports.deleteTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};

/**
 * Function to get a task by its ID.
 * 
 * @param {string} taskId The ID of the task to be get.
 * @returns {Promise<Object>} A Promise that resolves to the single task object.
 * @throws {Error} If there's an error while getting the task.
 */
exports.getOneTask = async (taskId) => {
    return await Task.findById(taskId);
};

/**
 * Function to get all tasks based on provided parameters.
 * 
 * @param {Object} payload The parameters for pagination, sorting, and search.
 * @returns {Promise<Object>} A Promise that resolves to an object containing an array of tasks and the total count of tasks.
 * @throws {Error} If there's an error while fetching all tasks.
 */
exports.getAllTasks = async (payload) => {
    let { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "DESC", search = "" } = payload;
    
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const matchStage = search ? {
        $match: {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }
    } : {
        $match: {}
    };

    const sortStage = {
        $sort: {
            [sortBy]: sortOrder === "ASC" ? 1 : -1
        }
    };

    const projectStage = {
        $project: {
            _id: 1,
            title: 1,
            description: 1,
            dueDate: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1
        }
    };

    const pipeline = [
        matchStage,
        sortStage,
        projectStage,
        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: limit }
                ],
                count: [
                    {
                        $count: 'count'
                    }
                ]
            }
        }
    ];

    try {
        const taskList = await Task.aggregate(pipeline).exec();
        const data = taskList[0]?.data || [];
        const count = taskList[0]?.count[0]?.count || 0;
        return { data, count };
    } catch (error) {
        throw new Error(`Failed to get all tasks: ${error.message}`);
    }
};
