const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});
module.exports = {bot, TelegramBot};

//db
const mongoose = require("mongoose");
const {bootstrap} = require("./options/main");
mongoose.connect(process.env.MONGO_URL).then(() => {
      bootstrap();
    console.log('connected success')
}).catch(err => console.log(err))
//db

const express = require('express');
const User = require('./db/user'); // User modelini bu yerda import qilamiz

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Frontend fayllarini xizmat qilish

// Barcha foydalanuvchilarni olish
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send('err');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
