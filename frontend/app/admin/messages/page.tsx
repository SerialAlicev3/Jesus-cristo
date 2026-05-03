import { AdminMessagesWorkbench } from "../../components/admin-workbenches";
import { T } from "../../components/language";

export default function AdminMessagesPage() {
  return (
    <>
      <section className="admin-page-heading">
        <div className="eyebrow">
          <T pt="Conteúdo diário" en="Daily content" />
        </div>
        <h1>
          <T pt="Mensagens" en="Messages" />
        </h1>
      </section>
      <AdminMessagesWorkbench />
    </>
  );
}
