require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bot = require('./bot'); // This runs the bot

// Set webhook URL (replace with your actual domain)
const token = process.env.BOT_TOKEN;


// Use body-parser to parse the incoming POST requests from Telegram
app.use(bodyParser.json());

// POST endpoint to receive updates from Telegram (this is the path set in the webhook URL)
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body); // Process the update received from Telegram
    res.sendStatus(200); // Send a 200 response to Telegram
});

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Express + Telegram Bot is working!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
