'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function GiftSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-navy text-[#F6F1EA] py-20 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center">
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

      <div className="w-full max-w-2xl mx-auto relative z-20 text-center flex flex-col items-center">
        {/* ХЭСГИЙН ДЭЭД ГАРЧИГ БОЛОН ЦЭЦГЭН ХЭЭ */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* ГАРЧГИЙН ДЭЭД АЛТАН ЦЭЦГЭН SVG ХЭЭ */}
          <svg
            className="w-20 h-8 sm:w-24 sm:h-10 text-[#D4AF37] opacity-90 mb-1"
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M50 35 Q50 15 50 5" />
              <path
                d="M50 20 C40 10 20 15 15 25 C25 28 38 25 50 20 Z"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <path
                d="M50 20 C60 10 80 15 85 25 C75 28 62 25 50 20 Z"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <path
                d="M50 12 C42 5 30 8 28 15 C36 17 44 15 50 12 Z"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <path
                d="M50 12 C58 5 70 8 72 15 C64 17 56 15 50 12 Z"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <circle cx="50" cy="5" r="2.5" fill="currentColor" />
            </g>
          </svg>

          <span className="font-serif italic text-2xl sm:text-4xl tracking-wider text-[#D4AF37]">
            {t('giftTitle')}
          </span>

          {/* ХЯЗГААРГҮЙН ТЭМДЭГТЭЙ ЗУРААС */}
          <div className="flex items-center justify-center w-full max-w-xs my-3 gap-4">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
            <span className="text-[#D4AF37]/70 text-base font-serif">∞</span>
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
          </div>

          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#F6F1EA]/70 mt-1 font-medium">
            {t('giftLabel') || 'Cadeau / Gift Idea'}
          </p>
        </div>

        {/* ҮНДСЭН КАРТ ХОРИОЛТ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-xl border border-[#D4AF37]/30 bg-[#121D33]/60 pt-10 pb-8 px-6 sm:pt-12 sm:pb-10 sm:px-10 shadow-2xl backdrop-blur-sm mt-6"
        >
          {/* TOP CENTER BORDER ДЭЭР ЯГ ГОЛЛОХ ДУГТУЙ ИКОН */}
          <div className="absolute left-0 right-0 -top-6 flex justify-center pointer-events-none z-30">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="p-3 sm:p-3.5 rounded-full bg-navy border border-[#D4AF37]/60 shadow-xl flex items-center justify-center pointer-events-auto"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37] stroke-[1.2]"
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
            </motion.div>
          </div>

          {/* Дотоод нарийн хүрээ шугам */}
          <div className="absolute inset-1.5 border border-[#D4AF37]/15 rounded-lg pointer-events-none" />

          {/* Тайлбар бичвэр */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs sm:text-sm leading-relaxed text-[#F6F1EA]/85 max-w-md mx-auto whitespace-pre-line font-light tracking-wide pt-2 text-center"
          >
            {t('giftDescription')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
