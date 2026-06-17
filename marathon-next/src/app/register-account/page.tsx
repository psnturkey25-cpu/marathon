import Link from "next/link";
import { Header } from "@/app/components/Header";
import { GoogleLoginButton } from "@/app/components/GoogleLoginButton";
import { getSession } from "@/lib/session";

// В Next.js версии отдельной регистрации email/пароль нет — аккаунт создаётся
// автоматически при первом входе через Google. Страница оставлена для совместимости
// со старыми ссылками и ведёт к тому же действию.
export default async function RegisterAccountPage() {
  const { userEmail, isAdmin } = await getSession();

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Создать аккаунт</h1>
        <div className="form card">
          <p className="field-hint">
            Отдельная регистрация не нужна — войдите через Google, и аккаунт создастся
            автоматически.
          </p>
          <GoogleLoginButton />
          <p className="muted">
            Уже входили? <Link href="/dashboard">Перейти в кабинет</Link>
          </p>
        </div>
      </main>
    </>
  );
}
