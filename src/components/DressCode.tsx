'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { useLanguage } from '@/i18n/LanguageContext';

// ЗОЧДОД ЗОРИУЛСАН ШИНЭ ПАЛИТР (Цагаан өнгөнөөс 100% хол, таны заасан тод дулаан өнгөнүүд)
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

// ГЭРЧҮҮДЭД ЗОРИУЛСАН СҮҮДЭРТҮҮД
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
  const [activeTab, setActiveTab] = useState('guests'); // "guests" эсвэл "party"

  // Идэвхтэй табаас хамаарч өнгөний жагсаалтыг сонгох
  const currentSwatches =
    activeTab === 'guests' ? guestSwatches : partySwatches;

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center bg-[#1B2A4A] text-[#F6F1EA]">
      {/* Дээд талын хээ чимэглэл */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-[#C9A227]"
      >
        <span>{t('dressCodeLabel')}</span>
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 font-display text-4xl italic text-[#F6F1EA] sm:text-5xl"
      >
        {t('dressCodeTitle')}
      </motion.h2>

      {/* АНГИЛАЛ СОНГОХ ТАБ (TABS) */}
      <div className="mt-12 flex justify-center border-b border-white/10 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('guests')}
          className={`px-6 py-3 text-xs uppercase tracking-widest font-medium transition-all relative cursor-pointer focus:outline-none ${
            activeTab === 'guests'
              ? 'text-[#C9A227]'
              : 'text-[#F6F1EA]/50 hover:text-[#F6F1EA]'
          }`}
        >
          {t('weddingGuest')}
          {activeTab === 'guests' && (
            <motion.div
              layoutId="activeTabLine"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('party')}
          className={`px-6 py-3 text-xs uppercase tracking-widest font-medium transition-all relative cursor-pointer focus:outline-none ${
            activeTab === 'party'
              ? 'text-[#C9A227]'
              : 'text-[#F6F1EA]/50 hover:text-[#F6F1EA]'
          }`}
        >
          {t('weddingParty')}
          {activeTab === 'party' && (
            <motion.div
              layoutId="activeTabLine"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]"
            />
          )}
        </button>
      </div>

      {/* ДИНАМИК ПАЛИТР ХЭСЭГ */}
      <div className="mt-10 flex flex-col items-center justify-center min-h-[110px]">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#F6F1EA]/50 mb-4 h-4">
          {activeTab === 'guests' ? t('suggestedColors') : t('weddingColors')}
        </p>

        <div className="flex justify-center gap-3 sm:gap-4 h-16 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex justify-center gap-3 sm:gap-4"
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
                  className="group relative h-12 w-12 rounded-full border border-white/20 shadow-lg flex items-center justify-center cursor-help"
                  style={{ backgroundColor: swatch.color }}
                  whileHover={{ scale: 1.12, y: -5 }}
                >
                  {/* Tooltip тайлбар бичвэр */}
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap scale-0 rounded bg-[#142038] px-3 py-1.5 text-[10px] text-[#F6F1EA] group-hover:scale-100 transition-all shadow-md border border-white/10 z-50 tracking-wide font-light">
                    {lang === 'mn' ? swatch.labelMn : swatch.labelEn}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ТАЙЛБАР ТЕКСТ ХЭСЭГ */}
      <div className="mt-4 max-w-3xl mx-auto min-h-[160px]">
        <AnimatePresence mode="wait">
          {activeTab === 'guests' ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-6 sm:p-8 rounded-2xl border border-[#C9A227]/20 bg-[#142038]/50 shadow-lg backdrop-blur-sm"
            >
              {/* Нэгтгэсэн гарчиг: Ladies & Gentlemen */}
              <div className="flex items-center justify-center gap-3 mb-6 border-b border-[#C9A227]/15 pb-4">
                <span className="text-xl sm:text-2xl">✨</span>
                <h3 className="font-display text-2xl sm:text-3xl italic text-[#C9A227] tracking-wide text-center">
                  {t('ladiesMenGuide')}
                </h3>
                <span className="text-xl sm:text-2xl">🤵</span>
              </div>

              {/* Дресскодын нэгтгэсэн тайлбарууд */}
              <div className="space-y-4 text-center">
                <p className="text-sm sm:text-base leading-relaxed text-[#F6F1EA]/90 font-light">
                  {t('ladiesMenDressCode')}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="party-text-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
            >
              {/* BRIDESMAIDS (БҮСГҮЙН ГЭРЧҮҮД) */}
              <div className="p-6 rounded-2xl border border-[#C9A227]/20 bg-[#142038]/60 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🌸</span>
                  <h3 className="font-display text-2xl italic text-[#C9A227]">
                    {t('bridesmaids')}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#F6F1EA]/90 font-light">
                  {t('bridesmaidsDressCode')}
                </p>
              </div>

              {/* GROOMSMEN (ЗАЛУУГИЙН ГЭРЧҮҮД) */}
              <div className="p-6 rounded-2xl border border-[#C9A227]/20 bg-[#142038]/60 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🎩</span>
                  <h3 className="font-display text-2xl italic text-[#C9A227]">
                    {t('groomsmen')}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#F6F1EA]/90 font-light">
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
        className="mx-auto mt-10 max-w-md text-xs leading-relaxed text-[#F6F1EA]/60 italic font-light"
      >
        {t('dressCodeText')}
      </motion.p>
    </section>
  );
}
