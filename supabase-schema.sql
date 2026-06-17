-- ════════════════════════════════════════════════════════════
-- Marathon Skills 2026 — схема базы данных для Supabase
-- Выполни этот файл целиком в Supabase Dashboard → SQL Editor → New query
-- ════════════════════════════════════════════════════════════

-- Участники марафона (заявки с формы /runner-register)
create table if not exists participants (
  id bigint generated always as identity primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  country text not null,
  gender text not null,
  birth_date date not null,
  distance text not null,
  created_at timestamptz not null default now()
);

-- Результаты забега (вводятся админом)
create table if not exists results (
  id bigint generated always as identity primary key,
  participant_id bigint not null unique references participants(id) on delete cascade,
  finish_time text not null,
  place integer not null
);

-- ── Row Level Security ──────────────────────────────────────
-- Включаем RLS и разрешаем публичное чтение списков (как в исходном сайте,
-- где /participants и /results были видны всем без логина).
-- Запись разрешаем только через сервер (service role ключ обходит RLS),
-- поэтому отдельных insert/update policy для anon не делаем.

alter table participants enable row level security;
alter table results enable row level security;

create policy "participants are publicly readable"
  on participants for select
  using (true);

create policy "results are publicly readable"
  on results for select
  using (true);

-- Заявки и результаты добавляются только через серверный API route
-- (там используется SUPABASE_SERVICE_ROLE_KEY, который игнорирует RLS).
-- Поэтому insert/update policy для анонимных пользователей не нужны.
