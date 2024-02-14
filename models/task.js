const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        dueDate: { type: Date, required: true },
        status: { type: String, enum: ["COMPLETED", "NOT_COMPLETED"], default: "NOT_COMPLETED" }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('task', taskSchema);
