const noteBtnUz =(id) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {text: "🗑O'chirish", callback_data: `delete_${id}`},
      ],
    ],
  },
})

const noteBtnRu = (id) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {text: "🗑Удалить", callback_data: `delete_${id}`},
      ],
    ],
  },
})
module.exports = { noteBtnUz, noteBtnRu,
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
          { text: "Uz"},
          { text: "Ru"},
          // {text: "En"},
        ],
      ],
      resize_keyboard: true,
    },
  },
  menuOption: {
    reply_markup: {
      keyboard: [
        [{ text: "🗒Eslatmalar" }],
        [
            { text: "📄PDF" },
            // { text: "🎞Vidio_yuklash" },
          { text: "⛅️Obhavo" }
        ],
        [{ text: "Orqaga" }],
      ],
      resize_keyboard: true,
    },
  },
  menuOptionRu: {
    reply_markup: {
      keyboard: [
        [{ text: "🗒Примечания" }],
        [
            { text: "📄PDF" },
            // { text: "🎞Скачать_видео" },
          { text: "⛅️Погода" }
        ],
        [{ text: "Назад" }],
      ],
      resize_keyboard: true,
    },
  },
  backUz: {
    reply_markup: {
      keyboard: [[{ text: "Orqaga"}]],
      resize_keyboard: true,
    },
  },
  backRu: {
    reply_markup: {
      keyboard: [[{ text: "Назад"}]],
      resize_keyboard: true,
    },
  },
  backNoteRUz: {
    reply_markup: {
      keyboard: [[
          { text: "Orqaga"},
          { text: "📜Barchasi"}
      ]],
      resize_keyboard: true,
    },
  },
  backNoteRu: {
    reply_markup: {
      keyboard: [[
          { text: "Назад"},
          { text: "📜Все"}
      ]],
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
