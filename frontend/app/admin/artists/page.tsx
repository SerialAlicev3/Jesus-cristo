import { AdminArtistsWorkbench } from "../../components/admin-workbenches";
import { T } from "../../components/language";

export default function AdminArtistsPage() {
  return (
    <>
      <section className="admin-page-heading">
        <div className="eyebrow">
          <T pt="Autorizacoes" en="Permissions" />
        </div>
        <h1>
          <T pt="Embaixadores" en="Ambassadors" />
        </h1>
        <p>Gere embaixadores, criadores, permissao documentada e estado aprovado/rejeitado.</p>
      </section>
      <AdminArtistsWorkbench />
    </>
  );
}
