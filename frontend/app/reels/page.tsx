import { T } from "../components/language";

export default function ReelsPage() {
  return (
    <>
      <section className="page-title">
        <div className="eyebrow">
          <T pt="Videos curtos" en="Short videos" />
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
              <T pt="Videos produzidos pela plataforma, prontos para aprovacao e publicacao." en="Videos produced by the platform, ready for approval and publishing." />
            </p>
          </article>
          <article className="card">
            <h3>
              <T pt="Autorizados" en="Authorized" />
            </h3>
            <p>
              <T pt="Conteudo de artistas com permissao explicita antes de qualquer publicacao." en="Creator content with explicit permission before any publication." />
            </p>
          </article>
          <article className="card">
            <h3>Embeds</h3>
            <p>
              <T pt="Conteudo apenas incorporado, sem republicacao no Instagram." en="Embedded-only content, not republished on Instagram." />
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
