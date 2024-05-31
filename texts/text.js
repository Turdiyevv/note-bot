const helloText = {
    uzAllHello: `Sizni foydalanuvchilarimizni qo’llab quvvatlash botimizda ko'rib turganimizdan xursandmiz! Maqbul tilni tanlang.`,
    ruAllHello: `Мы рады видеть вас в нашем специальном боте для поддержки наших пользователей! Выберите подходящий язык.`,
    // enAllHello: `We are glad to see you in our special bot to support our users! Choose language.`
}
const Hints = {
    uzHints: "🔹Bizda eng ko'p beriladigan savollarga tayyor javoblar bor, siz “Qo’llanma” havolasini bosish orqali o'qishingiz mumkin",
    ruHints: "🔹Мы ответили на наиболее часто задаваемые вопросы, с которыми вы можете ознакомиться, перейдя по ссылке на “Подсказки”.",
    enHints: "We have answered the most frequently asked questions, which you can read by clicking on the link to Hints",
}
const replyHints = {
    uzReply: "🔹Agar savolingizga javob topa olmagan bo'lsangiz, biz bilan bog'laning. Biz savollarga ular qabul qilingan tartibda javob beramiz.",
    ruReply: "🔹Если вы не нашли там ответа на свой вопрос, то напишите нам. Мы отвечаем на вопросы в порядке поступления.",
    // enReply: "If you didn't find the answer to your question there, please contact us. We answer questions in the order in which they are received."
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
module.exports = { helloText, notWrite, notAdmin, write,doneWrite, Hints, replyHints, replyAppeal}