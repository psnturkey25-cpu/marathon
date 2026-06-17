import { Header } from "@/app/components/Header";
import { getSession } from "@/lib/session";

export default async function RoutePage() {
  const { userEmail, isAdmin } = await getSession();

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Маршрут города</h1>
        <section className="route-layout">
          <div className="map-card">
            <div className="map-line"></div>
            <div className="point p1">
              Старт
              <br />
              <small>Центральная площадь</small>
            </div>
            <div className="point p2">
              5 км
              <br />
              <small>Парк</small>
            </div>
            <div className="point p3">
              10 км
              <br />
              <small>Набережная</small>
            </div>
            <div className="point p4">
              21 км
              <br />
              <small>Стадион</small>
            </div>
            <div className="point p5">
              Финиш
              <br />
              <small>Expo</small>
            </div>
          </div>
          <div className="card">
            <h2>Точки маршрута</h2>
            <ol className="route-list">
              <li>
                <b>Старт:</b> Центральная площадь
              </li>
              <li>
                <b>Пункт воды:</b> городской парк, 5 км
              </li>
              <li>
                <b>Медпункт:</b> набережная, 10 км
              </li>
              <li>
                <b>Контроль:</b> стадион, 21 км
              </li>
              <li>
                <b>Финиш:</b> Expo центр
              </li>
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}
