import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Серверный клиент Supabase. Читает/пишет сессию пользователя через cookies.
// Используется в Server Components, Server Actions и Route Handlers.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll вызывается из Server Component — там нельзя менять cookies.
            // Это безопасно игнорировать, если есть middleware, который обновляет сессию.
          }
        },
      },
    }
  );
}
