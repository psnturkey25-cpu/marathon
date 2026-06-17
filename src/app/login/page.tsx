import { redirect } from "next/navigation";
import { Header } from "@/app/components/Header";
import { GoogleLoginButton } from "@/app/components/GoogleLoginButton";
import { getSession } from "@/lib/session";

export default async function LoginPage() {
  const { userEmail, isAdmin } = await getSession();
  if (userEmail) redirect("/dashboard");

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Вход пользователя</h1>
        <div className="form card">
          <p className="field-hint">
            Вход выполняется через аккаунт Google — отдельный логин/пароль не нужен.
          </p>
          <GoogleLoginButton />
        </div>
      </main>
    </>
  );
}
