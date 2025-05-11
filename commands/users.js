const { getAllUsers, deleteUser, adminCheck } = require("../utility/database");

module.exports = (bot) => {
  // /users command - lists all users (basic info)
  bot.onText(/\/users/, async (msg) => {
    const chatId = msg.chat.id;

    try {
      isAdmin = await adminCheck(chatId); // Replace with actual admin check logic
      if (!isAdmin) {
        bot.sendMessage(chatId, "❌ You are not authorized to use this command.");
        return;
      }
      const users = await getAllUsers();



      if (users.length === 0) {
        return bot.sendMessage(chatId, "No users found.");
      }

      // Convert object to array of values
      const usersArray = Object.values(users);

      // Now you can safely use .map() on the array
      const formatted = usersArray
        .map(
          (user, i) =>
            `${i + 1}. @${user.username || "NoUsername"} (${user.id})`
        )
        .join("\n");

      console.log(formatted);

      bot.sendMessage(chatId, `📋 List of users:\n\n${formatted}`);
    } catch (error) {
      console.error("Error fetching users:", error);
      bot.sendMessage(chatId, "Failed to retrieve users.");
    }
  });

  // /delete_user command - deletes the user who sent the command
  bot.onText(/\/delete_user/, async (msg) => {
    const chatId = msg.chat.id;
    const id = String(msg.from.id); // use id as doc ID

    try {
      await deleteUser(id);
      bot.sendMessage(chatId, "✅ Your data has been deleted.");
    } catch (error) {
      console.error("Error deleting user:", error);
      bot.sendMessage(chatId, "❌ Failed to delete your data.");
    }
  });
};
