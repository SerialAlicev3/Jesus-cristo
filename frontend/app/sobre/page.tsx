import { T } from "../components/language";

export default function AboutPage() {
  return (
    <>
      <section className="page-title about-title">
        <div className="eyebrow">
          <T pt="Sobre esta obra" en="About this work" />
        </div>
        <h1>
          <T pt="Uma visao de amor" en="A vision of love" />
        </h1>
        <p>
          <T
            pt="Chamo-me Nelson Vicente. Esta obra nasce da memoria, da fe e dos ensinamentos que recebi do meu pai, Joaquim de Jesus Vicente."
            en="My name is Nelson Vicente. This work is born from the memory, faith and teachings I received from my father, Joaquim de Jesus Vicente."
          />
        </p>
      </section>

      <section className="section about-story">
        <article className="about-letter">
          <p>
            <T
              pt="Tive o prazer de ter um pai de fe que, desde pequeno, me ensinou verdades profundas. Vi a fe nos seus olhos e fui tocado por ela."
              en="I had the blessing of having a father of faith who, since I was a child, taught me deep truths. I saw faith in his eyes and I was touched by it."
            />
          </p>
          <p>
            <T
              pt="Perdi o meu pai ha alguns anos. Mais recentemente decidi comecar uma obra que tentasse descrever os seus ensinamentos e guardar aquilo que ele me passou com tanta verdade."
              en="I lost my father some years ago. More recently I decided to begin a work that would try to describe his teachings and preserve what he passed on to me with such truth."
            />
          </p>
          <p>
            <T
              pt="Com os anos, e com a adolescencia, afastei-me de Deus. Sempre acreditei, mas afastei-me. Ha cerca de cinco anos voltei a conectar-me com Ele."
              en="Over the years, and through adolescence, I drifted away from God. I always believed, but I moved away. About five years ago I began to connect with Him again."
            />
          </p>
          <p>
            <T
              pt="A magia de o ter conhecido em crianca, junto com a morte do meu pai, fez-me conectar com Deus como nunca antes tinha acontecido."
              en="The wonder of having known Him as a child, together with the death of my father, made me connect with God in a way I had never experienced before."
            />
          </p>
          <p>
            <T
              pt="Milagres tem acontecido na minha vida espiritual, e por isso quero partilhar convosco como o amor e a fe podem mudar caminhos."
              en="Miracles have been happening in my spiritual life, and that is why I want to share with you how love and faith can change paths."
            />
          </p>
          <p>
            <T
              pt="O meu pai nao era religioso no sentido de viver preso a formalidades. Era, acima de tudo, um homem de fe na palavra de Deus."
              en="My father was not religious in the sense of being bound to formalities. Above all, he was a man of faith in the word of God."
            />
          </p>
          <p>
            <T
              pt="O amor descrevia a sua personalidade. A frase que mais o representava era esta: Jesus nao precisava de templos; onde um ou dois estivessem juntos em nome dele, ele ali estaria."
              en="Love described his personality. The phrase that represented him most was this: Jesus did not need temples; where one or two were gathered in his name, he would be there."
            />
          </p>
          <p>
            <T
              pt="Esta e uma visao de amor e ensinamento, nao de restricoes ou leis. Todos pecamos, todos falhamos, mas o amor continua a ser a chave de tudo."
              en="This is a vision of love and teaching, not of restrictions or laws. We all sin, we all fail, but love remains the key to everything."
            />
          </p>
          <p>
            <T
              pt="Esta e uma mensagem de forca e coragem. Com fe, foco e muito trabalho, seja na vida profissional, na vida amorosa ou no caminho pessoal, podes sentir-te completo e caminhar para cumprir os teus sonhos."
              en="This is a message of strength and courage. With faith, focus and hard work, whether in professional life, love life or the personal journey, you can feel whole and move toward fulfilling your dreams."
            />
          </p>
        </article>

        <aside className="about-quote">
          <span>Joaquim de Jesus Vicente</span>
          <blockquote>
            <T
              pt="Jesus nao precisava de templos; onde um ou dois estivessem juntos em nome dele, ele ali estaria."
              en="Jesus did not need temples; where one or two were gathered in his name, he would be there."
            />
          </blockquote>
        </aside>
      </section>
    </>
  );
}
