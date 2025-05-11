const { saveAlert, adminCheck } = require("../utility/database");
const { sendToAllUsers } = require("../utility/methods");

module.exports = (bot) => {
  // Temporary storage for user session data
  const userSessions = {};

  bot.onText(/\/send_video/, async (msg) => {
    const chatId = msg.chat.id;

    // Check if the user is already in the process of sending video
    if (userSessions[chatId]) {
      bot.sendMessage(
        chatId,
        "You are already in the middle of sending a video."
      );
      return;
    }

    try {
      const isAdmin = await adminCheck(); // Replace with actual admin check logic
      if (!isAdmin) {
        bot.sendMessage(
          chatId,
          "❌ You are not authorized to use this command."
        );
        return;
      }
      bot.sendMessage(
        chatId,
        "Please send me the video link you want to send to all users."
      );
      userSessions[chatId] = { step: "waiting_for_video_link" };
    } catch (error) {
      console.error("Error checking admin status:", error);
      bot.sendMessage(chatId, "⚠️ Failed to check admin status.");
    }
  });

  bot.onText(/\/message/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Please send me the message you want to send to all users."
    );
    userSessions[chatId] = { step: "waiting_for_single_message" };
  });

  bot.onText(/\/send_message/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Please send me the message you want to send to all users."
    );
    userSessions[chatId] = { step: "waiting_for_single_message" };
  });

  bot.onText(/\/message_admin/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Please send me the message you want to send to all users."
    );
    userSessions[chatId] = { step: "waiting_for_single_message" };
  });

  bot.onText(/\/send_alert/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Please send me the alert you want to send to all users."
    );
    userSessions[chatId] = { step: "waiting_for_alert" };
  });

  // Handle video link and message
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Check if the user is in the middle of the session
    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_video_link"
    ) {
      // Store the video link
      userSessions[chatId].videoLink = text;
      userSessions[chatId].step = "waiting_for_message";

      // Ask for the message
      bot.sendMessage(
        chatId,
        "Got it! Now, please send me the message you want to include with the video."
      );
      return;
    }

    // Handle message text after the video link
    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_message"
    ) {
      // Store the message
      userSessions[chatId].message = text;

      // Format the message with the video link
      const formattedMessage = `${userSessions[chatId].message}\n\nWatch here: ${userSessions[chatId].videoLink}`;

      // Send to all users
      await sendToAllUsers(bot, formattedMessage, chatId);

      // End the session after sending the message
      delete userSessions[chatId];
    }

    // Handle message text for single message sending
    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_single_message"
    ) {
      // Store the message
      userSessions[chatId].message = text;

      // Send to all users
      await sendToAllUsers(bot, userSessions[chatId].message, chatId);

      // End the session after sending the message
      delete userSessions[chatId];
    }

    // Handle alert sending
    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_alert"
    ) {
      const alertText = text;
      userSessions[chatId].alert = alertText;

      alert = {
        alert: alertText,
        timestamp: new Date().toISOString(),
      };

      await saveAlert(alert); // Save the alert to the database

      await sendToAllUsers(bot, alertText, chatId); // Send the alert to all users

      // End session
      delete userSessions[chatId];
    }
  });
};
