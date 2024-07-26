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
      [{text: "🗑Удалить", callback_data: `delete_${id}`},],
    ],
  },
})
const cabinetFunction = (phone) => ({
  reply_markup: {
    keyboard: [
      [
          {text: "🪪Kabinet",web_app: {url: `https://nuxe-note.vercel.app`}},
          { text: "🗒Eslatmalar" },
      ],
      [{ text: "Orqaga" }],
    ],
    resize_keyboard: true,
  },
})
const cabinetFunctionRu = (phone) => ({
  reply_markup: {
    keyboard: [
      [
          {text: "🪪Кабинет",web_app: {url: `https://nuxe-note.vercel.app?phone=${phone}`}},
          { text: "🗒Примечания" },
      ],
      [{ text: "Назад" }],
    ],
    resize_keyboard: true,
  },
})
module.exports = { noteBtnUz, noteBtnRu, cabinetFunction, cabinetFunctionRu,
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
        ],
      ],
      resize_keyboard: true,
    },
  },
  backNoteRUz: {
    reply_markup: {
      keyboard: [[
          { text: "📜Barchasi"},
          { text: "Orqaga"},
      ]],
      resize_keyboard: true,
    },
  },
  backNoteRu: {
    reply_markup: {
      keyboard: [[
          { text: "📜Все"},
          { text: "Назад"},
      ]],
      resize_keyboard: true,
    },
  },
};
