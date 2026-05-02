import { AdminDashboardWorkbench } from "../../components/admin-workbenches";

export default function AdminDashboardPage() {
  return (
    <>
      <section className="admin-page-heading">
        <div className="eyebrow">Admin</div>
        <h1>Dashboard</h1>
        <p>Resumo do fluxo editorial: criar, aprovar, agendar e publicar com seguranca.</p>
      </section>
      <AdminDashboardWorkbench />
    </>
  );
}
