const { saveAlert, adminCheck } = require("../utility/database");
const { sendToAllUsers } = require("../utility/methods");

module.exports = (bot) => {
  const userSessions = {};

  // Handle video link message flow
  bot.onText(/\/send_video_link/, async (msg) => {
    const chatId = msg.chat.id;

    if (userSessions[chatId]) {
      bot.sendMessage(chatId, "You are already in the middle of another process.");
      return;
    }

    try {
      const isAdmin = await adminCheck(msg.from.id);
      if (!isAdmin) {
        bot.sendMessage(chatId, "❌ You are not authorized to use this command.");
        return;
      }
      bot.sendMessage(chatId, "Please send me the video link.");
      userSessions[chatId] = { step: "waiting_for_video_link" };
    } catch (error) {
      console.error("Error checking admin status:", error);
      bot.sendMessage(chatId, "⚠️ Failed to check admin status.");
    }
  });

  // Handle video file upload flow
  bot.onText(/\/send_video/, async (msg) => {
    const chatId = msg.chat.id;

    if (userSessions[chatId]) {
      bot.sendMessage(chatId, "You are already in the middle of another process.");
      return;
    }

    try {
      const isAdmin = await adminCheck(msg.from.id);
      if (!isAdmin) {
        bot.sendMessage(chatId, "❌ You are not authorized to use this command.");
        return;
      }
      bot.sendMessage(chatId, "Please upload the video file you want to send to all users.");
      userSessions[chatId] = { step: "waiting_for_video_file" };
    } catch (error) {
      console.error("Error checking admin status:", error);
      bot.sendMessage(chatId, "⚠️ Failed to check admin status.");
    }
  });

  // Other command handlers
  bot.onText(/\/send_message/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Please send me the message you want to send to all users.");
    userSessions[chatId] = { step: "waiting_for_single_message" };
  });

  bot.onText(/\/message_admin/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Please send me the message you want to send to all users.");
    userSessions[chatId] = { step: "waiting_for_single_message" };
  });

  bot.onText(/\/send_alert/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Please send me the alert you want to send to all users.");
    userSessions[chatId] = { step: "waiting_for_alert" };
  });

  // Main message handler
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Video link flow
    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_video_link"
    ) {
      userSessions[chatId].videoLink = text;
      userSessions[chatId].step = "waiting_for_message";
      bot.sendMessage(chatId, "Got it! Now, please send the message you want to include with the video.");
      return;
    }

    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_message"
    ) {
      const message = `${text}\n\nWatch here: ${userSessions[chatId].videoLink}`;
      await sendToAllUsers(bot, message, chatId);
      delete userSessions[chatId];
      return;
    }

    // Text-only message
    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_single_message"
    ) {
      await sendToAllUsers(bot, text, chatId);
      delete userSessions[chatId];
      return;
    }

    // Alert flow
    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_alert"
    ) {
      const alertText = text;
      await saveAlert({ alert: alertText, timestamp: new Date().toISOString() });
      await sendToAllUsers(bot, alertText, chatId);
      delete userSessions[chatId];
      return;
    }

    // Video file handling
    if (
      userSessions[chatId] &&
      userSessions[chatId].step === "waiting_for_video_file" &&
      msg.video
    ) {
      const video = msg.video.file_id;
      const caption = "🎥 New video for you!";
      await sendToAllUsers(bot, { type: "video", file_id: video, caption }, chatId);

      //
      delete userSessions[chatId];
      return;
    }
  });
};
