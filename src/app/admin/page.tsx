import { redirect } from "next/navigation";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { getSession } from "@/lib/session";
import { createServiceClient } from "@/lib/supabase-admin";

export default async function AdminPage() {
  const { userEmail, isAdmin } = await getSession();
  if (!isAdmin) redirect("/admin-login");

  const supabase = createServiceClient();
  const { data } = await supabase
    .from("participants")
    .select("id, first_name, last_name, distance")
    .order("id", { ascending: false });

  const participants = data ?? [];

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Панель администратора</h1>
        <div className="admin-grid">
          <div className="card">
            <h2>Добавить результат</h2>
            <form method="post" action="/api/admin/result" className="form">
              <label>
                Участник
                <select name="participantId" required>
                  {participants.map((p) => (
                    <option key={p.id} value={p.id}>
                      #{p.id} {p.first_name} {p.last_name} — {p.distance}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Время финиша
                <input name="finishTime" placeholder="02:15:30" required />
              </label>
              <label>
                Место
                <input name="place" type="number" min={1} required />
              </label>
              <button className="btn danger" type="submit">
                Сохранить
              </button>
            </form>
          </div>
          <div className="card">
            <h2>Данные для входа</h2>
            <p className="muted">
              Пароль администратора задаётся переменной окружения <code>ADMIN_PASSWORD</code> в
              Vercel.
            </p>
            <p>
              <Link className="btn" href="/admin/telegram">
                Настройка Telegram
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
