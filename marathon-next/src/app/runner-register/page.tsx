import { redirect } from "next/navigation";
import { Header } from "@/app/components/Header";
import { getSession } from "@/lib/session";

export default async function RunnerRegisterPage() {
  const { userEmail, isAdmin } = await getSession();
  if (!userEmail) redirect("/login");

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Заявка участника</h1>
        <form method="post" action="/api/runner-register" className="form card">
          <label>
            Имя
            <input name="firstName" required maxLength={50} />
          </label>
          <label>
            Фамилия
            <input name="lastName" required maxLength={50} />
          </label>
          <label>
            Email
            <input name="email" type="email" required maxLength={100} defaultValue={userEmail} />
          </label>
          <label>
            Город/страна
            <input name="country" required maxLength={50} defaultValue="Kazakhstan" />
          </label>
          <label>
            Пол
            <select name="gender">
              <option>Мужской</option>
              <option>Женский</option>
            </select>
          </label>
          <label>
            Дата рождения
            <input name="birthDate" type="date" required />
          </label>
          <label>
            Дистанция
            <select name="distance">
              <option>5 км</option>
              <option>10 км</option>
              <option>21 км</option>
              <option>42 км</option>
            </select>
          </label>
          <button className="btn" type="submit">
            Подать заявку
          </button>
        </form>
      </main>
    </>
  );
}
