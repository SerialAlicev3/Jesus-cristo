"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Language = "pt" | "en";

type ChatMessage = {
  ctaHref?: string;
  ctaLabel?: string;
  ctaLabelEn?: string;
  verse?: string;
  role: "agent" | "user";
  text: string;
};

type Reply = {
  title: string;
  titleEn: string;
  text: string;
  textEn: string;
  verse: string;
  parable: string;
  parableEn: string;
  videoHref: string;
  videoLabel: string;
  videoLabelEn: string;
  urgent?: boolean;
};

const quickPrompts = [
  ["Estou a sofrer", "I am suffering"],
  ["Amo alguém", "I love someone"],
  ["Perdi alguém", "I lost someone"],
  ["Estou doente", "I am sick"],
  ["Estou com medo", "I am afraid"],
  ["Tenho pensamentos ruins", "I have dark thoughts"]
];

function getOpeningMessage(language: Language): ChatMessage {
  return {
    role: "agent",
    text:
      language === "en"
        ? "I am Angel Agent. Tell me what is going on in a few words and I will answer with a verse, a parable and one small step of light. Here, every wound is welcomed with tenderness and hope."
        : "Sou o Agente Anjo. Diz-me o que se passa em poucas palavras e eu respondo com um versículo, uma parábola e um pequeno passo de luz. Aqui, cada ferida é recebida com ternura e esperança."
  };
}

const replies: Record<string, Reply> = {
  selfHarm: {
    title: "Fica comigo agora",
    titleEn: "Stay with me right now",
    text: "A tua vida importa. Não enfrentes isto sozinho neste momento: afasta-te de qualquer coisa que te possa magoar, chama alguém de confiança agora e contacta emergência local. Em Portugal/UE liga 112. Se estiveres nos EUA liga ou envia mensagem para 988. Esta dor pode ser atravessada com ajuda imediata.",
    textEn: "Your life matters. Do not face this alone right now: move away from anything that could hurt you, call someone you trust now and contact local emergency help. In Portugal/EU call 112. If you are in the US, call or text 988. This pain can be carried through with immediate help.",
    verse: "Salmo 34:18",
    parable: "O Bom Pastor procura a ovelha perdida; a tua vida não é descartável.",
    parableEn: "The Good Shepherd searches for the lost sheep; your life is not disposable.",
    videoHref: "/historia-de-jesus",
    videoLabel: "Conhecer a mensagem de Jesus",
    videoLabelEn: "Know the message of Jesus",
    urgent: true
  },
  harmOther: {
    title: "Para e cria distância",
    titleEn: "Stop and create distance",
    text: "Se sentes que podes magoar alguém, afasta-te fisicamente da pessoa e de qualquer objeto perigoso. Liga para alguém de confiança ou para emergência local agora. A coragem, neste momento, é impedir que a dor mande nas tuas mãos.",
    textEn: "If you feel you might hurt someone, physically move away from the person and from anything dangerous. Call someone you trust or local emergency help now. Courage, right now, is stopping pain from taking control of your hands.",
    verse: "Mateus 5:9",
    parable: "Jesus acalma a tempestade; primeiro acalma o gesto, depois falamos do coração.",
    parableEn: "Jesus calms the storm; first calm the action, then we can speak about the heart.",
    videoHref: "/parabolas",
    videoLabel: "Ver vídeos e ensinamentos",
    videoLabelEn: "See videos and teachings",
    urgent: true
  },
  grief: {
    title: "O amor não desaparece",
    titleEn: "Love does not disappear",
    text: "Perder alguém rasga por dentro. Jesus chorou por Lázaro antes de falar de esperança. Chorar também é humano. Hoje, não precisas resolver a dor toda; só precisas atravessar este dia com amor e memória.",
    textEn: "Losing someone tears inside. Jesus wept for Lazarus before speaking of hope. Crying is human too. Today, you do not need to solve all the pain; you only need to cross this day with love and memory.",
    verse: "João 11:35",
    parable: "Como a semente que cai na terra, há amor que continua a dar fruto mesmo depois da ausência.",
    parableEn: "Like the seed that falls into the ground, some love keeps bearing fruit even after absence.",
    videoHref: "/historia-de-jesus",
    videoLabel: "Ver histórias do Novo Testamento",
    videoLabelEn: "Watch New Testament stories"
  },
  sickness: {
    title: "Não estás sozinho na fragilidade",
    titleEn: "You are not alone in weakness",
    text: "A doença assusta porque nos lembra que somos frágeis. Jesus aproximava-se dos doentes com compaixão, não com julgamento. Cuida do corpo, procura ajuda médica quando precisares, e deixa a fé acompanhar cada passo.",
    textEn: "Sickness frightens us because it reminds us we are fragile. Jesus approached the sick with compassion, not judgment. Care for your body, seek medical help when needed, and let faith walk with every step.",
    verse: "Mateus 11:28",
    parable: "O homem ajudado pelo bom samaritano recebeu cuidado concreto: fé também passa por aceitar ajuda.",
    parableEn: "The man helped by the good Samaritan received practical care: faith also means accepting help.",
    videoHref: "/parabolas",
    videoLabel: "Ver vídeos das parábolas",
    videoLabelEn: "Watch parable videos"
  },
  love: {
    title: "Amar também é aprender",
    titleEn: "Love is also learning",
    text: "Amar alguém é bonito, mas amor verdadeiro não prende, não humilha e não perde a própria alma. Jesus ensina um amor com verdade, paciência, respeito e coragem.",
    textEn: "Loving someone is beautiful, but true love does not imprison, humiliate or lose its own soul. Jesus teaches love with truth, patience, respect and courage.",
    verse: "1 Coríntios 13:4",
    parable: "O filho pródigo mostra que amor verdadeiro abre caminho de volta, mas não deixa de ser verdade.",
    parableEn: "The prodigal son shows that true love opens a way back, but it does not stop being truth.",
    videoHref: "/parabolas",
    videoLabel: "Ver vídeos das parábolas",
    videoLabelEn: "Watch parable videos"
  },
  fear: {
    title: "Coragem para o próximo passo",
    titleEn: "Courage for the next step",
    text: "O medo tenta mostrar o futuro como se já estivesse perdido. Jesus não prometeu ausência de tempestades; prometeu presença dentro delas. Hoje, dá apenas o próximo passo.",
    textEn: "Fear tries to show the future as if it were already lost. Jesus did not promise the absence of storms; he promised presence within them. Today, take only the next step.",
    verse: "João 14:27",
    parable: "Na tempestade, os discípulos aprenderam que a paz de Jesus pode estar dentro do barco.",
    parableEn: "In the storm, the disciples learned that the peace of Jesus can be inside the boat.",
    videoHref: "/historia-de-jesus",
    videoLabel: "Ver histórias do Novo Testamento",
    videoLabelEn: "Watch New Testament stories"
  },
  darkThoughts: {
    title: "Não acredites em tudo o que a mente grita",
    titleEn: "Do not believe everything the mind shouts",
    text: "Pensamentos ruins podem aparecer, mas não precisam mandar em ti. Respira, ora com simplicidade, fala com alguém seguro e escolhe uma ação pequena de luz agora.",
    textEn: "Dark thoughts can appear, but they do not need to rule you. Breathe, pray simply, speak with someone safe and choose one small action of light right now.",
    verse: "Filipenses 4:8",
    parable: "A parábola do semeador lembra que nem toda semente deve criar raiz no coração.",
    parableEn: "The parable of the sower reminds us that not every seed should take root in the heart.",
    videoHref: "/parabolas",
    videoLabel: "Ver vídeos das parábolas",
    videoLabelEn: "Watch parable videos"
  },
  workDreams: {
    title: "Fé, foco e trabalho",
    titleEn: "Faith, focus and work",
    text: "Os sonhos crescem quando a fé encontra disciplina. Jesus falava de talentos porque aquilo que recebemos deve ser trabalhado com coragem, humildade e constância.",
    textEn: "Dreams grow when faith meets discipline. Jesus spoke of talents because what we receive should be worked with courage, humility and consistency.",
    verse: "Mateus 25:21",
    parable: "Na parábola dos talentos, fidelidade e trabalho transformam possibilidade em fruto.",
    parableEn: "In the parable of the talents, faithfulness and work turn possibility into fruit.",
    videoHref: "/parabolas",
    videoLabel: "Ver vídeos das parábolas",
    videoLabelEn: "Watch parable videos"
  },
  default: {
    title: "Vamos procurar luz juntos",
    titleEn: "Let us seek light together",
    text: "Não tenho tudo sobre o que sentes, mas posso caminhar contigo. Escreve com palavras simples: sofrimento, amor, perda, medo, doença, trabalho, fé ou pensamentos ruins.",
    textEn: "I do not have everything about what you feel, but I can walk with you. Write in simple words: suffering, love, loss, fear, sickness, work, faith or dark thoughts.",
    verse: "Mateus 7:7",
    parable: "Quem procura com verdade já começou a bater à porta.",
    parableEn: "Whoever seeks with truth has already begun knocking at the door.",
    videoHref: "/parabolas",
    videoLabel: "Ver vídeos das parábolas",
    videoLabelEn: "Watch parable videos"
  }
};

function getSavedLanguage(): Language {
  if (typeof window === "undefined") {
    return "pt";
  }

  return window.localStorage.getItem("language") === "en" ? "en" : "pt";
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function chooseReply(input: string): Reply {
  const text = normalize(input);

  if (/(fazer mal|magoar alguem|ferir alguem|matar alguem|hurt someone|harm someone|kill someone)/.test(text)) {
    return replies.harmOther;
  }

  if (/(me matar|matar-me|suicid|tirar a vida|acabar comigo|nao quero viver|quero morrer|kill myself|suicide)/.test(text)) {
    return replies.selfHarm;
  }

  if (/(perdi|morreu|falecido|luto|saudade|lost|grief|died)/.test(text)) {
    return replies.grief;
  }

  if (/(doente|doenca|hospital|dor no corpo|cancro|ansiedade no corpo|sick|ill|disease|hospital)/.test(text)) {
    return replies.sickness;
  }

  if (/(amo|amor|apaixonado|relacao|namoro|casamento|love|relationship)/.test(text)) {
    return replies.love;
  }

  if (/(medo|ansioso|ansiedade|panico|preocupado|fear|afraid|anxiety|panic)/.test(text)) {
    return replies.fear;
  }

  if (/(pensamentos ruins|pensamentos maus|odio|culpa|vergonha|tentacao|dark thoughts|bad thoughts|shame|guilt)/.test(text)) {
    return replies.darkThoughts;
  }

  if (/(trabalho|sonho|dinheiro|profissional|foco|objetivo|work|dream|career|money|goal)/.test(text)) {
    return replies.workDreams;
  }

  if (/(sofro|sofrer|dor|triste|sozinho|choro|suffering|sad|alone|pain)/.test(text)) {
    return replies.grief;
  }

  return replies.default;
}

export function ClawCompanionChat() {
  const [language, setLanguage] = useState<Language>("pt");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([getOpeningMessage("pt")]);

  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    setLanguage(savedLanguage);
    setMessages((current) => (current.length === 1 ? [getOpeningMessage(savedLanguage)] : current));

    function onLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<Language>;
      const nextLanguage = customEvent.detail === "en" ? "en" : "pt";
      setLanguage(nextLanguage);
      setMessages((current) => (current.length === 1 ? [getOpeningMessage(nextLanguage)] : current));
    }

    window.addEventListener("languagechange", onLanguageChange);
    return () => window.removeEventListener("languagechange", onLanguageChange);
  }, []);

  const placeholder = useMemo(
    () => (language === "en" ? "Example: I am suffering, I lost someone..." : "Exemplo: estou a sofrer, perdi alguém..."),
    [language]
  );

  function respond(value: string) {
    const reply = chooseReply(value);
    const responseText =
      language === "en"
        ? `${reply.titleEn}\n\nVerse: ${reply.verse}\n\n${reply.textEn}\n\nParable: ${reply.parableEn}`
        : `${reply.title}\n\nVersículo: ${reply.verse}\n\nParábola: ${reply.parable}`;

    setMessages((current) => [
      ...current,
      { role: "user", text: value },
      {
        ctaHref: reply.videoHref,
        ctaLabel: reply.videoLabel,
        ctaLabelEn: reply.videoLabelEn,
        role: "agent",
        text: responseText,
        verse: reply.verse
      }
    ]);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = String(formData.get("message") ?? input).trim();

    if (!value) {
      return;
    }

    respond(value);
    event.currentTarget.reset();
    setInput("");
  }

  return (
    <section className="section claw-chat-section">
      <div className="claw-chat-copy">
        <div className="angel-badge" aria-hidden="true">
          <span className="angel-halo" />
          <span>AN</span>
        </div>
        <div className="eyebrow">{language === "en" ? "Angel Agent" : "Agente Anjo"}</div>
        <h2>{language === "en" ? "Tell me what is weighing on your heart" : "Diz-me o que pesa no teu coração"}</h2>
        <p>
          {language === "en"
            ? "A kind little companion with prepared answers inspired by Jesus, parables and verses. It brings reflection, comfort and a touch of humor."
            : "Um pequeno companheiro de luz com respostas preparadas inspiradas em Jesus, parábolas e versículos. Traz reflexão, conforto e um toque de humor."}
        </p>
        <div className="quick-prompts">
          {quickPrompts.map(([pt, en]) => (
            <button key={pt} onClick={() => respond(language === "en" ? en : pt)} type="button">
              {language === "en" ? en : pt}
            </button>
          ))}
        </div>
      </div>

      <div className="claw-chat">
        <div className="chat-window" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
              {message.verse ? <strong className="chat-verse">{message.verse}</strong> : null}
              {message.text.split("\n").map((line, lineIndex) => (
                <span key={`${index}-${lineIndex}`}>
                  {line}
                  {lineIndex < message.text.split("\n").length - 1 ? <br /> : null}
                </span>
              ))}
              {message.ctaHref ? (
                <a className="chat-cta" href={message.ctaHref}>
                  {language === "en" ? message.ctaLabelEn : message.ctaLabel}
                </a>
              ) : null}
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={onSubmit}>
          <input
            aria-label={language === "en" ? "Write what you feel" : "Escreve o que sentes"}
            name="message"
            onChange={(event) => setInput(event.target.value)}
            placeholder={placeholder}
            value={input}
          />
          <button type="submit">{language === "en" ? "Send" : "Enviar"}</button>
        </form>
      </div>
    </section>
  );
}
