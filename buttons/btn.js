module.exports = {
    numberOption: {
        reply_markup: {
            keyboard: [
                [
                     {text: "Share contact", request_contact: true},
                ]
            ],
            resize_keyboard: true,
        }
    },
    langOption: {
        reply_markup: {
            keyboard: [
                [
                     {text: "Uz", callback_data: 0},
                     {text: "Ru", callback_data: 1},
                     // {text: "En", callback_data: 2},
                ]
            ],
            resize_keyboard: true,
        }
    },
}
