const helloText = {
  uzAllHello: `Sizni botimizda ko'rib turganimizdan xursandmiz! Maqbul tilni tanlang.`,
  ruAllHello: `Мы рады видеть вас в нашем боте! Выберите оптимальный язык.`,
  // enAllHello: `We are glad to see you in our special bot to support our users! Choose language.`
};
const Hints = {
    uzHints: "🔹 Bu bot bir nechta funksiyalarga ega bot hisoblanadi. Menudagi zarur bo'limni tanlab foydalanishingiz mumkin !",
    ruHints: "🔹 Этот бот считается ботом с несколькими функциями. Вы можете использовать его, выбрав нужный раздел в меню !",
    enHints: "🔹 This bot is a bot with several functions. You can use it by selecting the required section in the menu !",
}
const replyHints = {
    uzReply: "🔸 Hujjatlar bilan ishlash. " +
        "🔸 Kerakli ma'lumotlarni saqlab qo'yish. " +
        "🔸 Instagramdan vidio yuklash. " +
        "🔸 Ob-havo ma'lumotlari.",
    ruReply: "🔸 Работа с документами." +
        "🔸 Сохранить необходимые данные" +
        "🔸 Загрузка видео из Instagram." +
        "🔸Прогноз погоды.",
    // enReply: "If you didn't find the answer to your question there, please contact us. We answer questions in the order in which they are received."
}

const notesText = {
    uzText: "🗒 Bu yerda siz zaruriy eslatmalarni saqlab qo'yishingiz va sizga kerakli vaqtda bildirishnoma yuborilishini sozlashingiz mumkin.",
    ruText: "🗒 Здесь вы можете сохранить необходимые напоминания и настроить отправку уведомлений в нужное время.",
    // enText: " Dear user, for a quick solution to your problem, please write your account number from Plum application."
}
const writeNoteText = {
    uzText: "Eslatma xabarlarni yuboring. Xabaringizni boshidagi so'zlari mavzu sifatida ishlatiladi!",
    ruText: "Отправляйте напоминания. Слова в начале Вашего сообщения используются в качестве темы!",
    // enText: " Dear user, for a quick solution to your problem, please write your account number from Plum application."
}

const replyAppeal = {
    uzAppeal: "🔹 Hurmatli mijoz, muammoingizni tez hal etish uchun Plumdagi akkaunt raqamingizni yozishingizni so'raymiz.",
    ruAppeal: "🔹 Уважаемый клиент для быстрого решение вашей проблемы просим Вас написать номер Вашего аккаунта от Plum.",
    // enAppeal: "🔹 Dear user, for a quick solution to your problem, please write your account number from Plum application."
}
const doneWrite = {
    uzWrite : "✅ Hurmatli mijoz iltimos kuting, sizga tez orada xodimimiz javob beradi!",
    ruWrite : "✅ Уважаемый клиент, пожалуйста, подождите, наш сотрудник ответит вам в ближайшее время!"
}
const notWrite = {
    uzNotWrite: "⚠️ Uzr, siz to'g'ridan to'g'ri xabar yuborolmaysiz !",
    ruNotWrite: "⚠️ Извините, вы не можете отправить прямое сообщение !",
    // enNotWrite: "⚠️ Sorry, you can't write a message directly !",
}
const write = {
    uzWrite: "📝 Murojaat yuborishingiz mumkin !",
    ruWrite: "📝 Вы можете отправить заявку !",
    // enNotWrite: "📝 You can send an appeal !",
}
// const doneWrite = {
//     uzWrite: "✅ Murojaatingiz yetkazildi!",
//     ruWrite: "✅ Ваше обращение доставлено!",
//     // enNotWrite: "📝 You can send an appeal !",
// }


const notAdmin = {
    text:
        "⚠️ Bu buyruq faqat admin uchun mavjud!" +
        "⚠️Этo команда доступнo только для администратора!" +
        "👉 /start"
}
module.exports = { helloText, notWrite, notAdmin,
    write,doneWrite, Hints, replyHints, replyAppeal,
    notesText, writeNoteText}
