// controllers/taskController.js
const TaskService = require('../services/TaskService');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, due_date } = req.body;
        const userId = req.user.id; // Assuming user id is attached to the request after JWT authentication
        const task = await TaskService.createTask(userId, title, description, due_date);
        return res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { taskId} = req.params;
        const {due_date,status}=req.query;
        console.log(req.params)
        const task = await TaskService.updateTask(taskId, due_date, status);
        return res.json(task);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await TaskService.deleteTask(taskId);
        return res.json({ msg: 'Task deleted' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

// Get all user tasks
exports.getAllUserTasks = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user id is attached to the request after JWT authentication
        const tasks = await TaskService.getAllUserTasks(userId, req.query);
        return res.json(tasks);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};
