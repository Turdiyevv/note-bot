module.exports = {
  numberOption: {
    reply_markup: {
      keyboard: [[{ text: "Share contact", request_contact: true }]],
      resize_keyboard: true,
    },
  },
  langOption: {
    reply_markup: {
      keyboard: [
        [
          { text: "Uz", callback_data: 0 },
          { text: "Ru", callback_data: 1 },
          // {text: "En", callback_data: 2},
        ],
      ],
      resize_keyboard: true,
    },
  },
  menuOption: {
    reply_markup: {
      keyboard: [
        [{ text: "PDF" }, { text: "Eslatmalar" }],
        [{ text: "Vidio_yuklash" }, { text: "Obhavo" }],
        [{ text: "Orqaga", callback_data: "/cancel" }],
      ],
      resize_keyboard: true,
    },
  },
  menuOptionRu: {
    reply_markup: {
      keyboard: [
        [{ text: "PDF" }, { text: "Примечания" }],
        [{ text: "Скачать_видео" }, { text: "Погода" }],
        [{ text: "Назад", callback_data: "/cancel" }],
      ],
      resize_keyboard: true,
    },
  },
  backUz: {
    reply_markup: {
      keyboard: [[{ text: "Orqaga", callback_data: "/cancel" }]],
      resize_keyboard: true,
    },
  },
  backRu: {
    reply_markup: {
      keyboard: [[{ text: "Назад", callback_data: "/cancel" }]],
      resize_keyboard: true,
    },
  },
  pdfBtn: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "PDF",
            url: "https://www.ilovepdf.com",
          },
        ],
      ],
    },
  },
  weatherBtn: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Weather",
            web_app: {url: "https://ob-havo-yakkabog.netlify.app/"},
          },
        ],
      ],
    },
  },
};
