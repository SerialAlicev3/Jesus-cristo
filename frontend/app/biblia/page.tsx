import { BibleReader } from "../components/bible-reader";
import { T } from "../components/language";

export default function BiblePage() {
  return (
    <>
      <section className="page-title">
        <div className="eyebrow">
          <T pt="Leitura biblica" en="Bible reading" />
        </div>
        <h1>
          <T pt="Biblia" en="Bible" />
        </h1>
        <p>
          <T
            pt="Acede a Biblia em portugues, cria planos de leitura e acompanha passagens que ajudam a aprofundar o conhecimento de Jesus."
            en="Access the Bible, create reading plans and follow passages that help deepen the knowledge of Jesus."
          />
        </p>
        <div className="actions">
          <a className="button" href="#ler-no-site">
            <T pt="Ler no site" en="Read on site" />
          </a>
          <a className="button" href="https://www.bible.com/pt/app" target="_blank" rel="noreferrer">
            <T pt="Abrir Bible App" en="Open Bible App" />
          </a>
          <a className="button secondary" href="/mensagem-do-dia">
            <T pt="Ver mensagem do dia" en="See daily message" />
          </a>
        </div>
      </section>

      <section className="section">
        <div className="grid">
          <article className="card">
            <h3>
              <T pt="Planos de leitura" en="Reading plans" />
            </h3>
            <p>
              <T
                pt="Usa a app para organizar leituras diarias e criar uma rotina de estudo."
                en="Use the app to organize daily readings and build a study rhythm."
              />
            </p>
          </article>
          <article className="card">
            <h3>
              <T pt="Versiculos" en="Verses" />
            </h3>
            <p>
              <T
                pt="Consulta passagens para acompanhar reflexoes, parabolas e mensagens."
                en="Read passages alongside reflections, parables and messages."
              />
            </p>
          </article>
          <article className="card">
            <h3>
              <T pt="Conhecimento de Jesus" en="Knowledge of Jesus" />
            </h3>
            <p>
              <T
                pt="Liga cada tema da plataforma a textos biblicos para estudar com mais profundidade."
                en="Connect each platform theme to biblical texts for deeper study."
              />
            </p>
          </article>
        </div>
      </section>

      <BibleReader />
    </>
  );
}
