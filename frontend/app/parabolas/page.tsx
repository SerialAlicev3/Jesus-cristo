import Link from "next/link";
import { T } from "../components/language";

const parables = [
  ["O bom samaritano", "The good Samaritan", "Compaixão que atravessa fronteiras e se torna cuidado prático.", "Compassion that crosses boundaries and becomes practical care."],
  ["O filho pródigo", "The prodigal son", "Perdão que recebe de volta quem pensava não ter caminho.", "Forgiveness that welcomes back those who thought there was no way home."],
  ["A semente", "The seed", "A Palavra cresce onde encontra um coração disponível.", "The Word grows where it finds an open heart."]
];

const parablesPlaylistEmbedUrl = "https://www.youtube.com/embed/videoseries?list=PL31F32E21D67DE8AE";

const parablesVideos = [
  ["Uuur66fQ-bc", "Uma Casa Dividida"],
  ["3vS0B14g_VQ", "Jesus Cura um Cego de Nascença"],
  ["-2Lxvg16oJg", "Jesus Ensina a Respeito de Nascer de Novo"],
  ["7zlO5r5GXdE", "Jesus Declara: Eu Sou a Luz do Mundo, a Verdade Vos Libertará"],
  ["O0Tdp050eJc", "Eu sou o Pão da Vida"],
  ["R978KxaX19Q", "O Salvador Conversa com uma Mulher Samaritana"],
  ["t4GwimfWElg", "Jesus Reconhece João Batista / Vinde a Mim"],
  ["ShrIgmBBQrc", "Lázaro É Levantado dos Mortos"],
  ["hBLrSip1cd4", "O Meu Reino Não É Deste Mundo"],
  ["dV9Qey5TGkw", "Eu para Isso Nasci"],
  ["xtO6dwjNCc8", "Buscai o Reino de Deus"],
  ["iEDcvz_Rkdg", "Jesus Perdoa Pecados e Cura um Homem Acometido de Paralisia"],
  ["lj58vmJsTWc", "A Parábola do Semeador"],
  ["Wj08UfdLvfY", "O Senhor Ressuscitado Aparece aos Apóstolos"],
  ["MaRaMRTL1W4", "Cristo Aparece no Caminho de Emaús"]
];

export default function ParablesPage() {
  return (
    <>
      <section className="page-title">
        <div className="eyebrow">
          <T pt="Ensinos de Jesus" en="Teachings of Jesus" />
        </div>
        <h1>
          <T pt="Parábolas explicadas" en="Parables explained" />
        </h1>
      </section>

      <section className="section youtube-playlist-section">
        <div className="playlist-heading">
          <div>
            <div className="eyebrow">YouTube</div>
            <h2>
              <T pt="Vamos ficar íntimos... vem-me conhecer" en="Let's get close... come know me" />
            </h2>
            <p>
              <T
                pt="Uma playlist para conhecer melhor Jesus pelas suas palavras, encontros, sinais e parábolas."
                en="A playlist to know Jesus more closely through his words, encounters, signs and parables."
              />
            </p>
          </div>
          <Link className="button light" href="/parabolas-youtube">
            <T pt="Abrir playlist completa" en="Open full playlist" />
          </Link>
        </div>
        <div className="playlist-embed">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src={parablesPlaylistEmbedUrl}
            title="Vamos ficar íntimos... vem-me conhecer"
          />
        </div>
        <div className="video-grid">
          {parablesVideos.map(([id, title]) => (
            <Link
              className="video-card"
              href={`/youtube/watch?v=${id}&list=PL31F32E21D67DE8AE`}
              key={id}
            >
              <img alt={title} loading="lazy" src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} />
              <span>{title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid">
          {parables.map(([title, titleEn, body, bodyEn]) => (
            <article className="card" key={title}>
              <h3>
                <T pt={title} en={titleEn} />
              </h3>
              <p>
                <T pt={body} en={bodyEn} />
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
