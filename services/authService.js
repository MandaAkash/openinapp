// services/authService.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Authenticate user and generate JWT token
exports.authenticateUser = async (phone_number, password) => {
    const user = await User.findOne({ where: { phone_number } });

    if (!user) {
        throw new Error('Invalid phone number or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid phone number or password');
    }

    const payload = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // adjust token expiration as needed

    return token;
};
