import { T } from "../components/language";

export default function ReelsPage() {
  return (
    <>
      <section className="page-title">
        <div className="eyebrow">
          <T pt="Vídeos curtos" en="Short videos" />
        </div>
        <h1>
          <T pt="Reels inspiradores" en="Inspiring Reels" />
        </h1>
      </section>
      <section className="section">
        <div className="grid">
          <article className="card">
            <h3>
              <T pt="Originais" en="Original" />
            </h3>
            <p>
              <T pt="Vídeos produzidos pela plataforma, prontos para aprovação e publicação." en="Videos produced by the platform, ready for approval and publishing." />
            </p>
          </article>
          <article className="card">
            <h3>
              <T pt="Autorizados" en="Authorized" />
            </h3>
            <p>
              <T pt="Conteúdo de embaixadores com permissão explícita antes de qualquer publicação." en="Creator content with explicit permission before any publication." />
            </p>
          </article>
          <article className="card">
            <h3>Embeds</h3>
            <p>
              <T pt="Conteúdo apenas incorporado, sem republicação no Instagram." en="Embedded-only content, not republished on Instagram." />
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
