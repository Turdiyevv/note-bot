const {Schema, model} = require("mongoose")

const blogSchema = new Schema({
    chatId: { type: Number, unique: true, required: true },
    name: String,
    userName: String,
    phone: String,
    lang: String,
    admin: {
        type: Boolean,
        default: false,
    },
    action: String,
    text: String,
    location: Number,
    notification: {
        timeout: Date,
        text: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createDate: Date
})
const User = model("User", blogSchema);
module.exports = User