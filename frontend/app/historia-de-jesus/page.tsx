import Link from "next/link";
import { T } from "../components/language";

const timeline = [
  {
    title: "Nascimento",
    titleEn: "Birth",
    reference: "Lucas 2:1-20",
    text: "Jesus nasce em Belem, numa realidade simples, longe do poder e perto das pessoas comuns.",
    textEn: "Jesus is born in Bethlehem, in a simple setting, far from power and close to ordinary people."
  },
  {
    title: "Batismo e chamado",
    titleEn: "Baptism and calling",
    reference: "Mateus 3:13-17",
    text: "No batismo, Jesus inicia publicamente a sua missao e aponta para uma vida guiada por Deus.",
    textEn: "At his baptism, Jesus publicly begins his mission and points to a life guided by God."
  },
  {
    title: "Ensino do Reino",
    titleEn: "Teaching the Kingdom",
    reference: "Mateus 5-7",
    text: "Ele ensina sobre humildade, misericordia, perdao, verdade, justica e amor ao proximo.",
    textEn: "He teaches about humility, mercy, forgiveness, truth, justice and love for our neighbor."
  },
  {
    title: "Encontros que transformam",
    titleEn: "Encounters that transform",
    reference: "Joao 4:1-30",
    text: "Jesus escuta, acolhe, cura e devolve dignidade a quem era esquecido ou rejeitado.",
    textEn: "Jesus listens, welcomes, heals and restores dignity to those who were forgotten or rejected."
  },
  {
    title: "Cruz",
    titleEn: "Cross",
    reference: "Lucas 23:26-49",
    text: "Na cruz vemos amor entregue ate ao fim, perdao diante da dor e fidelidade a verdade.",
    textEn: "On the cross we see love given to the end, forgiveness in suffering and faithfulness to truth."
  },
  {
    title: "Ressurreicao",
    titleEn: "Resurrection",
    reference: "Lucas 24:1-12",
    text: "A ressurreicao anuncia que a vida, a esperanca e a reconciliacao nao terminam na morte.",
    textEn: "The resurrection announces that life, hope and reconciliation do not end in death."
  }
];

const youtubePlaylistEmbedUrl = "https://www.youtube.com/embed/videoseries?list=PLAD3672E70ED98EB2";

const youtubeVideos = [
  ["jhR_3ztwB_E", "Introdução: O Plano do Nosso Pai Celestial"],
  ["HepjRp6NfJk", "Capítulo 1: Isabel e Zacarias"],
  ["a6OYjMO1_vk", "Capítulo 2: Maria e o Anjo"],
  ["ipc5QQ927CQ", "Capítulo 3: O Nascimento de João Batista"],
  ["3NLxsELtyUU", "Capítulo 4: José e o Anjo"],
  ["UzGm73l8gWQ", "Capítulo 5: O Nascimento de Jesus Cristo"],
  ["zr5Od8OWnBg", "Capítulo 6: A Apresentação no Templo"],
  ["PBR2fBoRl0Q", "Capítulo 7: Os Reis Magos"],
  ["gY324INt_00", "Capítulo 8: O Iníquo Rei Herodes"],
  ["p8RZQWDH6-s", "Capítulo 9: O Menino Jesus"],
  ["CBurCs0oItI", "Capítulo 10: O Batismo de Jesus"],
  ["0yHk4YgfUhM", "Capítulo 11: Jesus É Tentado"],
  ["rzqj4jgkZgg", "Capítulo 12: As Bodas de Caná"],
  ["SHAoIXZlFoA", "Capítulo 13: Jesus e a Casa do Pai Celestial"],
  ["XOjcy5YK_Qc", "Capítulo 14: Nicodemos"]
];

export default function JesusStoryPage() {
  return (
    <>
      <section className="page-title story-title">
        <div className="eyebrow">
          <T pt="Espalhar conhecimento" en="Sharing knowledge" />
        </div>
        <h1>
          <T pt="Historia de Jesus" en="The story of Jesus" />
        </h1>
        <p>
          <T
            pt="Uma leitura simples da vida de Jesus: nascimento, caminho, palavras, encontros, cruz e ressurreicao."
            en="A simple reading of the life of Jesus: birth, journey, words, encounters, cross and resurrection."
          />
        </p>
        <div className="actions">
          <Link className="button" href="/biblia">
            <T pt="Ler na Biblia" en="Read in the Bible" />
          </Link>
          <Link className="button light" href="/historia-de-jesus-para-criancas">
            <T pt="Versao para criancas" en="Children's version" />
          </Link>
        </div>
      </section>

      <section className="section story-intro">
        <div>
          <h2>
            <T pt="Quem e Jesus?" en="Who is Jesus?" />
          </h2>
        </div>
        <div className="story-copy">
          <p>
            <T
              pt="Jesus de Nazare viveu entre pessoas comuns, ensinou com palavras claras e mostrou com a propria vida que o amor de Deus se aproxima dos feridos, dos pobres, dos cansados e de todos os que procuram verdade."
              en="Jesus of Nazareth lived among ordinary people, taught with clear words and showed through his own life that God's love draws near to the wounded, the poor, the tired and all who seek truth."
            />
          </p>
          <p>
            <T
              pt="A sua mensagem chama-nos a conhecer Deus com o coracao inteiro, a amar o proximo, a perdoar, a praticar misericordia e a viver com humildade. O centro da historia e simples: Jesus revela um caminho de vida, luz e reconciliacao."
              en="His message calls us to know God with the whole heart, love our neighbor, forgive, practice mercy and live with humility. The center of the story is simple: Jesus reveals a path of life, light and reconciliation."
            />
          </p>
        </div>
      </section>

      <section className="section gospel-source">
        <div className="source-panel">
          <div>
            <div className="eyebrow">
              <T pt="Fonte mais completa e original" en="Most complete and original source" />
            </div>
            <h2>
              <T pt="Os Evangelhos" en="The Gospels" />
            </h2>
            <p>
              <T
                pt="Para conhecer Jesus com profundidade, comeca pelos Evangelhos: Mateus, Marcos, Lucas e Joao. Sao as fontes centrais sobre a sua vida, palavras, milagres, morte e ressurreicao."
                en="To know Jesus deeply, start with the Gospels: Matthew, Mark, Luke and John. They are the central sources about his life, words, miracles, death and resurrection."
              />
            </p>
            <Link className="button" href="/biblia">
              <T pt="Abrir a Biblia" en="Open the Bible" />
            </Link>
          </div>
          <div className="gospel-list">
            {[
              ["Mateus", "Matthew"],
              ["Marcos", "Mark"],
              ["Lucas", "Luke"],
              ["Joao", "John"]
            ].map(([pt, en]) => (
              <div className="gospel-item" key={pt}>
                <span>Evangelho</span>
                <strong>
                  <T pt={pt} en={en} />
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section new-testament-section">
        <div className="new-testament-header">
          <div className="eyebrow">
            <T pt="Novo Testamento" en="New Testament" />
          </div>
          <h2>NOVO TESTAMENTO</h2>
          <p>
            <T
              pt="O Novo Testamento apresenta Jesus Cristo, os seus ensinamentos, a sua morte e ressurreicao, e mostra como a sua mensagem se espalhou pelo mundo."
              en="The New Testament presents Jesus Christ, his teachings, his death and resurrection, and shows how his message spread through the world."
            />
          </p>
        </div>
        <div className="grid">
          <article className="card">
            <h3>
              <T pt="Evangelhos" en="Gospels" />
            </h3>
            <p>
              <T
                pt="Mateus, Marcos, Lucas e Joao contam a vida, palavras, milagres, morte e ressurreicao de Jesus."
                en="Matthew, Mark, Luke and John tell the life, words, miracles, death and resurrection of Jesus."
              />
            </p>
          </article>
          <article className="card">
            <h3>
              <T pt="Atos dos Apostolos" en="Acts of the Apostles" />
            </h3>
            <p>
              <T
                pt="Mostra os primeiros seguidores de Jesus a espalhar a mensagem com coragem, fe e comunidade."
                en="It shows the first followers of Jesus spreading the message with courage, faith and community."
              />
            </p>
          </article>
          <article className="card">
            <h3>
              <T pt="Cartas e Apocalipse" en="Letters and Revelation" />
            </h3>
            <p>
              <T
                pt="As cartas orientam a vida diaria em Cristo; Apocalipse fala de esperanca, perseveranca e vitoria final de Deus."
                en="The letters guide daily life in Christ; Revelation speaks of hope, perseverance and God's final victory."
              />
            </p>
          </article>
        </div>
      </section>

      <section className="section youtube-playlist-section">
        <div className="playlist-heading">
          <div>
            <div className="eyebrow">YouTube</div>
            <h2>
              <T pt="Histórias do Novo Testamento" en="New Testament Stories" />
            </h2>
            <p>
              <T
                pt="Playlist em video para acompanhar a historia de Jesus e os primeiros capitulos do Novo Testamento."
                en="A video playlist to follow the story of Jesus and the first chapters of the New Testament."
              />
            </p>
          </div>
          <Link className="button light" href="/novo-testamento-youtube">
            <T pt="Abrir playlist completa" en="Open full playlist" />
          </Link>
        </div>
        <div className="playlist-embed">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src={youtubePlaylistEmbedUrl}
            title="Histórias do Novo Testamento"
          />
        </div>
        <div className="video-grid">
          {youtubeVideos.map(([id, title]) => (
            <Link
              className="video-card"
              href={`/youtube/watch?v=${id}&list=PLAD3672E70ED98EB2`}
              key={id}
            >
              <img alt={title} loading="lazy" src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} />
              <span>{title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section band">
        <div className="story-timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.reference}>
              <div className="timeline-marker" />
              <div>
                <span>{item.reference}</span>
                <h3>
                  <T pt={item.title} en={item.titleEn} />
                </h3>
                <p>
                  <T pt={item.text} en={item.textEn} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid">
          <article className="card">
            <h3>
              <T pt="O que Jesus ensinou" en="What Jesus taught" />
            </h3>
            <p>
              <T
                pt="Amar a Deus, amar o proximo, perdoar, procurar a verdade, servir com humildade e construir paz no dia a dia."
                en="Love God, love our neighbor, forgive, seek truth, serve with humility and build peace in daily life."
              />
            </p>
          </article>
          <article className="card">
            <h3>
              <T pt="Como Jesus vivia" en="How Jesus lived" />
            </h3>
            <p>
              <T
                pt="Com coragem, simplicidade e compaixao. Ele aproximava-se das pessoas e transformava conhecimento em vida pratica."
                en="With courage, simplicity and compassion. He came close to people and turned knowledge into practical life."
              />
            </p>
          </article>
          <article className="card">
            <h3>
              <T pt="Porque continua importante" en="Why it still matters" />
            </h3>
            <p>
              <T
                pt="Porque a sua mensagem continua a abrir caminho para amor, sabedoria, perdao, esperanca e uma vida com sentido."
                en="Because his message continues to open a way toward love, wisdom, forgiveness, hope and a meaningful life."
              />
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
