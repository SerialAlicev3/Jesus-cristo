import Link from "next/link";
import { T } from "../components/language";

const chapters = [
  ["Jesus nasce em Belem", "Jesus is born in Bethlehem"],
  ["Os reis magos visitam Jesus", "The wise men visit Jesus"],
  ["Jesus visita o Templo quando era crianca", "Jesus visits the Temple as a child"],
  ["Jesus e batizado por Joao Batista", "Jesus is baptized by John the Baptist"],
  ["Jesus chama os primeiros discipulos", "Jesus calls the first disciples"],
  ["Jesus acolhe pessoas rejeitadas", "Jesus welcomes rejected people"],
  ["O primeiro milagre em Cana", "The first miracle in Cana"],
  ["Jesus fala sobre o amor de Deus", "Jesus speaks about God's love"],
  ["A agua viva e a mulher samaritana", "Living water and the Samaritan woman"],
  ["Parabolas, milagres e curas", "Parables, miracles and healings"],
  ["A ultima ceia, a cruz e a ressurreicao", "The Last Supper, the cross and the resurrection"],
  ["Jesus sobe aos ceus e promete voltar", "Jesus ascends to heaven and promises to return"]
];

const childrenPlaylistEmbedUrl = "https://www.youtube.com/embed/videoseries?list=PLthn4AlankqBUlKAYv85Tu3Aq4BTDUcVl";
const childrenPdfUrl = "/pdfs/vida-de-jesus-para-criancas.pdf";

const childrenVideos = [
  ["vjgbxkPuNf4", "Como foram os 7 dias da Criação do Mundo"],
  ["vjPMTbnqg9M", "Adão e Eva / Jardim do Éden"],
  ["uo4cwyqY_tU", "A Oferta de Caim e Abel"],
  ["_IHoovp-fKw", "Enoque, o homem que andava com Deus"],
  ["76td4N1yTk8", "O Dilúvio e a arca de Noé"],
  ["kJt8VS_erFg", "A Torre de Babel / Início das Nações"],
  ["YOXQnOVEp24", "A Promessa de Deus para Abraão"],
  ["WS9erbe1REU", "Abraão e Isaque vão ao Monte Moriá"],
  ["oK8B6GEvpEs", "A Destruição de Sodoma e Gomorra"],
  ["cwUM02eXrhg", "Gênesis: O Princípio de Tudo"],
  ["HXTybG_8gvI", "Gênesis 18 ao 21: Abrão, o pai da fé"],
  ["NkbCa8nQCtw", "Os Filhos de Isaque: Jacó e Esaú"],
  ["U1f-KcFCS6E", "Jacó é enganado por Labão"],
  ["5nuWufWYerA", "José no Egito / A Tentação de José"],
  ["QT0F7GOBtoM", "José, de escravo a governador do Egito"],
  ["gRhBkmy8WVc", "A História de José do Egito completa"],
  ["SEjXej7o_5k", "O Nascimento de Moisés"],
  ["YCaZBvcnF2c", "Moisés foge do Egito e vai para Midiã"],
  ["I2C67cP0NVc", "A Sarça Ardente / As 10 pragas do Egito"],
  ["m5ft6gVFN54", "A Travessia do Mar Vermelho"],
  ["oagXGih0xyQ", "O Maná e os 10 Mandamentos"],
  ["eCrVUfjVQJQ", "O Bezerro de Ouro"],
  ["XFf31yVUXUc", "Josué e Calebe espionam a Terra Prometida"],
  ["Pel96Hzj0ws", "Josué e a queda das muralhas de Jericó"],
  ["K683vg-LcXg", "Raabe ajuda os espias"],
  ["cbVbSlQdviw", "O Disfarce dos Gibeonitas"],
  ["rzA9QkJdHkA", "Débora, juíza, profetisa e guerreira"],
  ["xRTnAkIPLfU", "Gideão e o exército de 300 homens"],
  ["lUZv24xk_PM", "Sansão e Dalila"],
  ["MJNqOdvC1J4", "Livro de Juízes completo"],
  ["W-iMb-gY0Xs", "Rute e Noemi"],
  ["-dPGF_F-81c", "Rute e Boaz"],
  ["ch1KH6s-rT8", "Ana pede um filho a Deus"],
  ["VEGbGgwe7Bw", "Samuel ouve a voz de Deus"],
  ["OCIIoQ3vhLM", "Saul, o primeiro rei de Israel"],
  ["zHxBKM6D8BY", "Davi vence Golias"],
  ["O0naHI2IYPE", "A amizade entre Davi e Jônatas"],
  ["NuENuSAPoIc", "Davi poupa a vida do rei Saul"],
  ["7zlEZh01Nkk", "Davi dança diante da Arca de Deus"],
  ["v15jz0Eh-2E", "A bondade de Davi para com Mefibosete"],
  ["ShLU4EwOOV4", "Salomão, o rei mais sábio"],
  ["r8mwNbjJQXs", "Salomão constrói o Templo"],
  ["5mxX8RAxtI8", "A Rainha de Sabá visita Salomão"],
  ["a6N9h7-TEmw", "Elias e a viúva de Sarepta"],
  ["7BuolekA4uQ", "O fogo do céu e a chuva de Deus"],
  ["84ExR6YwhgI", "Deus fala com Elias e chama Eliseu"],
  ["kLl5UsKAnio", "Nabote e o rei que quis o que não era seu"],
  ["8cSPzEA7ypw", "Elias e o carro de fogo"],
  ["8Do3fHnq850", "Eliseu e o milagre do azeite"],
  ["t2CeajjFZh4", "A mulher sunamita e o milagre do menino"],
  ["A60W5wPrGLs", "Eliseu purifica o caldo envenenado"],
  ["Nix6xvi3bqQ", "Naamã mergulha 7 vezes"],
  ["lFsKY7UX-DA", "Uma lição sobre verdade e honestidade"]
];

export default function JesusForChildrenPage() {
  return (
    <>
      <section className="page-title">
        <div className="eyebrow">
          <T pt="Historia para criancas" en="Story for children" />
        </div>
        <h1>
          <T pt="A vida de Jesus para criancas" en="The life of Jesus for children" />
        </h1>
        <p>
          <T
            pt="Um percurso simples e visual pela vida de Jesus, desde o nascimento em Belem ate a ressurreicao, ascensao e promessa de voltar."
            en="A simple and visual journey through the life of Jesus, from his birth in Bethlehem to the resurrection, ascension and promise to return."
          />
        </p>
        <div className="actions">
          <Link className="button" href={childrenPdfUrl}>
            <T pt="Abrir PDF" en="Open PDF" />
          </Link>
          <Link className="button secondary" href="/historia-de-jesus">
            <T pt="Ver historia simples" en="See simple story" />
          </Link>
        </div>
      </section>

      <section className="section youtube-playlist-section">
        <div className="playlist-heading">
          <div>
            <div className="eyebrow">YouTube</div>
            <h2>
              <T pt="Historinhas bíblicas" en="Bible little stories" />
            </h2>
            <p>
              <T
                pt="Uma playlist visual com 53 vídeos para crianças conhecerem histórias da Bíblia de forma simples, colorida e fácil de acompanhar."
                en="A visual playlist with 53 videos for children to discover Bible stories in a simple, colorful and easy-to-follow way."
              />
            </p>
          </div>
          <Link className="button light" href="/historinhas-biblicas-youtube">
            <T pt="Abrir playlist completa" en="Open full playlist" />
          </Link>
        </div>
        <div className="playlist-embed">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src={childrenPlaylistEmbedUrl}
            title="Historinhas bíblicas"
          />
        </div>
        <div className="video-grid">
          {childrenVideos.map(([id, title]) => (
            <Link
              className="video-card"
              href={`/youtube/watch?v=${id}&list=PLthn4AlankqBUlKAYv85Tu3Aq4BTDUcVl`}
              key={id}
            >
              <img alt={title} loading="lazy" src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} />
              <span>{title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section band">
        <h2>
          <T pt="Resumo dos capitulos" en="Chapter overview" />
        </h2>
        <ol className="chapter-list">
          {chapters.map(([pt, en]) => (
            <li key={pt}>
              <strong>
                <T pt={pt} en={en} />
              </strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <div className="reader-heading">
          <div>
            <h2>
              <T pt="Leitor do PDF" en="PDF reader" />
            </h2>
            <p>
              <T
                pt="Se o leitor embutido nao aparecer no teu browser, abre o PDF diretamente pelo botao."
                en="If the embedded reader does not appear in your browser, open the PDF directly with the button."
              />
            </p>
          </div>
          <div className="reader-actions">
            <Link className="button" href={childrenPdfUrl}>
              <T pt="Abrir PDF completo" en="Open full PDF" />
            </Link>
          </div>
        </div>
        <div className="pdf-viewer">
          <object data={`${childrenPdfUrl}#view=FitH`} type="application/pdf">
            <div className="pdf-fallback">
              <h3>
                <T pt="O leitor embutido nao abriu" en="The embedded reader did not open" />
              </h3>
              <p>
                <T
                  pt="O ficheiro esta disponivel. Clica no botao para abrir o PDF completo no navegador."
                  en="The file is available. Click the button to open the full PDF in the browser."
                />
              </p>
              <Link className="button" href={childrenPdfUrl}>
                <T pt="Abrir PDF" en="Open PDF" />
              </Link>
            </div>
          </object>
        </div>
      </section>
    </>
  );
}
