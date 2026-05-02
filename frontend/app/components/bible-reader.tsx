"use client";

import { useEffect, useMemo, useState } from "react";
import { T } from "./language";

type Language = "pt" | "en";

interface BibleBook {
  id: string;
  number: number;
  names: Record<Language, string>;
  chapters: number;
}

interface BibleManifest {
  source: string;
  license: string;
  attribution: string;
  books: BibleBook[];
}

interface BibleVerse {
  verse?: number;
  text: string[];
}

interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

function savedLanguage(): Language {
  if (typeof window === "undefined") {
    return "pt";
  }

  return window.localStorage.getItem("language") === "en" ? "en" : "pt";
}

export function BibleReader() {
  const [language, setLanguage] = useState<Language>("pt");
  const [manifest, setManifest] = useState<BibleManifest | null>(null);
  const [bookId, setBookId] = useState("43");
  const [chapter, setChapter] = useState(1);
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLanguage(savedLanguage());

    function onLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<Language>;
      setLanguage(customEvent.detail === "en" ? "en" : "pt");
    }

    window.addEventListener("languagechange", onLanguageChange);
    return () => window.removeEventListener("languagechange", onLanguageChange);
  }, []);

  useEffect(() => {
    async function loadManifest() {
      const response = await fetch("/bible/manifest.json");
      setManifest((await response.json()) as BibleManifest);
    }

    void loadManifest();
  }, []);

  useEffect(() => {
    async function loadChapter() {
      setIsLoading(true);
      const paddedChapter = String(chapter).padStart(3, "0");
      const response = await fetch(`/bible/${language}/${bookId}/${paddedChapter}.json`);
      setChapterData((await response.json()) as BibleChapter);
      setIsLoading(false);
    }

    void loadChapter();
  }, [bookId, chapter, language]);

  const currentBook = useMemo(
    () => manifest?.books.find((book) => book.id === bookId) ?? null,
    [bookId, manifest]
  );

  const chapters = useMemo(() => {
    const total = currentBook?.chapters ?? 1;
    return Array.from({ length: total }, (_, index) => index + 1);
  }, [currentBook]);

  function changeBook(nextBookId: string) {
    setBookId(nextBookId);
    setChapter(1);
  }

  return (
    <section className="section bible-reader-section" id="ler-no-site">
      <div className="reader-heading">
        <div>
          <div className="eyebrow">
            <T pt="Open Translation Bible" en="Open Translation Bible" />
          </div>
          <h2>
            <T pt="Ler a Biblia no site" en="Read the Bible on the site" />
          </h2>
        </div>
        <div className="reader-actions">
          <a className="button secondary" href="/bible/pdfs/OpenBible.pt-BR.pdf" target="_blank" rel="noreferrer">
            PDF PT
          </a>
          <a className="button secondary" href="/bible/pdfs/OpenBible.en-GB.pdf" target="_blank" rel="noreferrer">
            PDF EN
          </a>
        </div>
      </div>

      <div className="reader-controls">
        <label>
          <span>
            <T pt="Livro" en="Book" />
          </span>
          <select value={bookId} onChange={(event) => changeBook(event.target.value)}>
            {manifest?.books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.names[language]}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>
            <T pt="Capitulo" en="Chapter" />
          </span>
          <select value={chapter} onChange={(event) => setChapter(Number(event.target.value))}>
            {chapters.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <article className="bible-chapter">
        <h3>
          {currentBook?.names[language] ?? chapterData?.book} {chapter}
        </h3>
        {isLoading ? (
          <p>
            <T pt="A carregar capitulo..." en="Loading chapter..." />
          </p>
        ) : (
          <div className="verses">
            {chapterData?.verses.map((item, index) =>
              item.text.join(" ").trim() === "---" ? (
                <hr key={`break-${index}`} />
              ) : (
                <p className="verse" key={`${item.verse ?? "note"}-${index}`}>
                  {item.verse ? <sup>{item.verse}</sup> : null}
                  {item.text.join(" ")}
                </p>
              )
            )}
          </div>
        )}
      </article>

      <p className="source-note">
        <T
          pt={`Fonte: ${manifest?.attribution ?? "Open Translation Bible"} - Licenca ${manifest?.license ?? "CC BY-SA 4.0"}.`}
          en={`Source: ${manifest?.attribution ?? "Open Translation Bible"} - License ${manifest?.license ?? "CC BY-SA 4.0"}.`}
        />
      </p>
    </section>
  );
}
