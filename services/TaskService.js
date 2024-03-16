// services/taskService.js
const Task = require('../models/Task');
const User=require("../models/User")
const subTask=require('../models/SubTask')
// Create a new task
exports.createTask = async (userId, title, description, due_date) => {
    const task = await Task.create({
        user_id: userId,
        title,
        description,
        due_date,
        priority: calculatePriority(due_date), // assuming a function to calculate priority based on due date
        status: "TODO" // initial status
    });
    return task;
};
// Update a task
exports.updateTask = async (taskId, due_date, status) => {
    try {
        const obj = { _id: taskId }; // Assuming taskId is the MongoDB ObjectId of the task
        const task = await Task.findOne(obj);
        
        if (!task) {
            throw new Error('Task not found');
        }

        if (due_date) {
            task.due_date = due_date;
            task.priority = calculatePriority(due_date); // Recalculating priority based on new due date
        }

        if (status) {
            task.status = status;
        }
        await task.save();
        return task;
    } catch (error) {
        throw new Error('Error updating task: ' + error.message);
    }
};
// Delete a task (soft deletion)
exports.deleteTask = async (taskId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error('Task not found');
    }
    await Task.deleteOne({ _id: taskId });//deleting task
    await subTask.deleteMany({task_id:taskId})//deleting subtasks related to that tasks

};
// Get all tasks for a user with filters and pagination
// services/taskService.js
exports.getAllUserTasks = async (userId, filters) => {
    const { priority, due_date, page = 1, limit = 10, status } = filters;
    let whereClause = { user_id: userId };

    // Apply filters
    if (priority) {
        whereClause.priority = priority;
    }

    if (due_date) {
        whereClause.due_date = due_date;
    }

    if (status) {
        whereClause.status = status;
    }
    const tasks = await Task.find(whereClause) .sort({ due_date: 1 }) // Order by due date
    .skip((page - 1) * limit) // Apply pagination
    .limit(limit); // Limit the number of tasks per page
    console.log(userId)
    return tasks;
};
exports.isUserCalled = async (_id) => {
    try {
        const user = await User.findOne({ _id }).exec();
        return user ? user.called : false;
    } catch (err) {
        throw new Error('Error checking if user is called');
    }
};
exports.getDueTasksForUser = async (userId) => {
    try {
        const currentDate = new Date();
        return await Task.find({ user_id: userId, due_date: { $lte: currentDate } }).exec();
    } catch (err) {
        throw new Error('Error retrieving due tasks for user');
    }
};
exports.updateUserCalledStatus = async (priority) => {
    try {
        await User.updateOne({ priority }, { called: true }).exec();
    } catch (err) {
        throw new Error('Error updating user called status');
    }
};
// Helper function to calculate task priority based on due date
const calculatePriority = (due_date) => {
    const today = new Date();
    const diffTime = Date(due_date) - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays <= 0) {
        return 0; // Due date is today
    } else if (diffDays <= 2) {
        return 1; // Due date is between tomorrow and day after tomorrow
    } else if (diffDays <= 4) {
        return 2; // Due date is within 3-4 days
    } else {
        return 3; // Due date is 5+ days away
    }
};
