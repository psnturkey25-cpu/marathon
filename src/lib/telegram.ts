// Отправка сообщения через Telegram Bot API.
// Токен и chat id берутся из переменных окружения Vercel: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return false;
  if (token.includes("PASTE_") || chatId.includes("PASTE_")) return false;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ chat_id: chatId, text }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
