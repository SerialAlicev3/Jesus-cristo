import { AdminCalendarWorkbench } from "../../components/admin-workbenches";
import { T } from "../../components/language";

export default function AdminCalendarPage() {
  return (
    <>
      <section className="admin-page-heading">
        <div className="eyebrow">
          <T pt="Plano editorial" en="Editorial plan" />
        </div>
        <h1>
          <T pt="Calendário editorial" en="Editorial calendar" />
        </h1>
        <p>Usa o plano semanal dos agentes e agenda mensagens/Reels nos dias certos.</p>
      </section>
      <AdminCalendarWorkbench />
    </>
  );
}
