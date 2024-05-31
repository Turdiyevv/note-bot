const {bot} = require('../index');
const User = require('../db/user');
const { numberOption, langOption} = require("../buttons/btn");

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
          🇺🇿 
          🇷🇺 ${user.lang}`
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
module.exports = {login, startSession, register}