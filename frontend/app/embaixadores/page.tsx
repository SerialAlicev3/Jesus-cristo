import { T } from "../components/language";

export default function AmbassadorsPage() {
  return (
    <>
      <section className="page-title">
        <div className="eyebrow">
          <T pt="Vozes que espalham luz" en="Voices that spread light" />
        </div>
        <h1>
          <T pt="Embaixadores do nome de Jesus Cristo" en="Ambassadors of the name of Jesus Christ" />
        </h1>
        <p>
          <T
            pt="Pessoas que ajudam a espalhar conhecimento, amor, fé, coragem e uma mensagem viva centrada em Jesus."
            en="People who help spread knowledge, love, faith, courage and a living message centered on Jesus."
          />
        </p>
      </section>
      <section className="section">
        <div className="grid">
          <article className="card">
            <h2>
              <T pt="Embaixadores, criadores e testemunhos" en="Ambassadors, creators and testimonies" />
            </h2>
            <p>
              <T
                pt="Esta área destaca pessoas aprovadas pela equipa, com permissão clara para colaborações, testemunhos, música, vídeo e conteúdo autorizado."
                en="This area highlights people approved by the team, with clear permission for collaborations, testimonies, music, video and authorized content."
              />
            </p>
          </article>
          <article className="card">
            <h2>
              <T pt="O que procuramos" en="What we seek" />
            </h2>
            <p>
              <T
                pt="Vozes que transmitam amor, humildade, verdade, fé e vontade de aproximar pessoas do conhecimento de Jesus Cristo."
                en="Voices that carry love, humility, truth, faith and a desire to bring people closer to the knowledge of Jesus Christ."
              />
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
