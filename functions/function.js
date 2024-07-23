const {bot} = require('../index');
const User = require('../db/user');
const {
  numberOption,
  langOption,
  menuOption,
  menuOptionRu,
  pdfBtn, weatherBtn, backUz,
    backRu, noteBtnUz, noteBtnRu, backNoteRUz,
    backNoteRu,profileBtn
} = require("../buttons/btn");
const {
    helloText, notWrite, Hints,
    replyHints, replyAppeal, notesText,
    writeNoteText
} = require("../texts/text");

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
          ${user.lang}`, langOption
        );
        await bot.sendMessage(chatId,  'Kabinet | Кабинет', profileBtn(user.phone));
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
                ${user.lang ==='Uz' ? Hints.uzHints : user.lang ==='Ru'? Hints.ruHints : 'none'}
                
                ${user.lang ==='Uz' ? replyHints.uzReply : user.lang ==='Ru'? replyHints.ruReply : 'none'}`,
            user.lang ==='Uz' ? menuOption : menuOptionRu);
    }else {
        await noWrite(msg);
    }
}
const toPDF = async (msg) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({ chatId }).lean();
    if (msg.text === '📄PDF'){
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
    if (msg.text === '⛅️Obhavo' || msg.text === '⛅️Погода'){
        await bot.sendMessage(chatId,`${user.lang ==='Uz' ? '🇺🇿' : user.lang ==='Ru'? '🇷🇺' : 'none'} ${user.lang}
                ${user.lang ==='Uz' ? Hints.uzHints : user.lang ==='Ru'? Hints.ruHints : 'none'}`,weatherBtn);
    }else {
        await noWrite(msg);
    }
}
const cabinet = async (msg) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({ chatId }).lean();
    // try {
    //     const res = await fetch(`http://localhost:3001/api/myInfo?chatId=${chatId}`);
    //     const data = await res.json();
    //     console.log(data)
    // }catch (e) {
    //     await bot.sendMessage(chatId, `Xatolik yuz berdi: ${e}`);
    // }
    if (msg.text === '🪪Kabinet' || msg.text === '🪪Кабинет'){
        await bot.sendMessage(chatId,  'Kabinet | Кабинет', profileBtn);
    }else {
        await noWrite(msg);
    }
}
const notes = async (msg) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({ chatId }).lean();
    if (msg.text === '🗒Eslatmalar' || msg.text === '🗒Примечания'){
        user.action = 'write-note';
        await User.findByIdAndUpdate(user._id, user, {new: true});
        const stickerFileId = 'CAACAgIAAxkBAAIFtWZkdvan0_fBkvSGknbw44_doAzPAAJIAgACVp29Chz1cvjcKRTQNQQ';
        await bot.sendSticker(chatId,`${stickerFileId}`, user.lang ==='Uz' ? backNoteRUz : user.lang ==='Ru'? backNoteRu : 'none');
    }else {
        await noWrite(msg);
    }
}
const noteSec = async (msg) => {
    const chatId = msg.chat.id;
    const textMsg = `${msg.text}`;
    let user = await User.findOne({ chatId });
    if (user && user.action === 'write-note'){
        try {
            user.notification.push({ message: textMsg });
            await User.findByIdAndUpdate(user._id, user, {new: true});
            await bot.sendMessage(chatId,
                `${user.lang ==='Uz' ? `#${msg.text.trim().split(' ')[0]} - Nomli xabar yaratildi` : 
                    `Создано сообщение с именем - #${msg.text.trim().split(' ')[0]}`}`);
        }catch (err){
            await bot.sendMessage(chatId, `${err}`)
        }
    }else {
        await noWrite(msg);
    }
}

let messageIds = [];
const allNotes = async (msg) => {
    const chatId = msg.chat.id;
    if (messageIds?.length){
        for (const msg of messageIds) {
            try {
                await bot.deleteMessage(chatId, msg.messageId);
            } catch (err) {
                await bot.sendMessage(chatId, `old message: ${msg.messageId}`);
            }
        }
        messageIds = [];
    }else {
        messageIds = [];
    }
    try {
        const user = await User.findOne({chatId}).lean();
        if (user.notification && user.notification.length > 0){
            for (const notification of user.notification){
                const message =`
                    ${notification.message || '🤷‍♂️'}
                    ${new Date(notification.date).toLocaleDateString() || '🤷‍♂️'} ${notification.date ? new Date(user.createDate).toLocaleTimeString() : '🤷‍♂️'}
                    ⏳  ${notification.notif ? '✅' : 'none'}`
                const sentMessage = await bot.sendMessage(chatId,`📨 #${notification.message.trim().split(' ')[0] || '🤷‍♂️'} ${message}`,
            user.lang ==='Uz' ? noteBtnUz(notification._id) : user.lang ==='Ru'? noteBtnRu(notification._id) : 'none');
                messageIds.push({ notificationId: notification._id.toString(), messageId: sentMessage.message_id });
            }
        }else {
            await bot.sendMessage(chatId, `${user.lang ==='Uz' ? '⚠️ Topilmadi' : '⚠️ Не найдено'}`);
        }
    }catch (err){
        await bot.sendMessage(chatId,`'🤷‍♂️' Notes: ${err}`);
    }
}
const callBackDelete = async (chatId, data) => {
     const id = data.split('_')[1];
     const user = await User.findOne({ chatId }).lean();
     if (user && !user.notification || user.notification === 0 || undefined){
         return bot.sendMessage(chatId, `${user.lang ==='Uz' ? '⚠️ Eslatmalar topilmadi' : '⚠️ Примечания не найдены'}`);
     }else {
        const notification = user.notification.find(note => note._id.toString() === id);
        if (notification){
            user.notification = user.notification.filter(note => note._id.toString() !== id);
            await User.findByIdAndUpdate(user._id, user, { new: true });
            const messageToDelete = messageIds.find(msg => msg.notificationId === id);
            if (messageToDelete){
                try {
                    await bot.deleteMessage(chatId, messageToDelete.messageId);
                }catch (err){
                    await bot.sendMessage( chatId, `${'err:', err}`);
                }
            }
            // await bot.sendMessage(chatId, `${user.lang ==='Uz' ? '✅ O\'chirildi' : '✅ Удалено'}`);
        }else {
         return bot.sendMessage(chatId, `${user.lang ==='Uz' ? '🤷‍♂️ Eslatma yo\'q' : '🤷‍♂️ Нет примечания'}`);
        }
    }
}

// download
const download = async (msg) => {
    const chatId = msg.chat.id;
    let user = await User.findOne({ chatId }).lean();
    if (msg.text === '🎞Vidio_yuklash' || msg.text === '🎞Скачать_видео'){
        user.action = 'download';
        await User.findByIdAndUpdate(user._id, user, {new: true});

        await bot.sendMessage(chatId,`${user.lang ==='Uz' ? '🇺🇿' : user.lang ==='Ru'? '🇷🇺' : 'none'} ${user.lang}
                ${user.lang ==='Uz' ? Hints.uzHints : user.lang ==='Ru'? Hints.ruHints : 'none'}`,
            user.lang ==='Uz' ? backUz : user.lang ==='Ru'? backRu : 'none');
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
  toPDF,weather, download, notes, noteSec, allNotes,
    callBackDelete, cabinet
};
