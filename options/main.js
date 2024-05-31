const {bot} = require("../index");
const User = require("../db/user")
const {startSession, register, login, requestContact, requestLang} = require("../functions/function");

const bootstrap = () => {
    bot.setMyCommands (
        [
            {command: "/start", description: 'Start chat'},
            {command: "/admin", description: 'Only for administrator'},
        ]).then (() =>{} )

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
            else if (text === "Uz" || text === "Ru"){
                if (user && user.phone){
                    if (user.action === 'lang'){
                        await requestLang(msg);
                    } else {
                        await register(msg);
                    }
                }else {
                    await login(msg);
                }
            }
            else if (contact){
                if (user){
                    if (user.action === 'appeal'){
                        await sendContact(msg, contact);
                    }
                    else if(user.action === 'request_contact' && !user.phone) {
                        return requestContact(msg);
                    }else {
                        await requestLang(msg, '⚠️')
                    }
                }else {
                    await login(msg)
                }
            }
        }
    })
}
module.exports = {bootstrap};