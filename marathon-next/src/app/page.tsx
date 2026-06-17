import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Countdown } from "@/app/components/Countdown";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const { userEmail, isAdmin } = await getSession();

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <section className="hero new-hero">
          <div className="hero-text">
            <span className="badge">Astana City Marathon 2026</span>
            <h1>Городской марафон</h1>
            <p>
              Регистрация участников, личный кабинет, список бегунов, результаты и маршрут по
              городу — всё в одном сайте.
            </p>
            <div className="actions">
              <Link className="btn" href="/login">
                Вход пользователя
              </Link>
              <Link className="btn secondary" href="/register-account">
                Создать аккаунт
              </Link>
              <Link className="btn outline" href="/route">
                Маршрут города
              </Link>
            </div>
          </div>
          <div className="glass timer">
            <div className="label">До старта марафона</div>
            <Countdown />
            <p>Старт: 1 октября 2026, 09:00</p>
          </div>
        </section>

        <section className="stats">
          <div>
            <b>42 км</b>
            <span>полный марафон</span>
          </div>
          <div>
            <b>21 км</b>
            <span>полумарафон</span>
          </div>
          <div>
            <b>10 км</b>
            <span>городской забег</span>
          </div>
          <div>
            <b>5 км</b>
            <span>для новичков</span>
          </div>
        </section>

        <section className="grid">
          <Link className="tile" href="/login">
            <b>Личный кабинет</b>
            <span>Вход пользователей отдельно от админа</span>
          </Link>
          <Link className="tile" href="/participants">
            <b>Список участников</b>
            <span>Все зарегистрированные бегуны</span>
          </Link>
          <Link className="tile" href="/results">
            <b>Результаты</b>
            <span>Время финиша и места</span>
          </Link>
          <Link className="tile" href="/route">
            <b>Маршрут города</b>
            <span>Старт, пункты воды, финиш</span>
          </Link>
        </section>
      </main>
      <footer>© 2026 Marathon Skills · Next.js + Supabase</footer>
    </>
  );
}
