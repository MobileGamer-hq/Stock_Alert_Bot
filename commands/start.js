const { createUser, adminCheck } = require('../utility/database');
const commands = require('./commands');

module.exports = (bot) => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = {
      id: msg.from.id,
      firstName: msg.from.first_name || '',
      lastName: msg.from.last_name || '',
      username: msg.from.username || '',
      isBot: msg.from.is_bot || false,
    };

    try {
      await createUser(user); // Save user to database

      const isAdmin = await adminCheck(user.id); // Check if the user is an admin

      // Set different command menus for admins and users
      if (isAdmin) {
        await bot.setMyCommands([
          {command: 'start', description: 'Start your journey with stock alerts'},
          { command: 'about', description: 'Get to know your Stock Alert Assistant' },
          { command: 'help', description: 'How this bot works' },
          { command: 'alerts', description: 'Get latest stock alerts' },
          { command: 'send_message', description: 'Send message to all users' },
          { command: 'send_video', description: 'Send video to all users' },
          { command: 'send_alert', description: 'Send stock alert to all users' },
          { command: 'users', description: 'View number of registered users' },
          { command: 'list_users', description: 'List all registered users' },
          { command: 'add_admin', description: 'Add a user as admin' },
          { command: 'remove_admin', description: 'Remove a user from admin status' },
          { command: 'list_admins', description: 'List all admins' },
        ]);
        bot.sendMessage(chatId, "Welcome 🎉 You are an *admin*. Use /help to explore admin features.", { parse_mode: 'Markdown' });
      } else {
        await bot.setMyCommands([
          { command: 'start', description: 'Start your journey with stock alerts' },
          { command: 'commands', description: 'View all available commands' },
          { command: 'about', description: 'Get to know your Stock Alert Assistant' },
          { command: 'help', description: 'How this bot works' },
          { command: 'alerts', description: 'Get latest stock alerts' },

        ]);
        bot.sendMessage(chatId, "Welcome 🎉 You're all set up! Use /help to get started.");
      }

    } catch (error) {
      console.error('Failed to create user:', error);
      bot.sendMessage(chatId, "Oops, something went wrong while setting you up.");
    }
  });
};
