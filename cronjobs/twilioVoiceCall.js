const cron = require('node-cron');
const UserService = require('../services/userService');
const TaskService = require('../services/TaskService');
const twilio = require('twilio');
//remove below 3 comments to use
// const accountSid = 'ACf4613c85144447188859587f18b6f57e';
// const authToken = 'e2229225c7de6118d355dfbfc842c4b0';
// const twilioPhoneNumber = '+13212030421';
const client = new twilio(accountSid, authToken);
// Cron job to perform Twilio voice calling
cron.schedule('* * * * *', async () => {
    try {
        // Get all users sorted by priority
        const users = await UserService.getAllUsersSortedByPriority();
        // Iterate over each user
        for (const user of users) {
            // Check if this user has been called previously
            // const isCalled = await TaskService.isUserCalled(user._id);
            // if(isCalled) console.log("Voice call has already been made to user") //If already called we don't call again and again
            // // If the user's priority has not been called previously
            // if (!isCalled) {
                // Get the due tasks for this user
                const dueTasks = await TaskService.getDueTasksForUser(user._id);
                // If there are any due tasks for this user
                if (dueTasks.length > 0) {
                    // Make Twilio voice call here
                    await makeVoiceCall(user.phone_number);
                    console.log(`Voice call made to user ${user.phone_number}`);
                    // Update the status to indicate that this priority has been called
                    await TaskService.updateUserCalledStatus(user.priority);
                    // Exit the loop since we have successfully made the call
                    break;
                }
            // }
        }
    } catch (err) {
        console.error('Error making Twilio voice calls:', err.message);
    }
});
// Function to make Twilio voice call
async function makeVoiceCall(phoneNumber) {
    try {
        await client.calls.create({
            twiml: '<Response><Say>Your reminder message here</Say></Response>',
            to: phoneNumber,
            from: twilioPhoneNumber
        });
    } catch (err) {
        console.error('Error making Twilio voice call:', err.message);
        throw err;
    }
}

