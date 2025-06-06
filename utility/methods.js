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
        if (typeof message === "object" && message.type === "video" && message.file_id) {
          await bot.sendVideo(user.id, message.file_id, {
            caption: message.text?.trim() || undefined,
          });
        } else if (typeof message === "string" && message.trim() !== "") {
          await bot.sendMessage(user.id, message);
        } else {
          console.warn(`Skipped user ${user.id} — empty message`);
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
