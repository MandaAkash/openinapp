// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleWare');

// Create a new task
router.post('/', authMiddleware, taskController.createTask);
// Update a task
router.put('/:taskId', authMiddleware, taskController.updateTask);
// Delete a task
router.delete('/:taskId', authMiddleware, taskController.deleteTask);
// Get all user tasks
router.get('/', authMiddleware,taskController.getAllUserTasks);

module.exports = router;
