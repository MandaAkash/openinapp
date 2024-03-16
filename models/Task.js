// models/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'DONE'],
        default: 'TODO'
    },
    deleted_at: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
