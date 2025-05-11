module.exports = (bot) => {
  bot.onText(/\/commands/, (msg) => {
    const chatId = msg.chat.id;

    const commandsMessage = `
📋 *Available Commands:*

👤 *User Commands*
/start – Start your journey with stock alerts
/help – Learn what this bot does and how to use it  
/about – Get to know your Stock Alert Assistant
/commands – View all available commands
/alerts – Get your latest stock alerts  

🛠️ *Admin Commands*
/send_message – Send a message to all users  
/send_video – Send a video to all users
/send_alert – Send a stock alert to all users
/users – View the number of registered users  

/list_users – List all registered users
/add_admin <id> – Add a user as an admin
/remove_admin <id> – Remove a user from admin status
/list_admins – List all admins

_For admin commands, make sure you have the necessary permissions._
    `;

    bot.sendMessage(chatId, commandsMessage, { parse_mode: "Markdown" });
  });
};
