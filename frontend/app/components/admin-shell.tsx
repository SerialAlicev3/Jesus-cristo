"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { clearAdminToken, getAdminToken, setAdminToken, supabasePasswordLogin } from "./admin-api";
import { T } from "./language";

const adminLinks = [
  ["/admin/dashboard", "Dashboard", "Dashboard"],
  ["/admin/messages", "Mensagens", "Messages"],
  ["/admin/reels", "Reels", "Reels"],
  ["/admin/artists", "Embaixadores", "Ambassadors"],
  ["/admin/ai", "Agentes", "Agents"],
  ["/admin/calendar", "Calendário", "Calendar"],
  ["/admin/instagram", "Instagram", "Instagram"]
];

export function AdminShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [email, setEmail] = useState("");
  const [manualToken, setManualToken] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setToken(getAdminToken());

    function onTokenChange(event: Event) {
      setToken(String((event as CustomEvent<string>).detail ?? ""));
    }

    window.addEventListener("admintokenchange", onTokenChange);
    return () => window.removeEventListener("admintokenchange", onTokenChange);
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      await supabasePasswordLogin(email, password);
      setPassword("");
      setMessage("Login feito. O painel já pode chamar a API real.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login falhou.");
    }
  }

  function useManualToken() {
    if (!manualToken.trim()) {
      return;
    }

    setAdminToken(manualToken.trim());
    setManualToken("");
    setMessage("Token manual guardado neste browser.");
  }

  function logout() {
    clearAdminToken();
    setMessage("Sessão removida deste browser.");
  }

  return (
    <div className="admin-layout">
      <aside className="admin-nav">
        {adminLinks.map(([href, pt, en]) => (
          <Link key={href} href={href}>
            <T pt={pt} en={en} />
          </Link>
        ))}
      </aside>
      <main className="admin-main">
        <section className={token ? "admin-auth-bar" : "admin-auth-bar login-needed"}>
          <div>
            <strong>{token ? "API ligada" : "Modo demonstração"}</strong>
            <span>{token ? "Sessão/token ativo para chamadas protegidas." : "Faz login ou cola um token para usar a API real."}</span>
          </div>
          <details open={!token}>
            <summary>{token ? "Gerir acesso" : "Entrar"}</summary>
            <form className="admin-login-form" onSubmit={login}>
              <input onChange={(event) => setEmail(event.target.value)} placeholder="email admin/editor" type="email" value={email} />
              <input onChange={(event) => setPassword(event.target.value)} placeholder="password" type="password" value={password} />
              <button type="submit">Login Supabase</button>
            </form>
            <div className="admin-token-form">
              <input onChange={(event) => setManualToken(event.target.value)} placeholder="ou cola Bearer token" type="password" value={manualToken} />
              <button onClick={useManualToken} type="button">Usar token</button>
              {token ? <button onClick={logout} type="button">Sair</button> : null}
            </div>
            {message ? <p>{message}</p> : null}
          </details>
        </section>
        {children}
      </main>
    </div>
  );
}
