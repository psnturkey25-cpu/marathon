import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Клиент с SERVICE ROLE ключом — обходит Row Level Security.
// Использовать ТОЛЬКО на сервере (Route Handlers, Server Actions), никогда в браузере.
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}
