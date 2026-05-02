"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { adminFetch, getAdminToken, setAdminToken } from "./admin-api";

type ToolKey = "message" | "reel" | "review" | "week";
type Theme = "amor" | "perdao" | "fe" | "compaixao" | "esperanca" | "reflexao";

const themes: Array<[Theme, string]> = [
  ["amor", "Amor"],
  ["perdao", "Perdao"],
  ["fe", "Fe"],
  ["compaixao", "Compaixao"],
  ["esperanca", "Esperanca"],
  ["reflexao", "Reflexao"]
];

const toolMeta: Record<ToolKey, { endpoint: string; title: string; description: string }> = {
  message: {
    endpoint: "/ai/generate-message",
    title: "Gerar mensagem diaria",
    description: "Cria uma mensagem bilingue e guarda como draft editorial."
  },
  reel: {
    endpoint: "/ai/generate-reel-script",
    title: "Gerar roteiro de Reel",
    description: "Cria gancho, script, legenda e notas visuais para video curto."
  },
  review: {
    endpoint: "/ai/review-content",
    title: "Rever conteudo",
    description: "Analisa tom, clareza, riscos e alinhamento com a visao da plataforma."
  },
  week: {
    endpoint: "/ai/generate-week-plan",
    title: "Criar plano semanal",
    description: "Gera 7 drafts de mensagens para organizar a semana."
  }
};

function demoResult(tool: ToolKey, theme: Theme) {
  if (tool === "reel") {
    return {
      mode: "demo",
      title: "Um minuto de paz",
      hook: "Respira fundo: a graca de hoje chega para hoje.",
      script: "Fala sobre receber o amor de Jesus e transformar esse amor em perdao pratico.",
      caption: "Que o amor de Cristo se torne gesto concreto hoje.",
      visual_notes: "Luz natural, plano calmo, texto curto no ecra."
    };
  }

  if (tool === "review") {
    return {
      mode: "demo",
      approved: true,
      risks: [],
      suggestions: ["Manter tom humilde, humano e centrado no amor."]
    };
  }

  if (tool === "week") {
    return {
      mode: "demo",
      drafts: [
        { title: "Amor que serve", theme: "amor", bible_reference: "Joao 13:34" },
        { title: "Coragem para recomecar", theme: "esperanca", bible_reference: "Romanos 15:13" }
      ]
    };
  }

  return {
    mode: "demo",
    status: "draft",
    title: `Reflexao sobre ${theme}`,
    title_en: `Reflection on ${theme}`,
    content: "Que o amor de Jesus nos conduza hoje com fe, foco, coragem e compaixao.",
    content_en: "May the love of Jesus guide us today with faith, focus, courage and compassion.",
    bible_reference: "Lucas 6:36",
    theme
  };
}

export function AdminAiWorkbench() {
  const [token, setToken] = useState("");
  const [theme, setTheme] = useState<Theme>("amor");
  const [bibleReference, setBibleReference] = useState("Lucas 6:36");
  const [duration, setDuration] = useState("30 segundos");
  const [startsOn, setStartsOn] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");
  const [activeTool, setActiveTool] = useState<ToolKey>("message");
  const [loadingTool, setLoadingTool] = useState<ToolKey | null>(null);
  const [notice, setNotice] = useState("");
  const [result, setResult] = useState<unknown>(null);

  useEffect(() => {
    setToken(getAdminToken());

    function onTokenChange(event: Event) {
      setToken(String((event as CustomEvent<string>).detail ?? ""));
    }

    window.addEventListener("admintokenchange", onTokenChange);
    return () => window.removeEventListener("admintokenchange", onTokenChange);
  }, []);

  const payload = useMemo(() => {
    if (activeTool === "message") {
      return { theme, bible_reference: bibleReference };
    }

    if (activeTool === "reel") {
      return { theme, duration };
    }

    if (activeTool === "review") {
      return { content: content || "Jesus ensina-nos que o amor e a chave de tudo." };
    }

    return { starts_on: startsOn };
  }, [activeTool, bibleReference, content, duration, startsOn, theme]);

  function saveToken(value: string) {
    setToken(value);
    setAdminToken(value);
  }

  async function runTool(tool: ToolKey) {
    setActiveTool(tool);
    setLoadingTool(tool);
    setNotice("");
    setResult(null);

    const meta = toolMeta[tool];
    const body =
      tool === "message"
        ? { theme, bible_reference: bibleReference }
        : tool === "reel"
          ? { theme, duration }
          : tool === "review"
            ? { content: content || "Jesus ensina-nos que o amor e a chave de tudo." }
            : { starts_on: startsOn };

    if (!token) {
      setResult(demoResult(tool, theme));
      setNotice("Modo demonstracao: adiciona um Bearer token admin/editor para chamar a API real.");
      setLoadingTool(null);
      return;
    }

    try {
      const data = await adminFetch(meta.endpoint, {
        body: JSON.stringify(body),
        method: "POST"
      });
      setResult(data);
      setNotice("Resultado criado pela API real. Conteudo gerado fica como draft quando aplicavel.");
    } catch (error) {
      setResult(demoResult(tool, theme));
      setNotice(`A API real falhou: ${error instanceof Error ? error.message : "erro desconhecido"}. Mostrei um exemplo local.`);
    } finally {
      setLoadingTool(null);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runTool(activeTool);
  }

  return (
    <div className="ai-workbench">
      <section className="ai-panel ai-token-panel">
        <div>
          <h2>Ligacao a API</h2>
          <p>Para usar IA real, cola aqui o token Supabase Auth de um utilizador admin/editor. Sem token, o painel trabalha em modo demonstracao.</p>
        </div>
        <label>
          Bearer token
          <input
            onChange={(event) => saveToken(event.target.value)}
            placeholder="eyJ..."
            type="password"
            value={token}
          />
        </label>
      </section>

      <section className="ai-tools-grid">
        {(Object.keys(toolMeta) as ToolKey[]).map((tool) => (
          <button
            className={activeTool === tool ? "ai-tool-card active" : "ai-tool-card"}
            key={tool}
            onClick={() => setActiveTool(tool)}
            type="button"
          >
            <strong>{toolMeta[tool].title}</strong>
            <span>{toolMeta[tool].description}</span>
          </button>
        ))}
      </section>

      <section className="ai-panel">
        <form className="ai-form" onSubmit={onSubmit}>
          <div>
            <h2>{toolMeta[activeTool].title}</h2>
            <p>{toolMeta[activeTool].description}</p>
          </div>

          {activeTool === "message" || activeTool === "reel" ? (
            <label>
              Tema
              <select onChange={(event) => setTheme(event.target.value as Theme)} value={theme}>
                {themes.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {activeTool === "message" ? (
            <label>
              Referencia biblica
              <input onChange={(event) => setBibleReference(event.target.value)} value={bibleReference} />
            </label>
          ) : null}

          {activeTool === "reel" ? (
            <label>
              Duracao
              <input onChange={(event) => setDuration(event.target.value)} value={duration} />
            </label>
          ) : null}

          {activeTool === "review" ? (
            <label>
              Conteudo para rever
              <textarea
                onChange={(event) => setContent(event.target.value)}
                placeholder="Cola aqui um texto, legenda ou mensagem..."
                value={content}
              />
            </label>
          ) : null}

          {activeTool === "week" ? (
            <label>
              Comecar em
              <input onChange={(event) => setStartsOn(event.target.value)} type="date" value={startsOn} />
            </label>
          ) : null}

          <div className="ai-form-footer">
            <button disabled={loadingTool === activeTool} type="submit">
              {loadingTool === activeTool ? "A gerar..." : "Executar agente"}
            </button>
            <code>{toolMeta[activeTool].endpoint}</code>
          </div>
        </form>

        <aside className="ai-payload">
          <span>Payload</span>
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </aside>
      </section>

      <section className="ai-result">
        <div>
          <h2>Resultado</h2>
          {notice ? <p>{notice}</p> : <p>Executa um agente para veres aqui o draft ou a resposta gerada.</p>}
        </div>
        <pre>{result ? JSON.stringify(result, null, 2) : "Sem resultado ainda."}</pre>
      </section>
    </div>
  );
}
