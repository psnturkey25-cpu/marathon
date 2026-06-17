import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);

  return NextResponse.redirect(new URL("/", request.url));
}
