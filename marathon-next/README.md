# Marathon Skills 2026 — Next.js + Supabase

Сайт марафона переписан с ASP.NET Core (C#) на Next.js, чтобы нормально работать на Vercel
вместе с Supabase (база данных) и входом через Google.

## Что изменилось по сравнению со старой версией на C#

- Данные хранятся в Supabase (Postgres) вместо локального файла SQLite — на Vercel нет
  постоянного диска, поэтому SQLite-файл там не работал бы.
- Вход пользователей — через Google (Supabase Auth), без своего email/пароля.
- Вход в админку остался отдельным, по одному паролю (как было) — задаётся переменной
  окружения `ADMIN_PASSWORD`, никак не связан с Google-аккаунтами.
- Тот же набор страниц и тот же визуальный стиль (тёмная тема, те же цвета и вёрстка).

## Шаг 1 — настройка Supabase

1. Открой свой проект в Supabase → **SQL Editor** → **New query**.
2. Скопируй содержимое файла `supabase-schema.sql` из этого проекта и выполни (кнопка Run).
   Это создаст таблицы `participants` и `results`.
3. Зайди в **Authentication → Providers → Google** и включи провайдер Google:
   - Нужен Google OAuth Client ID и Client Secret — их получаешь в
     Google Cloud Console (console.cloud.google.com/apis/credentials), создав OAuth
     Client ID типа "Web application".
   - В Google Console в **Authorized redirect URIs** укажи Callback URL, который Supabase
     показывает на той же странице (Authentication → Providers → Google) — выглядит как
     `https://ТВОЙ-ПРОЕКТ.supabase.co/auth/v1/callback`.
4. В **Authentication → URL Configuration** добавь адрес твоего сайта на Vercel в
   **Redirect URLs** (например `https://твой-сайт.vercel.app/**`), иначе после входа через
   Google Supabase откажется возвращать пользователя обратно на сайт.
5. Скопируй из **Project Settings → API**:
   - `Project URL` → это `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → это `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (секретный!) → это `SUPABASE_SERVICE_ROLE_KEY`

## Шаг 2 — переменные окружения в Vercel

В Vercel: **Project → Settings → Environment Variables**, добавь:

| Переменная | Значение |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL проекта Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public ключ Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | service role ключ Supabase (секретный) |
| `ADMIN_PASSWORD` | пароль для входа в `/admin-login`, придумай свой |
| `ADMIN_SESSION_SECRET` | (необязательно) случайная строка для подписи admin-сессии |
| `TELEGRAM_BOT_TOKEN` | (необязательно) токен Telegram-бота для уведомлений о заявках |
| `TELEGRAM_CHAT_ID` | (необязательно) chat id, куда слать уведомления |

Полный список с комментариями — в файле `.env.local.example`.

После добавления переменных сделай **Redeploy** проекта в Vercel (переменные применяются
только к новым сборкам).

## Шаг 3 — локальный запуск (если нужно)

```bash
npm install
cp .env.local.example .env.local
# вписать реальные значения в .env.local
npm run dev
```

## Как работает разделение ролей

- **Обычные пользователи** входят через Google. После входа у них появляется личный кабинет
  (`/dashboard`), откуда можно подать заявку на марафон (`/runner-register`).
- **Админ** — это не Google-аккаунт, а отдельный вход по паролю на `/admin-login`. После
  входа открывается `/admin`, где можно вносить результаты участников и проверять
  Telegram-уведомления. Пароль задаётся в `ADMIN_PASSWORD`, поменять его — значит просто
  поменять переменную окружения в Vercel и сделать redeploy.

## Структура проекта

```
src/
  app/
    page.tsx                 — главная страница
    login/                   — вход через Google
    dashboard/                — личный кабинет пользователя
    runner-register/          — форма заявки на марафон
    participants/             — список участников
    results/                  — таблица результатов
    route/                    — маршрут марафона
    admin-login/               — вход администратора (по паролю)
    admin/                     — панель администратора
    admin/telegram/             — настройка и тест Telegram-бота
    api/                       — серверные обработчики форм
    auth/callback/              — обработка возврата от Google OAuth
  lib/
    supabase-server.ts         — Supabase клиент для серверных компонентов
    supabase-browser.ts        — Supabase клиент для браузера (кнопка Google)
    supabase-admin.ts          — Supabase клиент с service role (запись в БД)
    admin-auth.ts              — проверка пароля админа и подпись cookie
    telegram.ts                 — отправка сообщений в Telegram
    session.ts                  — получение текущего пользователя и admin-статуса
supabase-schema.sql            — SQL для создания таблиц в Supabase
```
