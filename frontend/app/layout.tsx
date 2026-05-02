import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitcher, T } from "./components/language";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jesus Cristo",
  description: "Mensagem diaria, daily message, reflexoes, reflections, parabolas and Reels centered on Jesus Christ."
};

const publicLinks = [
  ["/mensagem-do-dia", "Mensagem", "Message"],
  ["/historia-de-jesus", "Historia", "Story"],
  ["/historia-de-jesus-para-criancas", "Criancas", "Children"],
  ["/biblia", "Biblia", "Bible"],
  ["/parabolas", "Parabolas", "Parables"],
  ["/embaixadores", "Embaixadores", "Ambassadors"],
  ["/reels", "Reels", "Reels"],
  ["/sobre", "Sobre", "About"]
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>
        <div className="site-shell">
          <header className="topbar">
            <Link className="brand" href="/">
              <span className="brand-mark">
                <span className="brand-halo" aria-hidden="true" />
                JC
              </span>
              <span className="brand-text">
                <strong>Jesus Cristo</strong>
                <small>
                  <T pt="visao de Joaquim de Jesus Vicente" en="vision of Joaquim de Jesus Vicente" />
                </small>
              </span>
            </Link>
            <div className="topbar-actions">
              <nav className="nav" aria-label="Principal">
                {publicLinks.map(([href, pt, en]) => (
                  <Link key={href} href={href}>
                    <T pt={pt} en={en} />
                  </Link>
                ))}
              </nav>
              <div className="header-controls">
                <Link className="admin-access" href="/admin/dashboard">
                  Admin
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
