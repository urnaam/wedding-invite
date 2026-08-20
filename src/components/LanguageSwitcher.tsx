"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageLabels, Lang } from "@/i18n/translations";

const langs = Object.keys(languageLabels) as Lang[];

// A compact dropdown: shows the current language, click to reveal the other
// four. Avoids the cramped/overlapping row of pills that 5 languages caused
// on narrow screens.
export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="fixed left-4 top-4 z-40 sm:left-6 sm:top-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-gold/40 bg-navy/80 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-ivory backdrop-blur"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{languageLabels[lang]}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="mt-2 min-w-[140px] overflow-hidden rounded-2xl border border-gold/40 bg-navy/95 py-1 backdrop-blur"
          >
            {langs.map((l) => (
              <li key={l}>
                <button
                  role="option"
                  aria-selected={lang === l}
                  onClick={() => {
                    setLang(l);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-xs uppercase tracking-[0.1em] ${
                    lang === l ? "bg-gold/15 text-gold" : "text-ivory/80 hover:bg-gold/10"
                  }`}
                >
                  {languageLabels[l]}
                  {lang === l && <span>✓</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
