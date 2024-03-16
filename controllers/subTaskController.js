// controllers/subTaskController.js

const SubTaskService = require('../services/SubTaskService');

// Create a new subtask
exports.createSubTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const subTask = await SubTaskService.createSubTask(taskId);
        return res.status(201).json(subTask);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

// Update a subtask
exports.updateSubTask = async (req, res) => {
    try {
        const { subTaskId } = req.params;
        const { status } = req.body;
        const subTask = await SubTaskService.updateSubTask(subTaskId, status);
        return res.json(subTask);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

// Delete a subtask
exports.deleteSubTask = async (req, res) => {
    try {
        const { subTaskId } = req.params;
        await SubTaskService.deleteSubTask(subTaskId);
        return res.json({ msg: 'Subtask deleted' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

// Get all subtasks for a task
exports.getAllSubTasksForTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const subTasks = await SubTaskService.getAllSubTasksForTask(taskId);
        return res.json(subTasks);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};
