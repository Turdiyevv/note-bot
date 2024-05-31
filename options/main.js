const {bot} = require("../index");
const User = require("../db/user")
const {startSession, register, login} = require("../functions/function");

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
        }
    })
}
module.exports = {bootstrap};