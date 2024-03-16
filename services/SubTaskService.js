// services/subTaskService.js

const SubTask = require('../models/SubTask');

// Create a new subtask
exports.createSubTask = async (taskId) => {
    const subTask = await SubTask.create({
        task_id: taskId,
        status: 0 // initial status
    });
    return subTask;
};

// Update a subtask
exports.updateSubTask = async (subTaskId, status) => {
    const subTask = await SubTask.findById(subTaskId);
    if (!subTask) {
        throw new Error('Subtask not found');
    }

    subTask.status = status;
    await subTask.save();
    return subTask;
};

// Delete a subtask (soft deletion)
exports.deleteSubTask = async (subTaskId) => {
    const subTask = await SubTask.findById(subTaskId);
    if (!subTask) {
        throw new Error('Subtask not found');
    }
    await SubTask.deleteOne({ _id: subTaskId });
};

// Get all subtasks for a task
exports.getAllSubTasksForTask = async (taskId) => {
    const subTasks = await SubTask.find();
    return subTasks;
};
