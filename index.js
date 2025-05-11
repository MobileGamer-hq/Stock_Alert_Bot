require('dotenv').config();
const express = require('express');
const app = express();
const bot = require('./bot'); // This runs the bot

app.get('/', (req, res) => {
  res.send('Express + Telegram Bot is working!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
