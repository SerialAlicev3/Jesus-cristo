import { AdminAiWorkbench } from "../../components/admin-ai-workbench";
import { T } from "../../components/language";

export default function AdminAiPage() {
  return (
    <>
      <section className="admin-page-heading">
        <div className="eyebrow">
          <T pt="Painel funcional" en="Functional panel" />
        </div>
        <h1>
          <T pt="Agentes Claude" en="Claude Agents" />
        </h1>
        <p>
          <T
            pt="Gera mensagens, roteiros, revisões e planos semanais. A IA cria drafts; a publicação continua sempre dependente de aprovação humana."
            en="Generate messages, scripts, reviews and weekly plans. AI creates drafts; publishing always depends on human approval."
          />
        </p>
      </section>
      <AdminAiWorkbench />
    </>
  );
}
