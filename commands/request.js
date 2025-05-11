const { sendToAllAdmins } = require("../utility/database");

module.exports = (bot) => {
    const userSessions = {};
  bot.onText(/\/request/, (msg) => {
    const chatId = msg.chat.id;

    const requestMessage = `
📩 *Request a Feature or Report a Bug*
`;
    bot.sendMessage(chatId, requestMessage, { parse_mode: "Markdown" });
    bot.sendMessage(
      chatId,
      "Please describe the feature you want to request or the bug you want to report."
    );

    userSessions[chatId] = { step: "waiting_for_request" };
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    const userSession = userSessions[chatId];
    if (userSession && userSession.step === "waiting_for_request") {
      // Process the user's request
      bot.sendMessage(
        chatId,
        "Thank you for your request! Our team will review it and get back to you."
      );

      // Optionally, you can send the request to an admin or log it somewhere
      console.log(`User ${chatId} requested: ${userMessage}`);
      try {
        await sendToAllAdmins(`User ${chatId} requested: ${userMessage}`, chatId, bot);
      }
      catch (error) {
        console.error("Error sending request to admins:", error);
        bot.sendMessage(chatId, "There was an error while sending your request.");
      }

      // Clear the session
      delete userSessions[chatId];
    }
    
  });

};
