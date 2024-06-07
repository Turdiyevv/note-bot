const {bot} = require("../index");
const User = require("../db/user")
const {
  startSession,
  register,
  login,
  requestContact,
  requestLang,
  Back,
  toPDF, weather, download, downloadStart, notes, noteSec
} = require("../functions/function");


const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const bootstrap = () => {
    bot.setMyCommands (
        [
            {command: "/start", description: 'Start chat'},
            {command: "/admin", description: 'Only for administrator'},
        ]).then (() =>{} )

//     bot.on('sticker', (msg) => {
//     const chatId = msg.chat.id;
//     const stickerFileId = msg.sticker.file_id;
//     console.log('Stiker file_id:', stickerFileId);
// });
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
            else if (text && ytdl.validateURL(text)) {
              if (user && user.phone) {
                if (user.action === "download") {
                  await downloadStart(msg);
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
            else if (text && user && user.action === 'write-note') {
              if (user.phone) {
                  await noteSec(msg)
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
module.exports = {bootstrap};
