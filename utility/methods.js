const { getAllUsers } = require("./database");

// Function to send a message to all users
async function sendToAllUsers(bot, message, chatId) {
  try {
    // Fetch all users
    const users = await getAllUsers();

    if (!users || users.length === 0) {
      bot.sendMessage(chatId, "No users to send to.");
      return;
    }

    // Send message to all users
    for (let user of Object.values(users)) {
      try {
        await bot.sendMessage(user.id, message);
      } catch (error) {
        console.error(`Error sending to user ${user.id}:`, error);
      }
    }

    // Acknowledge the sender of the command
    bot.sendMessage(chatId, "Sent to all users!");
  } catch (error) {
    console.error("Error processing the sendToAllUsers command:", error);
    bot.sendMessage(chatId, "There was an error while sending.");
  }
}

module.exports = {
  sendToAllUsers,
};
