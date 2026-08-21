'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { useLanguage } from '@/i18n/LanguageContext';

const guestSwatches = [
  {
    color: '#B89047',
    labelMn: 'Golden Accent (Алтан шаргал өнгө)',
    labelEn: 'Golden Accent',
  },
  {
    color: '#8B7D6B',
    labelMn: 'Warm Taupe (Гүн дулаан тауп саарал)',
    labelEn: 'Warm Taupe',
  },
  {
    color: '#A66E65',
    labelMn: 'Dusty Cedar (Гүн намуун тоосгон ягаан)',
    labelEn: 'Dusty Cedar',
  },
  {
    color: '#637280',
    labelMn: 'Muted Slate (Даруухан ган саарал)',
    labelEn: 'Muted Slate',
  },
];

const partySwatches = [
  {
    color: wedding.colors.satinGold,
    labelMn: 'Satin Gold (Гэрч эмэгтэй даашинз)',
    labelEn: 'Satin Gold (Bridesmaids)',
  },
  {
    color: wedding.colors.navy,
    labelMn: 'Navy Blue (Гэрч эрэгтэй хослол)',
    labelEn: 'Navy Blue (Groomsmen)',
  },
  {
    color: wedding.colors.burgundy,
    labelMn: 'Burgundy Accent (Эрвээхэй зангиа)',
    labelEn: 'Burgundy Accent (Bowties)',
  },
];

export default function DressCode() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('guests');

  const currentSwatches =
    activeTab === 'guests' ? guestSwatches : partySwatches;

  return (
    <section className="relative w-full bg-navy text-[#F6F1EA] py-20 px-4 sm:px-6 overflow-hidden">
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

      <div className="max-w-4xl mx-auto relative z-20 text-center">
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
            {t('dressCodeTitle')}
          </span>

          {/* ХЯЗГААРГҮЙН ТЭМДЭГТЭЙ ЗУРААС */}
          <div className="flex items-center justify-center w-full max-w-xs my-3 gap-4">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
            <span className="text-[#D4AF37]/70 text-base font-serif">∞</span>
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
          </div>

          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#F6F1EA]/70 mt-1 font-medium">
            {t('dressCodeLabel')}
          </p>
        </div>

        {/* АНГИЛАЛ СОНГОХ ТАБ (TABS) */}
        <div className="mt-8 flex justify-center border-b border-[#D4AF37]/20 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('guests')}
            className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative cursor-pointer focus:outline-none ${
              activeTab === 'guests'
                ? 'text-[#D4AF37]'
                : 'text-[#F6F1EA]/50 hover:text-[#F6F1EA]'
            }`}
          >
            {t('weddingGuest')}
            {activeTab === 'guests' && (
              <motion.div
                layoutId="activeTabLine"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('party')}
            className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all relative cursor-pointer focus:outline-none ${
              activeTab === 'party'
                ? 'text-[#D4AF37]'
                : 'text-[#F6F1EA]/50 hover:text-[#F6F1EA]'
            }`}
          >
            {t('weddingParty')}
            {activeTab === 'party' && (
              <motion.div
                layoutId="activeTabLine"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
              />
            )}
          </button>
        </div>

        {/* ДИНАМИК ПАЛИТР ХЭСЭГ */}
        <div className="mt-10 flex flex-col items-center justify-center min-h-[110px]">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F6F1EA]/60 mb-4 font-medium">
            {activeTab === 'guests' ? t('suggestedColors') : t('weddingColors')}
          </p>

          <div className="flex justify-center gap-3 sm:gap-5 h-16 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="flex justify-center gap-3 sm:gap-5"
              >
                {currentSwatches.map((swatch, i) => (
                  <motion.div
                    key={swatch.color}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: i * 0.05,
                      type: 'spring',
                      stiffness: 150,
                    }}
                    className="group relative h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[#D4AF37]/40 shadow-xl flex items-center justify-center cursor-help"
                    style={{ backgroundColor: swatch.color }}
                    whileHover={{ scale: 1.12, y: -4 }}
                  >
                    {/* Tooltip тайлбар бичвэр */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap scale-0 rounded-md bg-[#121D33] px-3 py-1.5 text-[10px] text-[#F6F1EA] group-hover:scale-100 transition-all shadow-xl border border-[#D4AF37]/30 z-50 tracking-wide font-light">
                      {lang === 'mn' ? swatch.labelMn : swatch.labelEn}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ТАЙЛБАР ТЕКСТ ХЭСЭГ */}
        <div className="mt-6 max-w-3xl mx-auto min-h-[160px]">
          <AnimatePresence mode="wait">
            {activeTab === 'guests' ? (
              <motion.div
                key="guest-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-8 rounded-xl border border-[#D4AF37]/30 bg-[#121D33]/60 shadow-2xl backdrop-blur-sm"
              >
                {/* Нэгтгэсэн гарчиг: Ladies & Gentlemen */}
                <div className="flex items-center justify-center gap-3 mb-4 border-b border-[#D4AF37]/20 pb-4">
                  <span className="text-lg sm:text-xl">✨</span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] tracking-wide text-center">
                    {t('ladiesMenGuide')}
                  </h3>
                  <span className="text-lg sm:text-xl">🤵</span>
                </div>

                {/* Дресскодын нэгтгэсэн тайлбарууд */}
                <div className="space-y-4 text-center">
                  <p className="text-sm sm:text-base leading-relaxed text-[#F6F1EA]/85 font-light">
                    {t('ladiesMenDressCode')}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="party-text-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                {/* BRIDESMAIDS */}
                <div className="p-6 rounded-xl border border-[#D4AF37]/30 bg-[#121D33]/60 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🌸</span>
                    <h3 className="font-serif italic text-2xl text-[#D4AF37]">
                      {t('bridesmaids')}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#F6F1EA]/85 font-light">
                    {t('bridesmaidsDressCode')}
                  </p>
                </div>

                {/* GROOMSMEN */}
                <div className="p-6 rounded-xl border border-[#D4AF37]/30 bg-[#121D33]/60 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🎩</span>
                    <h3 className="font-serif italic text-2xl text-[#D4AF37]">
                      {t('groomsmen')}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#F6F1EA]/85 font-light">
                    {t('groomsmenAttire')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Доод талын туслах тайлбар */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-md text-xs leading-relaxed text-[#F6F1EA]/60 font-serif italic"
        >
          {t('dressCodeText')}
        </motion.p>
      </div>
    </section>
  );
}
