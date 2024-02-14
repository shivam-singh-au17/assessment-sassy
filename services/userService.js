require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Function to register a new user.
 * 
 * @param {Object} payload Object containing user information like email and password.
 * @returns {Promise<Object>} A Promise that resolves with the newly created user object.
 * @throws {Error} If a user with the same email already exists in the database.
 */
exports.registerUser = async (payload) => {

    const user = await User.findOne({ email: payload.email }).lean().exec();
    if (user) throw new Error('User already exist');

    return await User.create(payload);
};

/**
 * Function to generate an authentication token for a user.
 * 
 * @param {Object} user User object for whom the token is being generated.
 * @returns {string} Authentication token generated using JWT.
 */
exports.generateAuthToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

/**
 * Function to authenticate a user.
 * 
 * @param {Object} payload Object containing user credentials like email and password.
 * @returns {Promise<Object>} A Promise that resolves with the authenticated user object and its corresponding authentication token.
 * @throws {Error} If the user hasn't registered yet or if the provided email/password combination is incorrect.
 */
exports.authenticateUser = async (payload) => {

    const user = await User.findOne({ email: payload.email }).exec();
    if (!user) throw new Error("You haven't registered yet. Please register first");

    const match = await user.checkPassword(payload.password);
    if (!match) throw new Error("Wrong Password or Email... try again");

    const token = this.generateAuthToken(user);

    return { user, token };
};

/**
 * Function to get all users based on provided parameters.
 * 
 * @param {Object} payload The parameters for pagination, sorting, and search.
 * @returns {Promise<Object>} A Promise that resolves to an object containing an array of users and the total count of users.
 * @throws {Error} If there's an error while fetching all users.
 */
exports.getAllUsers = async (payload) => {
    let { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "DESC", search = "" } = payload;

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const matchStage = search ? {
        $match: {
            $or: [
                { username: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
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
            username: 1,
            email: 1,
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
        const userList = await User.aggregate(pipeline).exec();
        const data = userList[0]?.data || [];
        const count = userList[0]?.count[0]?.count || 0;
        return { data, count };
    } catch (error) {
        throw new Error(`Failed to get all users: ${error.message}`);
    }
};