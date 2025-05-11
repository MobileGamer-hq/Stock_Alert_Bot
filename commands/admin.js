const { adminCheck, addAdmin, removeAdmin, sendToAllAdmins, getAllAdmins } = require("../utility/database");

module.exports = (bot) => {
  bot.onText(/\/add_admin (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    const targetId = match[1].trim(); // User ID to add as admin

    try {
      const isAdmin = await adminCheck(senderId);
      if (!isAdmin) {
        bot.sendMessage(chatId, '❌ You are not authorized to use this command.');
        return;
      }

      await addAdmin(targetId);
      bot.sendMessage(chatId, `✅ User ${targetId} has been added as an admin.`);
    } catch (error) {
      console.error('Error adding admin:', error);
      bot.sendMessage(chatId, '⚠️ Failed to add admin.');
    }
  });

  bot.onText(/\/remove_admin (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    const targetId = match[1].trim(); // User ID to remove from admin

    try {
      const isAdmin = await adminCheck(senderId);
      if (!isAdmin) {
        bot.sendMessage(chatId, '❌ You are not authorized to use this command.');
        return;
      }

      await removeAdmin(targetId);
      bot.sendMessage(chatId, `✅ User ${targetId} has been removed from admins.`);
    } catch (error) {
      console.error('Error removing admin:', error);
      bot.sendMessage(chatId, '⚠️ Failed to remove admin.');
    }
  });

  bot.onText(/\/list_admins/, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;

    try {
      const isAdmin = await adminCheck(senderId);
      if (!isAdmin) {
        bot.sendMessage(chatId, '❌ You are not authorized to use this command.');
        return;
      }

      const admins = await getAllAdmins();
      if (Object.keys(admins).length === 0) {
        bot.sendMessage(chatId, '⚠️ No admins found.');
        return;
      }

      let adminList = '👥 Admins:\n';
      for (let adminId in admins) {
        adminList += `- ${adminId}\n`;
      }
      bot.sendMessage(chatId, adminList);
    } catch (error) {
      console.error('Error listing admins:', error);
      bot.sendMessage(chatId, '⚠️ Failed to list admins.');
    }
  });

    bot.onText(/\/send_to_admins (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const senderId = msg.from.id;
        const message = match[1].trim(); // Message to send to all admins
    
        try {
        const isAdmin = await adminCheck(senderId);
        if (!isAdmin) {
            bot.sendMessage(chatId, '❌ You are not authorized to use this command.');
            return;
        }
    
        await sendToAllAdmins(message, chatId, bot);
        bot.sendMessage(chatId, '✅ Message sent to all admins.');
        } catch (error) {
        console.error('Error sending message to admins:', error);
        bot.sendMessage(chatId, '⚠️ Failed to send message to admins.');
        }
    });


};
