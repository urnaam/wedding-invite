'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { useLanguage } from '@/i18n/LanguageContext';
export default function Hero() {
  const { t, lang } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  // Hydration алдаанаас сэргийлж, зөвхөн Client-side бэлэн болсон үед огноог хөрвүүлнэ
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    /*
      min-h-screen ашиглан урилгын дэлгэцийг дүүрэн болгож,
      контент уртсах үед доошоо чөлөөтэй scroll хийх боломжийг олгоно.
    */
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden px-4 text-center bg-[#1B2A4A] text-[#F6F1EA] selection:bg-[#C9A227] selection:text-[#1B2A4A]">
      {/* Арын фон дахь уусгалтай зөөлөн бургунди гэрэлтэлт */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[300px] sm:h-[520px] sm:w-[520px] -translate-x-1/2 rounded-full bg-burgundy/10 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Great Gatsby Art Deco Жааз */}
      <div className="relative max-w-2xl w-full border-2 border-[#C9A227]/40 p-6 sm:p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#1B2A4A]/50 backdrop-blur-md">
        {/* Дотор талын давхар нарийн алтан хүрээнүүд */}
        <div className="absolute inset-2 border border-[#C9A227]/30 pointer-events-none" />
        <div className="absolute inset-3.5 border border-[#C9A227]/15 pointer-events-none" />

        {/* Булангийн Art Deco Геометрийн хээнүүд */}
        {[
          { align: 'top-1.5 left-1.5', transform: '' },
          { align: 'top-1.5 right-1.5', transform: 'scaleX(-1)' },
          { align: 'bottom-1.5 left-1.5', transform: 'scaleY(-1)' },
          { align: 'bottom-1.5 right-1.5', transform: 'scale(-1, -1)' },
        ].map((item, index) => (
          <svg
            key={index}
            className={`absolute w-12 h-12 sm:w-20 sm:h-20 stroke-[#C9A227] fill-none stroke-[1] p-1 ${item.align}`}
            style={{ transform: item.transform }}
            viewBox="0 0 100 100"
          >
            {/* Gatsby хэв маягийн хурц өнцөгт геометрийн сүлжээ */}
            <path
              d="M 0,0 L 40,0 L 40,8 L 8,8 L 8,40 L 0,40 Z"
              className="fill-[#C9A227]/20 stroke-none"
            />
            <path d="M 0,0 L 65,0 L 65,4 L 4,4 L 4,65 L 0,65 Z" />
            <path d="M 12,12 L 50,12 L 50,16 L 16,16 L 16,50 L 12,50 Z" />
            <path
              d="M 20,20 L 35,20 L 35,35 L 20,35 Z"
              className="stroke-[0.8]"
            />
            <path d="M 0,0 L 35,35" className="stroke-[1.2]" />
            <polygon
              points="35,35 42,28 35,21 28,28"
              className="fill-[#C9A227]/40 stroke-none"
            />
            <circle
              cx="35"
              cy="35"
              r="1.5"
              className="fill-[#C9A227] stroke-none"
            />
          </svg>
        ))}

        {/* Дээд ба Доод талын Төв Art Deco Чимэглэл (Gatsby Diamond Crown) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1B2A4A] px-4">
          <svg
            className="w-16 h-6 stroke-[#C9A227] fill-none stroke-[1]"
            viewBox="0 0 100 30"
          >
            <path d="M 0,15 L 35,15 L 50,0 L 65,15 L 100,15" />
            <polygon
              points="50,5 57,15 50,25 43,15"
              className="fill-[#C9A227]/30 stroke-[#C9A227]"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#1B2A4A] px-4">
          <svg
            className="w-16 h-6 stroke-[#C9A227] fill-none stroke-[1]"
            viewBox="0 0 100 30"
          >
            <path d="M 0,15 L 35,15 L 50,30 L 65,15 L 100,15" />
            <polygon
              points="50,25 57,15 50,5 43,15"
              className="fill-[#C9A227]/30 stroke-[#C9A227]"
            />
          </svg>
        </div>

        {/* Дээд угалз болон Текст */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full font-sans-clean text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#C9A227] mb-6 mt-2"
        >
          {t('weCelebrate')}
        </motion.p>

        {/* Хосуудын нэр */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col mt-4 font-script-luxury text-4xl leading-tight sm:text-6xl md:text-7xl md:leading-[1.1] text-[#F6F1EA] px-2"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {wedding.coupleNames[lang].split('&').map((name, i, arr) => (
            <span key={i}>
              {i > 0 && (
                <span className="block text-2xl md:text-3xl -my-1">&</span>
              )}
              {name.trim()}
            </span>
          ))}
        </motion.h1>

        {/* Олон хэл дээрх урилгын үндсэн бичвэрүүд */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 font-sans-clean text-xs sm:text-sm tracking-widest text-[#F6F1EA]/80 max-w-md mx-auto leading-relaxed"
        >
          {t('invitationText')}
        </motion.p>

        {/* Баталгаатайгаар форматлагдсан Огнооны хэсэг */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="border-y border-[#C9A227]/20 mt-8 py-5 mx-2 sm:mx-6 flex flex-col items-center justify-center gap-2"
        >
          {/* Date Text */}
          <p className="font-serif-luxury text-base sm:text-xl md:text-2xl font-medium tracking-[0.12em] text-[#C9A227]">
            {isClient ? t('date') : 'Loading...'}
          </p>

          {/* Location Name */}
          <p className="font-serif-luxury text-xs sm:text-sm md:text-base tracking-[0.15em] text-[#F6F1EA]/85 uppercase mt-1">
            {wedding.venue.name}
          </p>

          {/* Château Icon */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2 text-[#C9A227]"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 sm:w-7 sm:h-7 fill-none stroke-current stroke-[1.2]"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Central Spire & Flag */}
              <path d="M12 2v3M12 2l2 1.5L12 5" />
              {/* Roofs */}
              <path d="M12 5l-4 4h8l-4-4z" />
              <path d="M4 10l3-3 3 3M14 10l3-3 3 3" />
              {/* Main Structure & Towers */}
              <path d="M4 10v10h16V10" />
              <path d="M8 10v10M16 10v10" />
              {/* Grand Entrance Gate */}
              <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
              {/* Windows */}
              <circle cx="12" cy="12" r="0.8" className="fill-current" />
              <circle cx="6" cy="13" r="0.6" className="fill-current" />
              <circle cx="18" cy="13" r="0.6" className="fill-current" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ГАЗРЫН МЭДЭЭЛЭЛ БА RSVP-ИЙН ОРОНД ОРУУЛСАН ТАНСАГ АНИМАЦИ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col items-center justify-center mt-6 pt-2 w-full"
        >
          {/* Төв хэсэгт байрлах Аажмаар Зоом хийж (Zoom In/Out), зөөлөн гэрэлтэх хоёр бөгж */}
          <div className="relative flex items-center justify-center w-full h-16">
            <motion.div
              animate={{
                scale: [0.85, 1.15, 0.85],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center justify-center text-[#C9A227]"
            >
              <svg
                viewBox="0 0 60 40"
                className="w-36 h-32 fill-none stroke-current stroke-[1.2]"
              >
                {/* 1. ХААН БУГУЙВЧ БӨГЖ (Зүүн талд - Сүлжилдсэн 2 БӨӨРӨНХИЙ тойрог) */}
                <g>
                  <circle cx="20" cy="20" r="12" />
                  <circle cx="17" cy="20" r="5" />
                  <circle cx="23" cy="20" r="5" />

                  {/* Гадна талын шигтгээнүүд (Голын шигтгээг арилгав) */}
                  <circle cx="20" cy="8" r="1" className="fill-current" />
                  <circle cx="20" cy="32" r="1" className="fill-current" />
                  <circle cx="8" cy="20" r="1" className="fill-current" />
                </g>

                {/* 2. ХАТАН СҮЙХ БӨГЖ (Баруун талд - Сүлжилдсэн 2 РОМБО дөрвөлжин) */}
                <g>
                  <circle cx="40" cy="20" r="12" />
                  <rect
                    x="33.5"
                    y="16.5"
                    width="7"
                    height="7"
                    rx="0.8"
                    transform="rotate(45 37 20)"
                  />
                  <rect
                    x="39.5"
                    y="16.5"
                    width="7"
                    height="7"
                    rx="0.8"
                    transform="rotate(45 43 20)"
                  />

                  {/* Гадна талын шигтгээнүүд (Голын шигтгээг арилгав) */}
                  <circle cx="40" cy="8" r="1" className="fill-current" />
                  <circle cx="40" cy="32" r="1" className="fill-current" />
                  <circle cx="52" cy="20" r="1" className="fill-current" />
                </g>
              </svg>
            </motion.div>
          </div>

          {/* Доод талын тансаг нарийн шугам */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent mt-2" />
        </motion.div>
      </div>
    </section>
  );
}
