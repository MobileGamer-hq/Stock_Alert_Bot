const TelegramBot = require('node-telegram-bot-api');
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const sendCommands = require('./commands/send');
const userCommands = require('./commands/users');
const commands = require('./commands/commands');
const requestCommands = require('./commands/request');
const adminCommands = require('./commands/admin');


const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Register commands
startCommand(bot);
helpCommand(bot);
sendCommands(bot);
userCommands(bot);
commands(bot);
requestCommands(bot);
adminCommands(bot);

module.exports = bot;
