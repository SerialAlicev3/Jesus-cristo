import { AdminInstagramWorkbench } from "../../components/admin-workbenches";

export default function AdminInstagramPage() {
  return (
    <>
      <section className="admin-page-heading">
        <div className="eyebrow">Graph API</div>
        <h1>Instagram</h1>
        <p>Prepara posts, agenda publicações e consulta estado. Publicação imediata pede confirmação no browser.</p>
      </section>
      <AdminInstagramWorkbench />
    </>
  );
}
