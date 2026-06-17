import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  const form = await request.formData();
  const text = String(form.get("text") ?? "");
  const ok = await sendTelegramMessage(text);

  const url = new URL("/admin/telegram", request.url);
  url.searchParams.set("sent", ok ? "1" : "0");
  return NextResponse.redirect(url);
}
