'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding, mapsEmbedUrl, mapsDirectionsUrl } from '@/config/wedding';
import { useLanguage } from '@/i18n/LanguageContext';
// Хөтчийн хайлтын үр дүнгээс баталгаажуулсан өндөр чанартай хуримын талбайн зургууд
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
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      {/* Дээд талын угалз чимэглэл */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-gold"
      >
        <span>{t('whereTitle')}</span>
      </motion.p>

      {/* Байршлын нэр болон хаяг */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-4 font-display text-4xl italic text-ivory sm:text-5xl"
      >
        {wedding.venue.name}
      </motion.h2>
      <p className="mt-2 text-sm text-ivory/70 max-w-xl mx-auto">
        {wedding.venue.address}
      </p>

      {/* ИНТЕРАКТИВ ХОСОЛСОН МАКЕТ БЛОК */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch text-left">
        {/* ЗҮҮН ТАЛ: ЗУРГИЙН СЛАЙДЕР (CAROUSEL) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/20 bg-[#142038]/50 p-4 h-[320px] sm:h-[400px] group"
        >
          {/* Идэвхтэй зураг харуулах талбар */}
          <div className="relative w-full h-[82%] overflow-hidden rounded-xl bg-black/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIdx}
                src={venueSlides[currentIdx].url}
                alt="Venue Showcase"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Зүүн тийш шилжүүлэх сум */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1B2A4A]/80 border border-gold/30 flex items-center justify-center text-ivory text-xs hover:bg-gold hover:text-navy transition-colors focus:outline-none"
              aria-label="Previous image"
            >
              ❮
            </button>

            {/* Баруун тийш шилжүүлэх сум */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1B2A4A]/80 border border-gold/30 flex items-center justify-center text-ivory text-xs hover:bg-gold hover:text-navy transition-colors focus:outline-none"
              aria-label="Next image"
            >
              ❯
            </button>
          </div>

          {/* Зургийн доорх тайлбар бичвэр */}
          <div className="h-[15%] flex items-center justify-center text-center px-2">
            <p className="text-xs italic text-ivory/80 font-light">
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
          className="overflow-hidden rounded-2xl border border-gold/30 bg-[#142038]/50 p-4 h-[320px] sm:h-[400px] flex flex-col"
        >
          <div className="w-full h-full rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Venue map"
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(10%) contrast(105%)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>

      {/* Зам заалт болон Газрын зургийн товчлуур */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10 flex flex-col items-center text-center px-4"
      >
        {/* Аян замын мэдээлэл / Зам заалт */}
        <div className="flex flex-col items-center gap-3 max-w-md mb-8 font-serif-luxury text-xs sm:text-sm tracking-[0.08em] text-[#F6F1EA]/85">
          {/* Машинаар явах заалт */}
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#C9A227] shrink-0 fill-none stroke-current stroke-[1.5]"
              viewBox="0 0 24 24"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.3.9L2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            <p>
              <span className="text-[#C9A227]">{t('byCar')}</span>{' '}
              {t('byCarExit')}
            </p>
          </div>

          {/* Галт тэрэгний заалт */}
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#C9A227] shrink-0 fill-none stroke-current stroke-[1.5]"
              viewBox="0 0 24 24"
            >
              <rect x="4" y="3" width="16" height="14" rx="2" />
              <path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3" />
              <circle cx="8" cy="15" r="1" className="fill-current" />
              <circle cx="16" cy="15" r="1" className="fill-current" />
            </svg>
            <p>
              <span className="text-[#C9A227]">{t('byTrain')}:</span>{' '}
              {t('trainStop')}
            </p>
          </div>
        </div>

        {/* Газрын зураг дээр очих зам заах гадаад холбоос товчлуур */}
        <motion.a
          href={mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full border border-gold/60 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-gold hover:text-navy shadow-md"
        >
          {t('getDirections')}
        </motion.a>
      </motion.div>
    </section>
  );
}
