const {bot} = require("../index");
const User = require("../db/user")
const {
  startSession,
  register,
  login,
  requestContact,
  requestLang,
  Back,
  toPDF, weather, download, notes, noteSec, allNotes,
    callBackDelete, cabinet
} = require("../functions/function");
const {getMyInfo} = require("../server");
const axios = require('axios');

let userPhone = '';
const bootstrap = () => {
    bot.setMyCommands (
        [
            {command: "/start", description: 'Start chat'},
            {command: "/admin", description: 'Only for administrator'},
        ]).then (() =>{} )


    async function getMyInfo(phone) {
        try {
            const response = await axios.post('http://localhost:3001/api/userByPhone', { phone });
            return response.data;
        } catch (err) {
            console.error('Error: ' + err.message);
            return null;
        }
    }
    bot.on('callback_query', async (callbackQuery) => {
        const data = callbackQuery.data;
        const chatId = callbackQuery.message.chat.id;
        if (data.startsWith('delete_')){
            await callBackDelete(chatId, data);
        }
    });
    bot.on('message', async msg => {
        if (msg.chat.type === 'private') {
            const chatId = msg.chat.id;
            const text = msg.text;
            const photo = msg.photo;
            const audio = msg.audio;
            const contact = msg.contact;
            const voice = msg.voice;
            const video = msg.video;
            const document = msg.document;
            const videoNote = msg.video_note;

            const user = await User.findOne({chatId}).lean();
            userPhone = user.phone;

            if (text === '/start'){
                if (user && user.phone){
                    await startSession(msg, user);
                } else if (user && !user.phone){
                    await register(msg);
                } else{
                    await login(msg);
                }
            }
            else if (text === "Uz" || text === "Ru") {
              if (user && user.phone) {
                if (user.action === "lang") {
                  await requestLang(msg);
                } else {
                  await startSession(msg, user);
                }
              } else {
                await login(msg);
              }
            }
            else if (text === "📄PDF") {
              if (user && user.phone) {
                if (user.action === "menu") {
                  await toPDF(msg);
                } else {
                  await startSession(msg, user);
                }
              } else {
                await login(msg);
              }
            }
            else if (text === "⛅️Obhavo" || text === "⛅️Погода") {
              if (user && user.phone) {
                if (user.action === "menu") {
                  await weather(msg);
                } else {
                  await startSession(msg, user);
                }
              } else {
                await login(msg);
              }
            }
            else if (text === "🪪Kabinet" || text === "🪪Кабинет") {
              if (user && user.phone) {
                if (user.action === "menu") {
                    const userInfo = await getMyInfo(user.phone);
                    if (userInfo) {
                        await bot.sendMessage(chatId, `Your profile info: ${JSON.stringify(userInfo)}`);
                    } else {
                        await bot.sendMessage(chatId, `User info not found.`);
                    }
                  await cabinet(msg);
                } else {
                  await startSession(msg, user);
                }
              } else {
                await login(msg);
              }
            }
            else if (text === "🎞Vidio_yuklash" || text === "🎞Скачать_видео") {
              if (user && user.phone) {
                if (user.action === "menu") {
                  await download(msg);
                } else {
                  await startSession(msg, user);
                }
              } else {
                await login(msg);
              }
            }
            else if (text === "🗒Eslatmalar" || text === "🗒Примечания") {
              if (user && user.phone) {
                if (user.action === "menu") {
                  await notes(msg);
                } else {
                  await startSession(msg, user);
                }
              } else {
                await login(msg);
              }
            }
            else if (text === "📜Barchasi" || text === "📜Все") {
              if (user && user.phone) {
                if (user.action === "write-note") {
                  await allNotes(msg);
                } else {
                  await startSession(msg, user);
                }
              } else {
                await login(msg);
              }
            }
            else if (text === "Orqaga" || text === "Назад") {
              if (user) {
                return Back(msg);
              } else {
                await login(msg);
              }
            }
            else if (text) {
              if (user && user.phone) {
                  await noteSec(msg)
              } else {
                await login(msg);
              }
            }
            else if (contact) {
              if (user) {
                if (user.action === "appeal") {
                  await sendContact(msg, contact);
                } else if (user.action === "request_contact" && !user.phone) {
                  return requestContact(msg);
                } else {
                  await requestLang(msg, "⚠️");
                }
              } else {
                await login(msg);
              }
            }
        }
    })
}

module.exports = {bootstrap, userPhone};
