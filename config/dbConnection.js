require("dotenv").config();
const mongoose = require("mongoose");

/**
 * Function to establish a connection to a MongoDB database.
 * 
 * @returns {Promise<void>} A Promise that resolves when the connection is established successfully.
 * @throws {Error} If the environment variable MONGODB_URI is not defined or if there's an error connecting to the database.
 */
const connect = async () => {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined in the environment variables.");

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database...");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Unable to connect to the database.");
    }
};

module.exports = { connect };