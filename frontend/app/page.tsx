import Link from "next/link";
import { ClawCompanionChat } from "./components/claw-companion-chat";
import { T } from "./components/language";
import { OpeningYoutubeVideo } from "./components/opening-youtube-video";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <T pt="Amor, compaixao e verdade" en="Love, compassion and truth" />
          </div>
          <h1>Jesus Cristo</h1>
          <p>
            <T
              pt="Uma plataforma para partilhar reflexoes diarias, historias, parabolas e conteudo original centrado em Jesus, criada para espalhar conhecimento, amor, sabedoria e transformacao."
              en="A platform for sharing daily reflections, stories, parables and original content centered on Jesus, created to spread knowledge, love, wisdom and transformation."
            />
          </p>
          <div className="actions">
            <Link className="button" href="/mensagem-do-dia">
              <T pt="Ler mensagem do dia" en="Read daily message" />
            </Link>
            <Link className="button secondary" href="/historia-de-jesus">
              <T pt="Conhecer a historia" en="Know the story" />
            </Link>
          </div>
        </div>
      </section>

      <section className="hero-video-section">
        <div className="hero-video-card">
          <OpeningYoutubeVideo />
          <a href="https://www.youtube.com/watch?v=p4FMVtrnmuU">
            <T pt="Ativar som no YouTube" en="Enable sound on YouTube" />
          </a>
        </div>
      </section>

      <ClawCompanionChat />
      <section className="section">
        <div className="grid feature-grid">
          <Link className="card feature-card" href="/mensagem-do-dia">
            <h3>
              <T pt="Mensagem diaria" en="Daily message" />
            </h3>
            <p>
              <T
                pt="Reflexoes curtas para orientar o dia com fe, perdao e paz."
                en="Short reflections to guide the day with faith, forgiveness and peace."
              />
            </p>
            <span>
              <T pt="Abrir mensagem" en="Open message" />
            </span>
          </Link>
          <Link className="card feature-card" href="/reels">
            <h3>
              <T pt="Reels originais" en="Original Reels" />
            </h3>
            <p>
              <T pt="Conteudo em video aprovado, autorizado e pronto para partilha." en="Approved, authorized video content ready to share." />
            </p>
            <span>
              <T pt="Ver Reels" en="See Reels" />
            </span>
          </Link>
          <Link className="card feature-card" href="/admin/ai">
            <h3>
              <T pt="Agentes Claude" en="Claude Agents" />
            </h3>
            <p>
              <T pt="Ajuda editorial para gerar drafts, rever tom e planear a semana." en="Editorial help to generate drafts, review tone and plan the week." />
            </p>
            <span>
              <T pt="Abrir agentes" en="Open agents" />
            </span>
          </Link>
          <Link className="card feature-card" href="/embaixadores">
            <h3>
              <T pt="Embaixadores aprovados" en="Approved ambassadors" />
            </h3>
            <p>
              <T
                pt="Embaixadores aprovados poderao aceder as ferramentas da plataforma e aos agentes Claude dentro da API."
                en="Approved ambassadors will be able to access the platform tools and Claude agents inside the API."
              />
            </p>
            <span>
              <T pt="Conhecer embaixadores" en="Meet ambassadors" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
