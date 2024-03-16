// controllers/userController.js
const UserService = require('../services/userService');
const secret="1fgrthkjq"
const jwt=require('jsonwebtoken')
// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { phone_number, priority} = req.body;
        const user = await UserService.createUser(phone_number, priority);
        const token=jwt.sign({id:user._id},secret)
        return res.status(201).json({...user,token});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};
// Update user priority
exports.updateUserPriority = async (req, res) => {
    try {
        const { userId } = req.params;
        const { priority } = req.body;
        const user = await UserService.updateUserPriority(userId, priority);
        return res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};
// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        return res.json(users);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};
// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};
