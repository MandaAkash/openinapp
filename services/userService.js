// services/userService.js

const User = require('../models/User');

// Create a new user
exports.createUser = async (phoneNumber, priority) => {
    const user = await User.create({
        phone_number: phoneNumber,
        priority: priority
    });
    return user;
};

// Update user priority
exports.updateUserPriority = async (userId, priority) => {
    const user = await User.findByIdAndUpdate(userId, { priority: priority }, { new: true });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

// Get all users
exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
};

// Get user by ID
exports.getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

exports.getAllUsersSortedByPriority = async () => {
    try { 
        return await User.find().sort({ priority: 1 }).exec();
    } catch (err) {
        throw new Error('Error retrieving users sorted by priority');
    }
};

