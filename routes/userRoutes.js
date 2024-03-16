// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleWare');

// Create a new user
router.post('/', userController.createUser);

// Update user priority
router.put('/:userId', authMiddleware, userController.updateUserPriority);

// Get all users
router.get('/', userController.getAllUsers);
// Get user by ID
router.get('/:userId', authMiddleware, userController.getUserById);

module.exports = router;
