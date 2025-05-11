module.exports = (bot) => {
  bot.onText(/\/help/, (msg) => {
    const helpMessage = `
👋 *Welcome to your Stock Alert Assistant!*

This bot is here to guide you on your journey to smarter investing and better financial habits. Here's what it can do for you:

📈 Stay updated with *real-time stock alerts*  
🧠 Get *insights* to help you understand the market  
🎯 Build *consistent investment habits*  
🚀 Make your money work *smarter, not harder*

Whether you're just getting started or sharpening your strategy, this bot is your go-to companion.

Type */commands* to see what you can do next!
    `;

    bot.sendMessage(msg.chat.id, helpMessage, { parse_mode: "Markdown" });
  });

  bot.onText(/\/about/, (msg) => {
    const helpMessage = `
👋 *Welcome to your Stock Alert Assistant!*

This bot is here to guide you on your journey to smarter investing and better financial habits. Here's what it can do for you:

📈 Stay updated with *real-time stock alerts*  
🧠 Get *insights* to help you understand the market  
🎯 Build *consistent investment habits*  
🚀 Make your money work *smarter, not harder*

Whether you're just getting started or sharpening your strategy, this bot is your go-to companion.

Type */commands* to see what you can do next!
    `;

    bot.sendMessage(msg.chat.id, helpMessage, { parse_mode: "Markdown" });
  });
};
