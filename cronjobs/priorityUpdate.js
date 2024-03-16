// priorityUpdate.js
const cron = require('node-cron');
const Task = require('../models/Task');
// Define the cron schedule to run every day at midnight
const calculatePriority = (dueDate) => {
    // Ensure dueDate is a Date object
    if (!(dueDate instanceof Date)) {
        dueDate = new Date(dueDate);
    }
    // Calculate the difference in milliseconds between today and the due date
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Determine the priority based on the difference in days
    if (diffDays === 0) {
        // Due date is today
        return 0;
    } else if (diffDays <= 2) {
        // Due date is between tomorrow and day after tomorrow
        return 1;
    } else if (diffDays <= 4) {
        // Due date is within 3-4 days
        return 2;
    } else {
        // Due date is 5+ days away
        return 3;
    }
};
cron.schedule('* * * * *', async () => {
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find();
        // Loop through each task and update its priority based on due date
        tasks.forEach(async task => {
            // Logic to calculate priority based on due date
            // Update task priority and save it
            task.priority = calculatePriority(task.due_date);
            await task.save();
        });
        console.log('Task priorities updated successfully');
    } catch (err) {
        console.error('Error updating task priorities:', err.message);
    }
});
