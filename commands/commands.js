module.exports = (bot) => {
  bot.onText(/\/commands/, (msg) => {
    const chatId = msg.chat.id;

    const commandsMessage = `
<b>📋 Available Commands:</b>

<b>👤 User Commands</b>
/start – Start your journey with stock alerts<br>
/help – Learn what this bot does and how to use it<br>
/about – Get to know your Stock Alert Assistant<br>
/commands – View all available commands<br>
/alerts – Get your latest stock alerts<br>

<b>🛠️ Admin Commands</b>
/send_message – Send a message to all users<br>
/send_video – Send a video to all users<br>
/send_alert – Send a stock alert to all users<br>
/users – View the number of registered users<br>
/list_users – List all registered users<br>
/add_admin &lt;id&gt; – Add a user as an admin<br>
/remove_admin &lt;id&gt; – Remove a user from admin status<br>
/list_admins – List all admins<br>

<i>For admin commands, make sure you have the necessary permissions.</i>
    `;

    bot.sendMessage(chatId, commandsMessage, { parse_mode: "HTML" })
      .catch((error) => {
        console.error('Failed to send /commands message:', error.message);
      });
  });
};
