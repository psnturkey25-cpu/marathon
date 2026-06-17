import { createHmac } from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "marathon_admin";

function getSecret() {
  // ADMIN_PASSWORD используется и как пароль входа, и как часть секрета подписи —
  // так что отдельный секрет можно не заводить, но лучше задать ADMIN_SESSION_SECRET в Vercel.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "fallback-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

// Проверка введённого пароля против ADMIN_PASSWORD из переменных окружения Vercel.
export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

// Создаёт значение cookie вида "ok.<подпись>" — подделать без секрета невозможно.
export function createAdminCookieValue(): string {
  const payload = "ok";
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminCookieValue(value: string | undefined): boolean {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  return sign(payload) === signature;
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  return isValidAdminCookieValue(value);
}

export const ADMIN_COOKIE_NAME = ADMIN_COOKIE;
