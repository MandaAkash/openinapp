// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
// const secret="1fgrthkjq"  uncomment this line if you want to use
const User = require('../models/User');

module.exports = async (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');
    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        // Verify token
        const decoded = await jwt.verify(token, secret);
        console.log(decoded)
        // Attach the user from the token payload to the request object
        req.user = decoded;
        // Check if the user exists in the database
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }
        next();
    } catch (err) {
        console.log("usernot")
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};
