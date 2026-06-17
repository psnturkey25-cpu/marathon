import { redirect } from "next/navigation";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const { userEmail, isAdmin } = await getSession();
  if (!userEmail) redirect("/login");

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Личный кабинет</h1>
        <div className="profile card">
          <h2>Привет!</h2>
          <p>Email: {userEmail}</p>
        </div>
        <div className="grid two">
          <Link className="tile" href="/runner-register">
            <b>Заявка на марафон</b>
            <span>Заполнить данные участника</span>
          </Link>
          <Link className="tile" href="/participants">
            <b>Участники</b>
            <span>Посмотреть список</span>
          </Link>
          <Link className="tile" href="/route">
            <b>Маршрут</b>
            <span>Карта и точки города</span>
          </Link>
          <Link className="tile" href="/results">
            <b>Результаты</b>
            <span>Таблица результатов</span>
          </Link>
        </div>
      </main>
    </>
  );
}
