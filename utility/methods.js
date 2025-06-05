const { getAllUsers } = require("./database");
async function sendToAllUsers(bot, message, chatId) {
  try {
    const users = await getAllUsers();

    if (!users || users.length === 0) {
      await bot.sendMessage(chatId, "No users to send to.");
      return;
    }

    for (let user of Object.values(users)) {
      try {
        // If message is an object with video, send as video with optional caption
        if (typeof message === "object" && message.video) {
          await bot.sendVideo(user.id, message.video, {
            caption: "New Video Alert!",
          });
        } else {
          // Otherwise send as plain text
          await bot.sendMessage(user.id, message);
        }
      } catch (error) {
        console.error(`Error sending to user ${user.id}:`, error.message);
      }
    }

    await bot.sendMessage(chatId, "✅ Message sent to all users!");
  } catch (error) {
    console.error("❌ Error sending to all users:", error.message);
    await bot.sendMessage(chatId, "⚠️ There was an error while sending to users.");
  }
}

module.exports = {
  sendToAllUsers,
};
