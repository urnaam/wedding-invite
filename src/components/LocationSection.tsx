'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding, mapsEmbedUrl, mapsDirectionsUrl } from '@/config/wedding';
import { useLanguage } from '@/i18n/LanguageContext';

const venueSlides = [
  {
    url: '/outside-view.jpeg',
    captionKey: 'locationCaption',
  },
  {
    url: '/inside-view.jpeg',
    captionKey: 'locationCaption1',
  },
  {
    url: '/castle-view.jpeg',
    captionKey: 'locationCaption2',
  },
];

export default function LocationSection() {
  const { t, lang } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === venueSlides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? venueSlides.length - 1 : prev - 1));
  };

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

      <div className="max-w-5xl mx-auto relative z-20 text-center">
        {/* ХЭСГИЙН ДЭЭД ГАРЧИГ БОЛОН ЦЭЦГЭН ХЭЭ */}
        <div className="flex flex-col items-center text-center mb-12">
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
            {t('whereTitle')}
          </span>

          {/* ХЯЗГААРГҮЙН ТЭМДЭГТЭЙ ЗУРААС */}
          <div className="flex items-center justify-center w-full max-w-xs my-3 gap-4">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
            <span className="text-[#D4AF37]/70 text-base font-serif">∞</span>
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif italic text-3xl sm:text-5xl text-[#F6F1EA] mt-1"
          >
            {wedding.venue.name}
          </motion.h2>
          <p className="mt-2 text-xs sm:text-sm text-[#F6F1EA]/70 max-w-xl font-light">
            {wedding.venue.address}
          </p>
        </div>

        {/* ИНТЕРАКТИВ ХОСОЛСОН МАКЕТ БЛОК */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch text-left">
          {/* ЗҮҮН ТАЛ: ЗУРГИЙН СЛАЙДЕР */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-[#121D33]/60 p-3 h-[340px] sm:h-[400px] shadow-2xl"
          >
            {/* Идэвхтэй зураг (Aspect ratio-г тааруулж, хүрээнд тэгш суулгав) */}
            <div className="relative w-full h-[84%] overflow-hidden rounded-lg bg-black/20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIdx}
                  src={venueSlides[currentIdx].url}
                  alt="Venue Showcase"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Зүүн сум */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#121D33]/80 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs hover:bg-[#D4AF37] hover:text-[#121D33] transition-colors focus:outline-none backdrop-blur-sm z-10"
                aria-label="Previous image"
              >
                ❮
              </button>

              {/* Баруун сум */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#121D33]/80 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs hover:bg-[#D4AF37] hover:text-[#121D33] transition-colors focus:outline-none backdrop-blur-sm z-10"
                aria-label="Next image"
              >
                ❯
              </button>
            </div>

            {/* Тайлбар бичвэр */}
            <div className="h-[14%] flex items-center justify-center text-center px-2">
              <p className="text-xs font-serif italic text-[#D4AF37]">
                {t(venueSlides[currentIdx].captionKey)}
              </p>
            </div>
          </motion.div>

          {/* БАРУУН ТАЛ: GOOGLE MAP VIEW */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-[#121D33]/60 p-3 h-[340px] sm:h-[400px] flex flex-col shadow-2xl"
          >
            <div className="w-full h-full rounded-lg overflow-hidden">
              <iframe
                title="Venue map"
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) contrast(105%)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>

        {/* Зам заалт ба товчлуур */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center text-center px-4"
        >
          {/* Зам заалтын мэдээлэл */}
          <div className="flex flex-col items-center gap-3 max-w-md mb-8 text-xs sm:text-sm tracking-wide text-[#F6F1EA]/85 font-light">
            {/* Машинаар */}
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#D4AF37] shrink-0 fill-none stroke-current stroke-[1.5]"
                viewBox="0 0 24 24"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.3.9L2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
              <p>
                <span className="text-[#D4AF37] font-medium">{t('byCar')}</span>{' '}
                {t('byCarExit')}
              </p>
            </div>

            {/* Галт тэргээр */}
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#D4AF37] shrink-0 fill-none stroke-current stroke-[1.5]"
                viewBox="0 0 24 24"
              >
                <rect x="4" y="3" width="16" height="14" rx="2" />
                <path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3" />
                <circle cx="8" cy="15" r="1" className="fill-current" />
                <circle cx="16" cy="15" r="1" className="fill-current" />
              </svg>
              <p>
                <span className="text-[#D4AF37] font-medium">
                  {t('byTrain')}:
                </span>{' '}
                {t('trainStop')}
              </p>
            </div>
          </div>

          {/* Газрын зураг руу үсрэх товчлуур */}
          <motion.a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-[#D4AF37]/60 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-[#F6F1EA] transition-colors hover:bg-[#D4AF37] hover:text-[#121D33] shadow-lg"
          >
            {t('getDirections')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
