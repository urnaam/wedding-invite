'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Lang, translations } from './translations';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Set the language automatically (e.g. from a guest record) without
   *  overriding a choice the visitor already made manually this session. */
  suggestLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'wedding_lang';
const MANUAL_KEY = 'wedding_lang_manual';
const DEFAULT_LANG: Lang = 'mn';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [langState, setLangState] = useState<Lang>(DEFAULT_LANG);
  // The server always renders with DEFAULT_LANG (it has no access to
  // localStorage). To guarantee the very first client render is byte-for-byte
  // identical to that server HTML — and avoid a React hydration-mismatch
  // error — we keep exposing DEFAULT_LANG to every consumer until after
  // mount, then swap to whatever was actually saved. That swap is a normal
  // post-hydration re-render, not part of the hydration diff, so it never
  // throws.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && translations[saved]) setLangState(saved);
    setMounted(true);
  }, []);

  const lang = mounted ? langState : DEFAULT_LANG;
  console.log('lang:::', lang);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    localStorage.setItem(MANUAL_KEY, '1'); // remember the visitor chose this themselves
  }

  function suggestLang(l: Lang) {
    if (translations[l]) {
      setLangState(l);
      localStorage.setItem(STORAGE_KEY, l); // Дараагийн renders-д бэлэн болгож хадгална
    }
  }

  function t(key: string) {
    return translations[lang][key] ?? translations.mn[key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, suggestLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
