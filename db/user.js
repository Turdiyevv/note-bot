const {Schema, model} = require("mongoose")
const notificationSchema = new Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    notif: { type: Boolean, default: false }
});
const blogSchema = new Schema({
    chatId: { type: Number, unique: true, required: true },
    name: String,
    userName: String,
    phone: String,
    lang: String,
    admin: {type: Boolean, default: false},
    action: String,
    text: String,
    location: Number,
    notification: [notificationSchema],
    status: {type: Boolean, default: true},
    createDate: { type: Date, default: Date.now}
})
const User = model("User", blogSchema);
module.exports = User;