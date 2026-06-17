import { createBrowserClient } from "@supabase/ssr";

// Клиентский (браузерный) Supabase клиент — используется в Client Components,
// например на кнопке "Войти через Google".
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
