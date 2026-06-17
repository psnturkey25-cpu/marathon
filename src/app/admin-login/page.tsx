import { redirect } from "next/navigation";
import { Header } from "@/app/components/Header";
import { getSession } from "@/lib/session";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { userEmail, isAdmin } = await getSession();
  if (isAdmin) redirect("/admin");
  const { error } = await searchParams;

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Вход администратора</h1>
        {error && <div className="alert">Неверный пароль администратора.</div>}
        <form method="post" action="/api/admin-login" className="form card">
          <label>
            Пароль
            <input name="password" type="password" required />
          </label>
          <button className="btn danger" type="submit">
            Войти как админ
          </button>
        </form>
        <p className="muted">
          Админка скрыта с главной страницы. Адрес входа: <code>/admin-login</code>
        </p>
      </main>
    </>
  );
}
