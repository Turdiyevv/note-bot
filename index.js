const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});
module.exports = {bot, TelegramBot};

//db
const mongoose = require("mongoose");
const {bootstrap} = require("./options/main");
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
      bootstrap();
    console.log('connected success')
}).catch(err => console.log(err))
//db