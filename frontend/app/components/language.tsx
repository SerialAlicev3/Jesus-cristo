"use client";

import { useEffect, useState } from "react";

type Language = "pt" | "en";

function getSavedLanguage(): Language {
  if (typeof window === "undefined") {
    return "pt";
  }

  return window.localStorage.getItem("language") === "en" ? "en" : "pt";
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    const saved = window.localStorage.getItem("language");
    const nextLanguage: Language = saved === "en" ? "en" : "pt";
    setLanguage(nextLanguage);
    document.documentElement.dataset.lang = nextLanguage;
    document.documentElement.lang = nextLanguage;
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
    document.documentElement.dataset.lang = nextLanguage;
    document.documentElement.lang = nextLanguage;
    window.dispatchEvent(new CustomEvent("languagechange", { detail: nextLanguage }));
  }

  return (
    <div className="language-switcher" aria-label="Language selector">
      <button
        aria-pressed={language === "pt"}
        className="language-button"
        onClick={() => changeLanguage("pt")}
        type="button"
      >
        PT
      </button>
      <button
        aria-pressed={language === "en"}
        className="language-button"
        onClick={() => changeLanguage("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}

export function T({ en, pt }: Readonly<{ en: string; pt: string }>) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    setLanguage(getSavedLanguage());

    function onLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<Language>;
      setLanguage(customEvent.detail === "en" ? "en" : "pt");
    }

    window.addEventListener("languagechange", onLanguageChange);
    return () => window.removeEventListener("languagechange", onLanguageChange);
  }, []);

  return language === "en" ? en : pt;
}
