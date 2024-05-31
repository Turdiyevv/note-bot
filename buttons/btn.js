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
    menuOption: {
        reply_markup: {
            keyboard: [
                [
                    {text: "Qo’llanma", value: '/question'},
                    {text: "Murojaat", value: '/connect'},
                ],
                [
                    {text: "Orqaga", callback_data: '/cancel'},
                ]
            ],
            resize_keyboard: true,
        }
    },
    menuOptionRu: {
        reply_markup: {
            keyboard: [
                [
                    {text: "Подсказки", value: '/question'},
                    {text: "Обращение", value: '/connect'},
                ],
                [
                    {text: "Назад", callback_data: '/cancel'},
                ]
            ],
            resize_keyboard: true,
        }
    },
    backUz: {
        reply_markup: {
            keyboard: [
                [
                    {text: "Orqaga", callback_data: '/cancel'},
                ]
            ],
            resize_keyboard: true,
        }
    },
    backRu: {
        reply_markup: {
            keyboard: [
                [
                    {text: "Назад", callback_data: '/cancel'},
                ]
            ],
            resize_keyboard: true,
        }
    },
}
