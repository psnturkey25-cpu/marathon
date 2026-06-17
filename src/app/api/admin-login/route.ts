import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkAdminPassword, createAdminCookieValue, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");

  if (!checkAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin-login?error=1", request.url));
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createAdminCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 часов
  });

  return NextResponse.redirect(new URL("/admin", request.url));
}
