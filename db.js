// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = `mongodb+srv://mandaakash6:mandaakash6@cluster0.0uosz.mongodb.net/openinapp?retryWrites=true&w=majority`;
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
