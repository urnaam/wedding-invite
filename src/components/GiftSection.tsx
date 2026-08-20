'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function GiftSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-x-hidden px-4 py-12 text-center bg-[#1B2A4A] text-[#F6F1EA] selection:bg-[#C9A227] selection:text-[#1B2A4A]">
      {/* Үндсэн тансаг зэрэглэлийн давхар алтан хүрээтэй хайрцаг */}
      <div className="relative max-w-2xl w-full border border-[#C9A227]/30 p-8 sm:p-12 rounded shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#1B2A4A]/40 backdrop-blur-sm overflow-hidden">
        {/* Дотоод нарийн алтан шугам */}
        <div className="absolute inset-1.5 border-2 border-[#C9A227]/10 pointer-events-none" />

        {/* Булангийн SVG угалзууд (Бусад хэсгүүдтэй ижилхэн загвар) */}
        {[
          'top-0 left-0',
          'top-0 right-0 rotate-90',
          'bottom-0 left-0 -rotate-90',
          'bottom-0 right-0 rotate-180',
        ].map((alignment, index) => (
          <svg
            key={index}
            className={`absolute w-6 h-6 sm:w-8 sm:h-8 stroke-[#C9A227]/60 fill-none stroke-[1.2] p-1.5 ${alignment}`}
            viewBox="0 0 100 100"
          >
            <path d="M 0,0 L 40,0 M 0,0 L 0,40 M 10,10 L 30,10 M 10,10 L 10,30" />
          </svg>
        ))}

        {/* Дээд талын жижиг чимэглэл гарчиг */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full font-sans-clean text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#C9A227] mb-4"
        >
          {t('giftLabel') || 'Cadeau / Gift Idea'}
        </motion.p>

        {/* Тансаг дугтуйны дүрс (SVG Icon) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="p-3 rounded-full bg-[#C9A227]/5 border border-[#C9A227]/20 shadow-[0_0_20px_rgba(201,162,39,0.05)]">
            <svg
              className="w-7 h-7 text-[#C9A227] stroke-[1.1]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
        </motion.div>

        {/* Хуримын Бэлгийн Гарчиг - Италик хэв маяг */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-script-luxury text-3xl italic text-[#F6F1EA] sm:text-4xl tracking-wide px-2"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {t('giftTitle')}
        </motion.h2>

        {/* Нарийн алтан хэвтээ шугам */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent mx-auto my-5"
        />

        {/* Урилгын үндсэн тайлбар бичвэр */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans-clean text-xs sm:text-sm tracking-widest text-[#F6F1EA]/80 max-w-md mx-auto leading-relaxed whitespace-pre-line"
        >
          {t('giftDescription')}
        </motion.p>

        {/* Доод талын тансаг нарийн шугам */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C9A227]/20 to-transparent mx-auto mt-6" />
      </div>
    </section>
  );
}
