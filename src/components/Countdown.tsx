'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { wedding, googleCalendarUrl } from '@/config/wedding';
import { useLanguage } from '@/i18n/LanguageContext';

function getRemaining() {
  const diff = new Date(wedding.dateTimeISO).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export default function Countdown() {
  const [t2, setT2] = useState(getRemaining());
  const { t } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => setT2(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number][] = [
    [t('days'), t2.days],
    [t('hours'), t2.hours],
    [t('minutes'), t2.minutes],
    [t('seconds'), t2.seconds],
  ];

  return (
    <section className="relative flex w-full flex-col items-center justify-center px-4 py-16 text-center bg-navy text-[#F6F1EA]">
      {/* 1. ЗҮҮН ДООД БУЛАНГИЙН АЛТАН ЦЭЦЭГ */}
      <svg
        className="absolute -bottom-6 -left-8 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none z-10 opacity-80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 90 Q30 70 45 45 T70 15" />
          <path d="M25 75 Q40 55 50 30" />
          <path
            d="M45 45 C35 35 25 40 20 50 C25 55 35 55 45 45 Z"
            fill="#D4AF37"
            fillOpacity="0.05"
          />
          <path
            d="M45 45 C40 30 50 20 60 25 C60 35 52 42 45 45 Z"
            fill="#D4AF37"
            fillOpacity="0.05"
          />
          <path
            d="M45 45 C55 40 65 50 55 60 C48 58 46 50 45 45 Z"
            fill="#D4AF37"
            fillOpacity="0.05"
          />
          <path d="M28 47 Q35 45 45 45" strokeWidth="0.4" />
          <path d="M48 28 Q46 38 45 45" strokeWidth="0.4" />
          <path d="M54 53 Q49 50 45 45" strokeWidth="0.4" />
          <path d="M70 15 C65 8 72 2 78 5 C80 12 75 16 70 15 Z" />
          <path d="M70 15 C75 20 82 18 85 10 C78 8 73 11 70 15 Z" />
        </g>
      </svg>

      {/* 2. БАРУУН ДЭЭД БУЛАНГИЙН АЛТАН ЦЭЦЭГ */}
      <svg
        className="absolute -top-6 -right-8 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none z-10 opacity-80 rotate-180"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 90 Q30 70 45 45 T70 15" />
          <path d="M25 75 Q40 55 50 30" />
          <path
            d="M45 45 C35 35 25 40 20 50 C25 55 35 55 45 45 Z"
            fill="#D4AF37"
            fillOpacity="0.05"
          />
          <path
            d="M45 45 C40 30 50 20 60 25 C60 35 52 42 45 45 Z"
            fill="#D4AF37"
            fillOpacity="0.05"
          />
          <path
            d="M45 45 C55 40 65 50 55 60 C48 58 46 50 45 45 Z"
            fill="#D4AF37"
            fillOpacity="0.05"
          />
          <path d="M28 47 Q35 45 45 45" strokeWidth="0.4" />
          <path d="M48 28 Q46 38 45 45" strokeWidth="0.4" />
          <path d="M54 53 Q49 50 45 45" strokeWidth="0.4" />
          <path d="M70 15 C65 8 72 2 78 5 C80 12 75 16 70 15 Z" />
          <path d="M70 15 C75 20 82 18 85 10 C78 8 73 11 70 15 Z" />
        </g>
      </svg>

      <div className="flex flex-col items-center w-full max-w-xl mx-auto z-20">
        {/* "SAVE THE DATE" ГАРЧИГ */}
        <span className="font-serif italic text-2xl sm:text-3xl tracking-wider text-[#D4AF37] mb-2">
          {t('saveDate')}
        </span>

        {/* ДЭЭД ХЯЗГААРГҮЙН ТЭМДЭГТЭЙ ЗУРААС */}
        <div className="flex items-center justify-center w-full my-3 gap-4">
          <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
          <span className="text-[#D4AF37]/70 text-lg font-serif">∞</span>
          <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
        </div>

        {/* ЦАГ ТОЛОГЧ (ТОД, ТОМ ТОНУУД) */}
        <div className="grid grid-cols-4 w-full my-6 gap-2 sm:gap-6">
          {units.map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center"
            >
              <span className="font-sans text-4xl sm:text-6xl text-[#D4AF37] font-bold tracking-tight">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F6F1EA]/70 mt-3 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ДООД ХЯЗГААРГҮЙН ТЭМДЭГТЭЙ ЗУРААС */}
        <div className="flex items-center justify-center w-full my-3 gap-4">
          <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
          <span className="text-[#D4AF37]/70 text-lg font-serif">∞</span>
          <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
        </div>

        {/* Календарт нэмэх товч */}
        <motion.a
          href={googleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-2.5 font-body text-xs uppercase tracking-[0.2em] text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#121D33] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          {t('addToCalendar')}
        </motion.a>
      </div>
    </section>
  );
}
