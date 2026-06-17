import { createClient } from "@/lib/supabase-server";
import { isAdminLoggedIn } from "@/lib/admin-auth";

export async function getSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userEmail = data.user?.email ?? null;
  const isAdmin = await isAdminLoggedIn();
  return { userEmail, isAdmin };
}
