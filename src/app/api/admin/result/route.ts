import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  const form = await request.formData();
  const participantId = Number(form.get("participantId"));
  const finishTime = String(form.get("finishTime") ?? "");
  const place = Number(form.get("place"));

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("results")
    .upsert(
      { participant_id: participantId, finish_time: finishTime, place },
      { onConflict: "participant_id" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/results", request.url));
}
