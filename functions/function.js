const {bot} = require('../index');
const User = require('../db/user');
const {
  numberOption,
  langOption,
  menuOption,
  menuOptionRu,
  pdfBtn, weatherBtn, backUz, backRu,
} = require("../buttons/btn");
const {
    helloText, notWrite, Hints,
    replyHints, replyAppeal
} = require("../texts/text")


const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const adminNumbers = ["+998916384402", "998916384402"];
const checkUserAdmin = (phone_number) => {
    return adminNumbers.includes(phone_number);
};
const startSession = async (msg, user) => {
    const chatId = msg.chat.id;
        user.lang = '';
        user.action = 'lang';
        user.admin = checkUserAdmin(user.phone);
        await User.findByIdAndUpdate(user._id, user, {new: true});
        await bot.sendMessage(
          chatId,
          `🔸
          🇺🇿 ${helloText.uzAllHello}
          🇷🇺 ${helloText.ruAllHello}
          ${user.lang}`,
          langOption
        );
}
const register = async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId,`Iltimos ro'yxatdan o'ting! | Пожалуйста, зарегистрируйтесь!`, numberOption);
}
const login = async (msg) => {
    const chatId = msg.chat.id;
    let newUser = new User({
        chatId: msg.chat.id,
        name: msg.from.first_name,
        userName: msg.from.username,
        admin: false,
        status: true,
        createDate: new Date(),
        action: 'request_contact'
    })
    try {
        await newUser.save();
        await register(msg);
    } catch (error) {
        return bot.sendMessage(chatId, `Ro'yxatdan o'tishda xatolik yuz berdi: ${error}`);
    }
}
const requestContact = async (msg) => {
    const chatId = msg.chat.id;
    if (msg.contact && msg.contact.phone_number){
        let user = await User.findOne({chatId}).lean();
        user.phone = msg.contact.phone_number;
        user.admin = checkUserAdmin(msg.contact.phone_number);
        user.action = 'lang';
        await User.findByIdAndUpdate(user._id, user, {new: true});
        await  bot.sendMessage(msg.chat.id, `✅
            ☺️ Assalomu alaykum hurmatli ${msg.chat.first_name},${helloText.uzAllHello}!
            ☺️ Здравствуйте, ${msg.chat.first_name} ${helloText.ruAllHello}!`
        );
        await bot.sendMessage(chatId, `Tilni tanlang! | Выберите язык!`, langOption);
    }
}
const requestLang = async (msg, text) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({chatId}).lean();
    if (msg.text === 'Uz' || msg.text === 'Ru'){
        user.lang = msg.text === 'Uz'? 'Uz': msg.text === 'Ru' ? 'Ru' : user.lang;
        user.action = 'menu';
        await User.findByIdAndUpdate(user._id, user, {new: true});
        await bot.sendMessage(chatId,`${text ? text : ''} ${user.lang ==='Uz' ? '🇺🇿' : user.lang ==='Ru'? '🇷🇺' : 'none'} ${user.lang}
                ${user.lang ==='Uz' ? Hints.uzHints : user.lang ==='Ru'? Hints.ruHints : 'none'},
                ${user.lang ==='Uz' ? replyHints.uzReply : user.lang ==='Ru'? replyHints.ruReply : 'none'},
                ${user.lang ==='Uz' ? replyAppeal.uzAppeal : user.lang ==='Ru'? replyAppeal.ruAppeal : 'none'}`,
            user.lang ==='Uz' ? menuOption : menuOptionRu);
    }else {
        await noWrite(msg);
    }
}
const toPDF = async (msg) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({ chatId }).lean();
    if (msg.text === 'PDF'){
        await User.findByIdAndUpdate(user._id, user, {new: true});
        await bot.sendMessage(chatId,`${user.lang ==='Uz' ? '🇺🇿' : user.lang ==='Ru'? '🇷🇺' : 'none'} ${user.lang}
                ${user.lang ==='Uz' ? Hints.uzHints : user.lang ==='Ru'? Hints.ruHints : 'none'}`,pdfBtn);
    }else {
        await noWrite(msg);
    }
}
const weather = async (msg) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({ chatId }).lean();
    if (msg.text === 'Obhavo' || msg.text === 'Погода'){
        await bot.sendMessage(chatId,`${user.lang ==='Uz' ? '🇺🇿' : user.lang ==='Ru'? '🇷🇺' : 'none'} ${user.lang}
                ${user.lang ==='Uz' ? Hints.uzHints : user.lang ==='Ru'? Hints.ruHints : 'none'}`,weatherBtn);
    }else {
        await noWrite(msg);
    }
}
const download = async (msg) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({ chatId }).lean();
    if (msg.text === 'Vidio_yuklash' || msg.text === 'Скачать_видео'){
        user.action = 'download';
        await User.findByIdAndUpdate(user._id, user, {new: true});

        await bot.sendMessage(chatId,`${user.lang ==='Uz' ? '🇺🇿' : user.lang ==='Ru'? '🇷🇺' : 'none'} ${user.lang}
                ${user.lang ==='Uz' ? Hints.uzHints : user.lang ==='Ru'? Hints.ruHints : 'none'}`,
            user.lang ==='Uz' ? backUz : user.lang ==='Ru'? backRu : 'none');
    }else {
        await noWrite(msg);
    }
}
const downloadStart = async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    let user = await User.findOne({ chatId }).lean();
    if (text && ytdl.validateURL(text)){
        await bot.sendMessage(chatId,`${user.lang ==='Uz' ? '🇺🇿' : user.lang ==='Ru'? '🇷🇺' : 'none'} ${user.lang}
        start download`, user.lang ==='Uz' ? backUz : user.lang ==='Ru'? backRu : 'none');

        try {
            const info = await ytdl.getInfo(text);
            const videoTitle = info.videoDetails.title;
            const outputFilePath = `${videoTitle}.mp4`;

            const videoStream = ytdl(text, { filter: format => format.container === 'mp4' });
            videoStream.pipe(fs.createWriteStream(outputFilePath));

            videoStream.on('finish', () => {
            // Yuborish jarayoni
                bot.sendMessage(chatId, `Yuklab olingdi, yuborilmoqda...`);
                bot.sendVideo(chatId, { source: fs.createReadStream(outputFilePath) })
                .then(() => {
                console.log(outputFilePath)
                    // Yuborish muvaffaqiyatli tugaganda
                    fs.unlinkSync(outputFilePath);
                    bot.sendMessage(chatId, 'Yuborildi');
                })
                .catch(err => {
                    // Yuborishda xatolik
                    bot.sendMessage(chatId, `Xatolik: Yuborilmadi - ${err}`);
                });
            });
            // Yuklab olish jarayonida xatolik
            videoStream.on('error', (err) => {
                bot.sendMessage(chatId, `Xatolik: Yuklab olishda xatolik - ${err}`);
            });
        } catch (error){
           return bot.sendMessage(chatId, `error link ${error}`);
        }
    }else {
        await noWrite(msg);
    }
}


const noWrite = async (msg) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({chatId}).lean();
    if (user){
        return bot.sendMessage(chatId,`${user.lang ==='Uz' ? notWrite.uzNotWrite : notWrite.ruNotWrite}`);
    }
}
const Back = async (msg) => {
  const chatId = msg.chat.id;
  let user = await User.findOne({ chatId }).lean();
  if (user.action === "menu") {
    user.action = "lang";
    user.lang = "";
    await User.findByIdAndUpdate(user._id, user, { new: true });
    await bot.sendMessage(chatId, `🔙 ${msg.text}`, langOption);
  } else {
    user.action = "menu";
    await User.findByIdAndUpdate(user._id, user, { new: true });
    await bot.sendMessage(
      chatId,
      `🔙 ${msg.text}`,
      user.lang === "Uz" ? menuOption : menuOptionRu
    );
  }
};
module.exports = {
  login,
  startSession,
  register,
  requestContact,
  requestLang,
  noWrite,
  Back,
  toPDF,weather, download, downloadStart
};