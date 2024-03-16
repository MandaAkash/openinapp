const express = require('express');
const connectDB = require('./db');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const subTaskRoutes = require('./routes/subTaskRoutes');
const userRoutes = require('./routes/userRoutes');
require('./cronjobs/priorityUpdate')
require('./cronjobs/twilioVoiceCall')
// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json()); // Parse incoming JSON data

// Mount route handlers
app.use('/api/tasks', taskRoutes);
app.use('/api/subtasks', subTaskRoutes);
app.use('/api/users', userRoutes);

// Error handler middleware
app.use(require('./utils/errorHandler'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
