import { AdminInstagramWorkbench } from "../../components/admin-workbenches";

export default function AdminInstagramPage() {
  return (
    <>
      <section className="admin-page-heading">
        <div className="eyebrow">Graph API</div>
        <h1>Instagram</h1>
        <p>Prepara posts, agenda publicacoes e consulta estado. Publicacao imediata pede confirmacao no browser.</p>
      </section>
      <AdminInstagramWorkbench />
    </>
  );
}
