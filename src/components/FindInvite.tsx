'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

type Result = { slug: string; displayName: string };

export default function FindInvite() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const { t, lang } = useLanguage();

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(
        `/api/guests/search?q=${encodeURIComponent(query)}`,
      );
      if (res.ok) setResults(await res.json());
    }, 300);
  }, [query]);

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center bg-[#1B2A4A] text-[#F6F1EA]">
      {/* Дээд талын угалз чимэглэл */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-gold"
      >
        <span>{t('rsvpLabel')}</span>
      </motion.p>

      {/* Тансаг зэрэглэлийн Serif туслах гарчиг */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-4 font-display text-4xl italic text-ivory sm:text-5xl"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {t('findInviteTitle')}
      </motion.h2>

      <p className="mt-3 text-xs sm:text-sm text-ivory/70 font-sans tracking-wide max-w-md mx-auto">
        {t('findInviteSubtitle')}
      </p>

      {/* Нарийн алтан ирмэгтэй хайлтын оролт (Input) */}
      <div className="mt-8 max-w-md mx-auto relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-full border border-gold/30 bg-[#142038]/60 px-6 py-3.5 text-center text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none shadow-inner tracking-wide transition-all font-sans text-sm focus:bg-[#142038]/90"
          aria-label={t('searchPlaceholder')}
        />
        {query.trim().length >= 2 && results.length === 0 && (
          <p className="absolute -bottom-6 left-0 right-0 text-[10px] text-ivory/40 italic">
            {lang === 'mn' ? 'Хайж байна...' : 'Searching...'}
          </p>
        )}
      </div>

      {/* ХАЙЛТЫН ИЛЭРЦҮҮД (ШИНЭЧЛЭГДСЭН ТАНСАГ ДИЗАЙН) */}
      <div className="max-w-md mx-auto mt-6">
        <AnimatePresence mode="wait">
          {results.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="overflow-hidden rounded-2xl border border-gold/20 bg-[#142038]/80 backdrop-blur-md shadow-2xl divide-y divide-gold/10"
            >
              {results.map((r, i) => (
                <motion.li
                  key={r.slug}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => router.push(`/rsvp/${r.slug}`)}
                    className="group w-full px-6 py-4 text-left text-ivory hover:bg-gold/10 flex items-center justify-between transition-all cursor-pointer focus:outline-none"
                  >
                    <div className="flex flex-col">
                      <span className="font-sans font-medium text-sm tracking-wide text-[#F6F1EA] group-hover:text-gold transition-colors">
                        {r.displayName}
                      </span>
                      <span className="text-[10px] text-ivory/50 uppercase tracking-widest mt-0.5 font-sans font-light">
                        {lang === 'mn'
                          ? 'Хуримын урилга нээх'
                          : 'View Invitation'}
                      </span>
                    </div>
                    {/* Хажуу талд харагдах алтан угалзан сум */}
                    <motion.span
                      className="text-gold/60 text-xs font-serif transition-transform group-hover:translate-x-1"
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeInOut',
                      }}
                    >
                      ✦
                    </motion.span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
