import { redirect } from "next/navigation";
import { Header } from "@/app/components/Header";
import { getSession } from "@/lib/session";

export default async function AdminTelegramPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { userEmail, isAdmin } = await getSession();
  if (!isAdmin) redirect("/admin-login");
  const { sent } = await searchParams;

  const token = process.env.TELEGRAM_BOT_TOKEN ?? "";
  const chatId = process.env.TELEGRAM_CHAT_ID ?? "";
  const tokenStatus = !token || token.includes("PASTE_") ? "не вставлен" : "вставлен";
  const chatStatus = !chatId || chatId.includes("PASTE_") ? "не вставлен" : chatId;

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Telegram-бот</h1>
        {sent === "1" && <div className="success">Сообщение отправлено в Telegram.</div>}
        {sent === "0" && (
          <div className="alert">
            Не получилось отправить. Проверь BotToken, ChatId и что ты написал боту первым.
          </div>
        )}
        <div className="card">
          <h2>Статус</h2>
          <p>
            <b>BotToken:</b> {tokenStatus}
          </p>
          <p>
            <b>ChatId:</b> {chatStatus}
          </p>
          <p className="muted">
            Данные задаются переменными окружения <code>TELEGRAM_BOT_TOKEN</code> и{" "}
            <code>TELEGRAM_CHAT_ID</code> в Vercel.
          </p>
        </div>
        <div className="card">
          <h2>Проверить отправку</h2>
          <form method="post" action="/api/admin/telegram-test" className="form">
            <label>
              Текст сообщения
              <input name="text" defaultValue="Проверка Telegram-бота Marathon Skills" />
            </label>
            <button className="btn danger" type="submit">
              Отправить тест
            </button>
          </form>
        </div>
        <div className="card">
          <h2>Как включить</h2>
          <ol className="route-list">
            <li>
              В Telegram открой <b>@BotFather</b> и создай бота через <code>/newbot</code>.
            </li>
            <li>Скопируй токен и вставь его в Vercel → Environment Variables → TELEGRAM_BOT_TOKEN.</li>
            <li>Напиши своему боту любое сообщение.</li>
            <li>
              Открой в браузере <code>https://api.telegram.org/botТВОЙ_ТОКЕН/getUpdates</code>.
            </li>
            <li>
              Найди <code>chat id</code> и вставь в Vercel → TELEGRAM_CHAT_ID.
            </li>
            <li>Сделай redeploy проекта в Vercel.</li>
          </ol>
        </div>
      </main>
    </>
  );
}
