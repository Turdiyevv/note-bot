const {bot} = require('../index');
const User = require('../db/user');
const { numberOption, langOption, menuOption, menuOptionRu} = require("../buttons/btn");
const {helloText, notWrite, Hints, replyHints, replyAppeal} = require("../texts/text")

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
        await bot.sendMessage(msg.chat.id, `🔸
          🇺🇿 ${helloText.uzAllHello}
          🇷🇺 ${helloText.ruAllHello}
          ${user.lang}`
        )
        return bot.sendMessage(chatId, `Tilni tanlang! | Выберите язык!`, langOption);
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
                ${user.lang ==='Uz' ? Hints.uzHints : user.lang ==='Ru'? Hints.ruHints : 'none'}`,
            user.lang ==='Uz' ? menuOption : menuOptionRu);
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
module.exports = {login, startSession, register, requestContact, requestLang, noWrite}