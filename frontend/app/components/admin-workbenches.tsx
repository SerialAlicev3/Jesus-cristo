"use client";

import { FormEvent, useEffect, useState } from "react";
import { adminFetch, getAdminToken } from "./admin-api";

type RecordItem = Record<string, unknown>;

const demoMessages: RecordItem[] = [
  { id: "demo-1", title: "Amor que recomeca", theme: "amor", status: "draft", bible_reference: "Lucas 6:36" },
  { id: "demo-2", title: "Fe no caminho", theme: "fe", status: "scheduled", publish_date: new Date().toISOString() }
];

const demoArtists: RecordItem[] = [
  { id: "artist-1", name: "Embaixador autorizado", instagram_handle: "@embaixador", permission_status: "approved" },
  { id: "artist-2", name: "Novo embaixador", instagram_handle: "@novo", permission_status: "pending" }
];

const demoReels: RecordItem[] = [
  { id: "reel-1", title: "Recomecar com Jesus", caption: "Uma palavra de esperanca.", source_type: "original", status: "draft" },
  { id: "reel-2", title: "Video autorizado", caption: "Conteudo autorizado.", source_type: "authorized", status: "approved" }
];

const demoInstagram: RecordItem[] = [
  { id: "ig-1", type: "image", caption: "Mensagem diaria", status: "scheduled", scheduled_at: new Date().toISOString() },
  { id: "ig-2", type: "reel", caption: "Reel aprovado", status: "published", published_at: new Date().toISOString() }
];

function hasToken() {
  return Boolean(getAdminToken());
}

function Field({
  label,
  onChange,
  placeholder,
  type = "text",
  value
}: Readonly<{
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
}>) {
  return (
    <label>
      {label}
      <input onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} value={value} />
    </label>
  );
}

function RecordsTable({
  actions,
  emptyText,
  items,
  primary,
  secondary
}: Readonly<{
  actions?: (item: RecordItem) => React.ReactNode;
  emptyText: string;
  items: RecordItem[];
  primary: (item: RecordItem) => string;
  secondary?: (item: RecordItem) => string;
}>) {
  if (!items.length) {
    return <p>{emptyText}</p>;
  }

  return (
    <div className="table-list">
      {items.map((item) => (
        <div className="row admin-data-row" key={String(item.id ?? primary(item))}>
          <div>
            <strong>{primary(item)}</strong>
            {secondary ? <small>{secondary(item)}</small> : null}
          </div>
          <div className="row-actions">
            {item.status || item.permission_status ? <span className="status">{String(item.status ?? item.permission_status)}</span> : null}
            {actions?.(item)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminMessagesWorkbench() {
  const [bibleReference, setBibleReference] = useState("Lucas 6:36");
  const [content, setContent] = useState("Que o amor de Jesus guie este dia.");
  const [items, setItems] = useState<RecordItem[]>([]);
  const [notice, setNotice] = useState("");
  const [publishDate, setPublishDate] = useState(new Date(Date.now() + 86_400_000).toISOString().slice(0, 16));
  const [theme, setTheme] = useState("amor");
  const [title, setTitle] = useState("Mensagem diaria");

  async function load() {
    if (!hasToken()) {
      setItems(demoMessages);
      setNotice("Modo demonstracao. Faz login para listar mensagens reais.");
      return;
    }

    try {
      setItems(await adminFetch<RecordItem[]>("/messages"));
      setNotice("Mensagens carregadas da API.");
    } catch (error) {
      setItems(demoMessages);
      setNotice(error instanceof Error ? error.message : "Falha ao carregar mensagens.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = { bible_reference: bibleReference, content, theme, title };

    if (!hasToken()) {
      setItems([{ id: crypto.randomUUID(), status: "draft", ...body }, ...items]);
      setNotice("Draft criado localmente em modo demonstracao.");
      return;
    }

    const created = await adminFetch<RecordItem>("/messages", { body: JSON.stringify(body), method: "POST" });
    setItems([created, ...items]);
    setNotice("Mensagem criada como draft.");
  }

  async function approve(id: string) {
    const updated = hasToken() ? await adminFetch<RecordItem>(`/messages/${id}/approve`, { method: "PATCH" }) : { id, status: "approved" };
    setItems(items.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  }

  async function schedule(id: string) {
    const iso = new Date(publishDate).toISOString();
    const updated = hasToken()
      ? await adminFetch<RecordItem>(`/messages/${id}/schedule`, { body: JSON.stringify({ publish_date: iso }), method: "PATCH" })
      : { id, publish_date: iso, status: "scheduled" };
    setItems(items.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  }

  return (
    <div className="admin-workbench">
      <form className="admin-form-card" onSubmit={create}>
        <h2>Criar mensagem</h2>
        <Field label="Titulo" onChange={setTitle} value={title} />
        <label>
          Conteudo
          <textarea onChange={(event) => setContent(event.target.value)} value={content} />
        </label>
        <Field label="Referencia biblica" onChange={setBibleReference} value={bibleReference} />
        <label>
          Tema
          <select onChange={(event) => setTheme(event.target.value)} value={theme}>
            {["amor", "perdao", "fe", "compaixao", "esperanca", "reflexao"].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
        <button type="submit">Criar draft</button>
      </form>
      <section className="admin-form-card">
        <h2>Mensagens</h2>
        <Field label="Data para agendar" onChange={setPublishDate} type="datetime-local" value={publishDate} />
        {notice ? <p>{notice}</p> : null}
        <RecordsTable
          actions={(item) => (
            <>
              <button onClick={() => void approve(String(item.id))} type="button">Aprovar</button>
              <button onClick={() => void schedule(String(item.id))} type="button">Agendar</button>
            </>
          )}
          emptyText="Sem mensagens."
          items={items}
          primary={(item) => String(item.title)}
          secondary={(item) => `${String(item.theme ?? "")} ${String(item.bible_reference ?? "")}`}
        />
      </section>
    </div>
  );
}

export function AdminArtistsWorkbench() {
  const [bio, setBio] = useState("");
  const [handle, setHandle] = useState("");
  const [items, setItems] = useState<RecordItem[]>([]);
  const [name, setName] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    if (!hasToken()) {
      setItems(demoArtists);
      setNotice("Modo demonstracao. Faz login para listar embaixadores reais.");
      return;
    }

    setItems(await adminFetch<RecordItem[]>("/artists"));
    setNotice("Embaixadores carregados da API.");
  }

  useEffect(() => {
    void load();
  }, []);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = { bio, instagram_handle: handle, name };
    const created = hasToken()
      ? await adminFetch<RecordItem>("/artists", { body: JSON.stringify(body), method: "POST" })
      : { id: crypto.randomUUID(), permission_status: "pending", ...body };
    setItems([created, ...items]);
  }

  async function setPermission(id: string, permission_status: "approved" | "rejected") {
    const updated = hasToken()
      ? await adminFetch<RecordItem>(`/artists/${id}/approve`, { body: JSON.stringify({ permission_status }), method: "PATCH" })
      : { id, permission_status };
    setItems(items.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  }

  return (
    <div className="admin-workbench">
      <form className="admin-form-card" onSubmit={create}>
        <h2>Novo embaixador</h2>
        <Field label="Nome" onChange={setName} value={name} />
        <Field label="Instagram" onChange={setHandle} placeholder="@handle" value={handle} />
        <label>
          Bio/permissao/testemunho
          <textarea onChange={(event) => setBio(event.target.value)} value={bio} />
        </label>
        <button type="submit">Criar embaixador</button>
      </form>
      <section className="admin-form-card">
        <h2>Embaixadores</h2>
        {notice ? <p>{notice}</p> : null}
        <RecordsTable
          actions={(item) => (
            <>
              <button onClick={() => void setPermission(String(item.id), "approved")} type="button">Aprovar</button>
              <button onClick={() => void setPermission(String(item.id), "rejected")} type="button">Rejeitar</button>
            </>
          )}
          emptyText="Sem embaixadores."
          items={items}
          primary={(item) => String(item.name)}
          secondary={(item) => String(item.instagram_handle ?? "")}
        />
      </section>
    </div>
  );
}

export function AdminReelsWorkbench() {
  const [caption, setCaption] = useState("Legenda inspiradora.");
  const [items, setItems] = useState<RecordItem[]>([]);
  const [notice, setNotice] = useState("");
  const [scheduledAt, setScheduledAt] = useState(new Date(Date.now() + 86_400_000).toISOString().slice(0, 16));
  const [sourceType, setSourceType] = useState("original");
  const [title, setTitle] = useState("Reel original");
  const [videoUrl, setVideoUrl] = useState("https://example.com/video.mp4");

  async function load() {
    if (!hasToken()) {
      setItems(demoReels);
      setNotice("Modo demonstracao. Faz login para listar reels reais.");
      return;
    }

    setItems(await adminFetch<RecordItem[]>("/reels"));
    setNotice("Reels carregados da API.");
  }

  useEffect(() => {
    void load();
  }, []);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = { caption, source_type: sourceType, title, video_url: videoUrl };
    const created = hasToken()
      ? await adminFetch<RecordItem>("/reels", { body: JSON.stringify(body), method: "POST" })
      : { id: crypto.randomUUID(), status: "draft", ...body };
    setItems([created, ...items]);
  }

  async function mutate(id: string, action: "approve" | "publish" | "schedule") {
    const path = action === "schedule" ? `/reels/${id}/schedule` : `/reels/${id}/${action}`;
    const body = action === "schedule" ? { scheduled_at: new Date(scheduledAt).toISOString() } : undefined;
    const updated = hasToken()
      ? await adminFetch<RecordItem>(path, { body: body ? JSON.stringify(body) : undefined, method: action === "publish" ? "POST" : "PATCH" })
      : { id, scheduled_at: body?.scheduled_at, status: action === "approve" ? "approved" : action === "schedule" ? "scheduled" : "published" };
    setItems(items.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  }

  return (
    <div className="admin-workbench">
      <form className="admin-form-card" onSubmit={create}>
        <h2>Novo Reel</h2>
        <Field label="Titulo" onChange={setTitle} value={title} />
        <label>
          Legenda
          <textarea onChange={(event) => setCaption(event.target.value)} value={caption} />
        </label>
        <Field label="Video URL" onChange={setVideoUrl} value={videoUrl} />
        <label>
          Tipo de fonte
          <select onChange={(event) => setSourceType(event.target.value)} value={sourceType}>
            <option value="original">original</option>
            <option value="authorized">authorized</option>
            <option value="embed">embed</option>
          </select>
        </label>
        <button type="submit">Criar draft</button>
      </form>
      <section className="admin-form-card">
        <h2>Reels</h2>
        <Field label="Data para agendar" onChange={setScheduledAt} type="datetime-local" value={scheduledAt} />
        {notice ? <p>{notice}</p> : null}
        <RecordsTable
          actions={(item) => (
            <>
              <button onClick={() => void mutate(String(item.id), "approve")} type="button">Aprovar</button>
              <button onClick={() => void mutate(String(item.id), "schedule")} type="button">Agendar</button>
              <button onClick={() => window.confirm("Isto pode publicar no Instagram se a API real estiver ligada. Continuar?") && void mutate(String(item.id), "publish")} type="button">Publicar</button>
            </>
          )}
          emptyText="Sem reels."
          items={items}
          primary={(item) => String(item.title)}
          secondary={(item) => String(item.caption ?? item.video_url ?? "")}
        />
      </section>
    </div>
  );
}

export function AdminInstagramWorkbench() {
  const [caption, setCaption] = useState("Mensagem para Instagram.");
  const [items, setItems] = useState<RecordItem[]>([]);
  const [mediaUrl, setMediaUrl] = useState("https://example.com/image.jpg");
  const [notice, setNotice] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [statusId, setStatusId] = useState("");
  const [statusResult, setStatusResult] = useState<unknown>(null);
  const [type, setType] = useState<"image" | "reel">("image");

  async function load() {
    if (!hasToken()) {
      setItems(demoInstagram);
      setNotice("Modo demonstracao. Faz login para listar posts reais.");
      return;
    }

    setItems(await adminFetch<RecordItem[]>("/instagram"));
    setNotice("Posts Instagram carregados da API.");
  }

  useEffect(() => {
    void load();
  }, []);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = { caption, media_url: mediaUrl, scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : undefined };
    const endpoint = type === "image" ? "/instagram/publish-image" : "/instagram/publish-reel";

    if (!scheduledAt && !window.confirm("Sem data, a API real pode publicar imediatamente no Instagram. Continuar?")) {
      return;
    }

    const created = hasToken()
      ? await adminFetch<RecordItem>(endpoint, { body: JSON.stringify(body), method: "POST" })
      : { id: crypto.randomUUID(), status: scheduledAt ? "scheduled" : "approved", type, ...body };
    setItems([created, ...items]);
  }

  async function checkStatus() {
    if (!statusId) return;
    setStatusResult(hasToken() ? await adminFetch(`/instagram/status/${statusId}`) : { id: statusId, status_code: "DEMO" });
  }

  return (
    <div className="admin-workbench">
      <form className="admin-form-card" onSubmit={create}>
        <h2>Preparar Instagram</h2>
        <label>
          Tipo
          <select onChange={(event) => setType(event.target.value as "image" | "reel")} value={type}>
            <option value="image">image</option>
            <option value="reel">reel</option>
          </select>
        </label>
        <Field label="Media URL" onChange={setMediaUrl} value={mediaUrl} />
        <label>
          Caption
          <textarea onChange={(event) => setCaption(event.target.value)} value={caption} />
        </label>
        <Field label="Agendar em (opcional)" onChange={setScheduledAt} type="datetime-local" value={scheduledAt} />
        <button type="submit">Criar/publicar</button>
      </form>
      <section className="admin-form-card">
        <h2>Publicacoes</h2>
        {notice ? <p>{notice}</p> : null}
        <RecordsTable
          emptyText="Sem posts."
          items={items}
          primary={(item) => `${String(item.type)} - ${String(item.caption)}`}
          secondary={(item) => String(item.scheduled_at ?? item.published_at ?? "")}
        />
        <div className="status-checker">
          <Field label="Ver status por creation id" onChange={setStatusId} value={statusId} />
          <button onClick={() => void checkStatus()} type="button">Ver status</button>
          {statusResult ? <pre>{JSON.stringify(statusResult, null, 2)}</pre> : null}
        </div>
      </section>
    </div>
  );
}

export function AdminDashboardWorkbench() {
  const cards = [
    ["Drafts", "Conteudo criado por agentes a aguardar revisao."],
    ["Agendados", "Mensagens, Reels e Instagram com data definida."],
    ["Instagram", "Historico de publicacoes, erros e retries."],
    ["Seguranca", "IA gera drafts; humano aprova e confirma publicacao."]
  ];

  return (
    <div className="grid">
      {cards.map(([title, body]) => (
        <article className="card feature-card" key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

export function AdminCalendarWorkbench() {
  const days = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];

  return (
    <div className="grid">
      {days.map((day, index) => (
        <article className="card calendar-card" key={day}>
          <span>Dia {index + 1}</span>
          <h3>{day}</h3>
          <p>Mensagem, Reel ou reflexao a agendar.</p>
        </article>
      ))}
    </div>
  );
}
