import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-admin";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  const form = await request.formData();
  const firstName = String(form.get("firstName") ?? "");
  const lastName = String(form.get("lastName") ?? "");
  const email = String(form.get("email") ?? "");
  const country = String(form.get("country") ?? "");
  const gender = String(form.get("gender") ?? "");
  const birthDate = String(form.get("birthDate") ?? "");
  const distance = String(form.get("distance") ?? "");

  const supabase = createServiceClient();
  const { error } = await supabase.from("participants").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    country,
    gender,
    birth_date: birthDate,
    distance,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const message =
    `🏃 Новый участник Marathon Skills\n` +
    `Имя: ${firstName} ${lastName}\n` +
    `Email: ${email}\n` +
    `Город/страна: ${country}\n` +
    `Дистанция: ${distance}`;
  await sendTelegramMessage(message);

  return NextResponse.redirect(new URL("/participants", request.url));
}
