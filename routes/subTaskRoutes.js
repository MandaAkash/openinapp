// routes/subTaskRoutes.js

const express = require('express');
const router = express.Router();
const subTaskController = require('../controllers/subTaskController');
const authMiddleware = require('../middleware/authMiddleWare');

// Create a new subtask for a task
router.post('/:taskId', authMiddleware, subTaskController.createSubTask);

// Update a subtask
router.put('/:subTaskId', authMiddleware, subTaskController.updateSubTask);

// Delete a subtask
router.delete('/:subTaskId', authMiddleware, subTaskController.deleteSubTask);

// Get all subtasks for a task
router.get('/:taskId', authMiddleware, subTaskController.getAllSubTasksForTask);

module.exports = router;
