import { Header } from "@/app/components/Header";
import { getSession } from "@/lib/session";
import { createServiceClient } from "@/lib/supabase-admin";
import type { Participant } from "@/lib/types";

export default async function ParticipantsPage() {
  const { userEmail, isAdmin } = await getSession();
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("participants")
    .select("id, first_name, last_name, email, country, gender, birth_date, distance")
    .order("id", { ascending: false });

  const participants = (data ?? []) as Participant[];

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Список участников</h1>
        <div className="table-wrap">
          <table>
            <tr>
              <th>ID</th>
              <th>ФИО</th>
              <th>Email</th>
              <th>Страна</th>
              <th>Пол</th>
              <th>Дата рождения</th>
              <th>Дистанция</th>
            </tr>
            {participants.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.first_name} {p.last_name}
                </td>
                <td>{p.email}</td>
                <td>{p.country}</td>
                <td>{p.gender}</td>
                <td>{p.birth_date}</td>
                <td>
                  <span className="pill">{p.distance}</span>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </main>
    </>
  );
}
