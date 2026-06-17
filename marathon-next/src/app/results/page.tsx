import { Header } from "@/app/components/Header";
import { getSession } from "@/lib/session";
import { createServiceClient } from "@/lib/supabase-admin";

type ResultsRow = {
  id: number;
  first_name: string;
  last_name: string;
  distance: string;
  results: { finish_time: string; place: number } | { finish_time: string; place: number }[] | null;
};

export default async function ResultsPage() {
  const { userEmail, isAdmin } = await getSession();
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("participants")
    .select("id, first_name, last_name, distance, results(finish_time, place)")
    .order("distance", { ascending: true });

  const rows = (data ?? []) as unknown as ResultsRow[];

  function getResult(row: ResultsRow) {
    const r = Array.isArray(row.results) ? row.results[0] : row.results;
    return { finishTime: r?.finish_time ?? "-", place: r?.place ?? "-" };
  }

  return (
    <>
      <Header userEmail={userEmail} isAdmin={isAdmin} />
      <main className="container">
        <h1>Результаты</h1>
        <div className="table-wrap">
          <table>
            <tr>
              <th>ID</th>
              <th>ФИО</th>
              <th>Дистанция</th>
              <th>Время</th>
              <th>Место</th>
            </tr>
            {rows.map((row) => {
              const { finishTime, place } = getResult(row);
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    {row.first_name} {row.last_name}
                  </td>
                  <td>{row.distance}</td>
                  <td>{finishTime}</td>
                  <td>{place}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </main>
    </>
  );
}
