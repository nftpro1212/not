const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const API_URL = process.env.API_URL || "http://localhost:4000";

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN .env faylda yo‘q!");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// /start komandasi
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const { username, first_name, last_name } = msg.from;

  try {
    // ✅ To‘g‘ri endpoint
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      telegramId: String(chatId),
      username,
      firstName: first_name,
      lastName: last_name,
    });

    const user = res.data.user;

    bot.sendMessage(
      chatId,
      `👋 Salom, ${user.firstName || "Foydalanuvchi"}!\n` +
        `Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz ✅\n` +
        `Balansingiz: ${user.balanceTon || 0} TON`
    );
  } catch (err) {
    console.error("Auth error:", err.response?.data || err.message);
    bot.sendMessage(chatId, "❌ Ro‘yxatdan o‘tishda xatolik yuz berdi.");
  }
});

// Oddiy "salom" javobi
bot.on("message", (msg) => {
  if (msg.text?.toLowerCase() === "salom") {
    bot.sendMessage(msg.chat.id, "Va alaykum salom 🤝");
  }
});

module.exports = bot;
