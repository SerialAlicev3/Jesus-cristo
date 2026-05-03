import { AdminReelsWorkbench } from "../../components/admin-workbenches";

export default function AdminReelsPage() {
  return (
    <>
      <section className="admin-page-heading">
        <div className="eyebrow">Instagram</div>
        <h1>Reels</h1>
        <p>Cria drafts, aprova, agenda e publica apenas conteúdo original ou autorizado.</p>
      </section>
      <AdminReelsWorkbench />
    </>
  );
}
