import Link from "next/link";
import { getDailyMessage } from "../../lib/api";
import { T } from "../components/language";

export default async function DailyMessagePage() {
  const message = await getDailyMessage();
  const reference = message?.bible_reference ?? "Lucas 6:36";

  return (
    <>
      <section className="daily-hero">
        <div className="daily-hero-content">
          <div className="eyebrow">
            <T pt="Reflexao diaria" en="Daily reflection" />
          </div>
          <h1>
            <T pt="Mensagem do dia" en="Daily message" />
          </h1>
          <p>
            <T
              pt="Um momento para respirar, ouvir, alinhar o coracao e levar a palavra de Jesus para dentro do teu dia."
              en="A moment to breathe, listen, align the heart and carry the word of Jesus into your day."
            />
          </p>
          <div className="daily-hero-actions">
            <Link className="button" href="/biblia">
              <T pt="Ler a Biblia" en="Read the Bible" />
            </Link>
            <Link className="button secondary" href="/historia-de-jesus">
              <T pt="Conhecer Jesus" en="Know Jesus" />
            </Link>
          </div>
        </div>
      </section>

      <section className="daily-message-section">
        <article className="daily-message-card">
          <div className="daily-card-top">
            <span>
              <T pt="Hoje" en="Today" />
            </span>
            <strong>{reference}</strong>
          </div>

          <div className="daily-message-main">
            <h2>
              <T pt={message?.title ?? "Amor que recomeca"} en={message?.title_en ?? "Love that begins again"} />
            </h2>
            <p>
              <T
                pt={message?.content ?? "Em Jesus encontramos coragem para recomecar com humildade, perdoar com verdade e amar com gestos concretos."}
                en={message?.content_en ?? "In Jesus we find courage to begin again with humility, forgive with truth and love through concrete acts."}
              />
            </p>
          </div>

          <div className="daily-prayer">
            <span>
              <T pt="Oracao curta" en="Short prayer" />
            </span>
            <T
              pt="Jesus, guia os meus passos hoje. Da-me humildade para aprender, coragem para agir e amor para escolher o bem."
              en="Jesus, guide my steps today. Give me humility to learn, courage to act and love to choose what is good."
            />
          </div>
        </article>

        <aside className="daily-side-panel">
          <div>
            <span className="daily-number">01</span>
            <h3>
              <T pt="Leva isto contigo" en="Carry this with you" />
            </h3>
            <p>
              <T
                pt="Escolhe uma atitude concreta hoje: perdoar, agradecer, ajudar alguem ou recomecar com mais fe."
                en="Choose one concrete attitude today: forgive, give thanks, help someone or begin again with more faith."
              />
            </p>
          </div>
          <Link className="button light" href="/parabolas">
            <T pt="Ver ensinamentos" en="See teachings" />
          </Link>
        </aside>
      </section>
    </>
  );
}
