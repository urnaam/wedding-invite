'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { useLanguage } from '@/i18n/LanguageContext';
export default function Hero() {
  const { t, lang } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  // Hydration алдаанаас сэргийлж, зөвхөн Client-side бэлэн болсон үед огноог хөрвүүлнэ
  useEffect(() => {
    setIsClient(true);
  }, []);

  const date = new Date(wedding.dateTimeISO);
  const year = date.getFullYear();
  const monthIndex = date.getMonth(); // 0-11
  const day = date.getDate();

  const mnMonths = [
    '1-р сарын',
    '2-р сарын',
    '3-р сарын',
    '4-р сарын',
    '5-р сарын',
    '6-р сарын',
    '7-р сарын',
    '8-р сарын',
    '9-р сарын',
    '10-р сарын',
    '11-р сарын',
    '12-р сарын',
  ];
  const localeMap = {
    mn: 'mn-MN',
    en: 'en-US',
    fr: 'fr-FR',
    de: 'de-DE',
    nl: 'nl-NL',
    yue: 'zh-HK',
  } as const;

  // Огноог хэлнээс хамаарч хөрвүүлэх логик
  let formattedDate = '';
  if (isClient) {
    if (lang === 'mn') {
      // Монгол хэл дээр системээс үл хамааран төгс харагдах формат
      formattedDate = `${year} оны ${mnMonths[monthIndex]} ${day}-ний өдөр`;
    } else {
      // Бусад хэл дээр стандарт Intl API ашиглана
      const currentLocale =
        lang in localeMap ? localeMap[lang as keyof typeof localeMap] : 'en-US';
      formattedDate = date.toLocaleDateString(currentLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  }
  return (
    /* 

      min-h-screen ашиглан урилгын дэлгэцийг дүүрэн болгож, 
      контент уртсах үед доошоо чөлөөтэй scroll хийх боломжийг олгоно.
    */
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden px-4 py-16 sm:py-24 text-center bg-[#1B2A4A] text-[#F6F1EA] selection:bg-[#C9A227] selection:text-[#1B2A4A]">
      {/* Арын фон дахь уусгалтай зөөлөн бургунди гэрэлтэлт */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[300px] sm:h-[520px] sm:w-[520px] -translate-x-1/2 rounded-full bg-burgundy/10 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Тансаг зэрэглэлийн давхар алтан хүрээ */}
      <div className="relative max-w-2xl w-full border border-[#C9A227]/30 p-6 sm:p-12 md:p-16 rounded shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#1B2A4A]/40 backdrop-blur-sm">
        <div className="absolute inset-1.5 border-2 border-[#C9A227]/10 pointer-events-none" />

        {/* Булангийн SVG угалзууд */}
        {[
          'top-0 left-0',
          'top-0 right-0 rotate-90',
          'bottom-0 left-0 -rotate-90',
          'bottom-0 right-0 rotate-180',
        ].map((alignment, index) => (
          <svg
            key={index}
            className={`absolute w-8 h-8 sm:w-12 sm:h-12 stroke-[#C9A227]/60 fill-none stroke-[1.2] p-2 ${alignment}`}
            viewBox="0 0 100 100"
          >
            <path d="M 0,0 L 40,0 M 0,0 L 0,40 M 10,10 L 30,10 M 10,10 L 10,30" />
          </svg>
        ))}

        {/* Дээд угалз болон Текст */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full font-sans-clean text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#C9A227] mb-6"
        >
          {t('weCelebrate')}
        </motion.p>

        {/* Хосуудын нэр */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 font-script-luxury text-4xl leading-tight sm:text-6xl md:text-7xl md:leading-[1.5] text-[#F6F1EA] px-2"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {wedding.coupleNames[lang]}
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
          className="border-y border-[#C9A227]/20 my-8 py-4 mx-2 sm:mx-6"
        >
          <p className="font-serif-luxury text-base sm:text-xl md:text-2xl font-medium tracking-[0.12em] text-[#C9A227]">
            {isClient ? formattedDate : 'Loading...'}
          </p>
          {/* <p className="font-sans-clean text-[11px] sm:text-xs tracking-wider text-[#F6F1EA]/70 mt-2">
            {t('weddingTime')}
          </p> */}
        </motion.div>

        {/* 
          ГАЗРЫН МЭДЭЭЛЭЛ БА RSVP-ИЙН ОРОНД ОРУУЛСАН ТАНСАГ АНИМАЦИ:
          Маш удаан зөөлөн эргэлдэх хуримын бөгж болон ургамлын хээ угалз бүхий SVG Crest
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="relative flex flex-col items-center justify-center mt-6 pt-2"
        >
          {/* Эргэлдэгч Алтан Хээ угалзтай дугуй мандала */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 sm:w-32 sm:h-32 text-[#C9A227]/40 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full stroke-current fill-none stroke-[0.8]"
            >
              {/* Гадна талын цэцэгт тойрог */}
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="40" />
              {/* Дотоод угалзууд */}
              <path d="M 50,10 C 40,25 60,35 50,50 C 40,65 60,75 50,90" />
              <path d="M 10,50 C 25,40 35,60 50,50 C 65,40 75,60 90,50" />
              <path d="M 22,22 C 35,35 45,25 50,50 C 55,75 65,65 78,78" />
              <path d="M 78,22 C 65,35 55,25 50,50 C 45,75 35,65 22,78" />
            </svg>
          </motion.div>

          {/* Төв хэсэгт байрлах зөөлөн лугшиж, гэрэлтэх хоёр бөгжний бэлгэдэл */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A227] flex items-center justify-center"
            style={{ marginTop: '-12px' }} // Анимейшн цэгцлэх тэнцвэржүүлэлт
          >
            <svg
              viewBox="0 0 60 40"
              className="w-14 h-10 fill-none stroke-current stroke-[1.2]"
            >
              {/* Зүүн бөгж */}
              <circle cx="22" cy="20" r="12" />
              {/* Баруун бөгж (Огтолцож буй) */}
              <circle cx="38" cy="20" r="12" />
            </svg>
          </motion.div>

          {/* Доод талын тансаг нарийн шугам */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent mt-4" />
        </motion.div>
      </div>
    </section>
  );
}
