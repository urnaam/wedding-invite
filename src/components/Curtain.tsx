'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { wedding } from '@/config/wedding';
interface CurtainProps {
  children: React.ReactNode;
  onOpen?: () => void;
}
export default function Curtain({ children, onOpen }: CurtainProps) {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false); // Дугтуйн хавтас нээгдэх төлөв
  const [isRevealed, setIsRevealed] = useState(false); // Хөшиг бүрэн нээгдэж урилга харагдах төлөв
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 300ms хүлээлгэснээр SiteExperience дээрх API хэл солих логик түрүүлж ажиллах боломжтой болно
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenSequence = () => {
    if (isOpen) return;

    setIsOpen(true);

    // 1. Арын хөгжмийг тоглуулна
    if (onOpen) onOpen();

    // 2. Дугтуй бүрэн нээгдэж, захидал хөөрсний дараа үндсэн сайт руу шилжинэ
    setTimeout(() => {
      setIsRevealed(true);
    }, 1200);
  };

  if (!isReady) {
    return (
      <div className="w-full h-screen bg-[#1B2A4A] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-8 h-8 border-2 border-[#C9A227] border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-[#1B2A4A] text-[#F6F1EA] font-sans selection:bg-[#C9A227] selection:text-[#1B2A4A] transition-all duration-700 ${
        !isRevealed
          ? 'h-screen overflow-hidden flex items-center justify-center fixed inset-0'
          : 'relative min-h-screen w-full overflow-y-auto overflow-x-hidden'
      }`}
    >
      <style jsx global>{`
        /* Chrome, Safari, and Opera */
        ::-webkit-scrollbar {
          width: 8px;
          background-color: #1b2a4a; /* 👈 Гүйлгэх зурвасны арын дэвсгэрийг шууд гүн хөх болгов */
        }
        ::-webkit-scrollbar-track {
          background: #1b2a4a;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(
            201,
            162,
            39,
            0.3
          ); /* 👈 Гүйлгэх бариулыг маш бүдгэрүүлсэн алтлаг өнгөтэй болгов */
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 162, 39, 0.5);
        }
        /* Firefox */
        html {
          scrollbar-width: thin;
          scrollbar-color: rgba(201, 162, 39, 0.3) #1b2a4a;
        }
      `}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Uncial+Antiqua&display=swap"
        rel="stylesheet"
      />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          /* --- ДУГТУЙТАЙ ЭХНИЙ ДЭЛГЭЦ --- */
          <motion.div
            key="envelope-intro"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -20,
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
            className="w-full h-full flex flex-col items-center justify-center p-4 z-50 select-none absolute inset-0 bg-[#1B2A4A]"
          >
            {/* ДУГТУЙН СУУРЬ КОНТЕЙНЕР (360px x 240px) */}
            <div
              className="relative w-[360px] h-[240px] bg-[#121d33] rounded-xl shadow-[0_35px_75px_rgba(0,0,0,0.65)] overflow-visible flex items-center justify-center"
              style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
            >
              {/* ДУГТУЙН АРЫН ХӨНДИЙ ЦУЛ СУУРЬ (z-10) */}
              <div className="absolute inset-0 bg-[#0a111f] rounded-xl z-10 pointer-events-none" />

              {/* 1. ДУГТУЙН ДОТРООС ЦУХУЙХ ЗАХИДЛЫН КАРТ */}
              <motion.div
                className="absolute bottom-2 left-[5%] w-[90%] h-[62%] bg-[#F6F1EA] border border-[#C9A227]/30 rounded shadow-md z-15 p-4 flex flex-col items-center justify-center"
                animate={{
                  y: isOpen ? '-95%' : '0%',
                  zIndex: isOpen ? 35 : 15,
                  scale: isOpen ? 1.02 : 0.95,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.5,
                }}
              >
                <div className="border border-[#C9A227]/40 w-full h-full p-2 flex flex-col items-center justify-center text-center">
                  <h3 className="text-2xl text-[#1B2A4A] font-display font-normal">
                    {t('title')}
                  </h3>
                  <div className="w-12 h-px bg-[#C9A227]/40 my-1" />
                  <p className="text-[10px] tracking-[0.2em] text-[#1B2A4A]/80 uppercase font-sans font-light">
                    {wedding.coupleNames[lang]}
                  </p>
                </div>
              </motion.div>

              {/* ЦУЛ АРЫН ДЭВСПЭР ХАНА (ZAХИДЛЫГ БҮТЭН ХААЖ ДАРНА - z-20) */}
              <div className="absolute inset-0 bg-[#121d33] rounded-xl z-20 pointer-events-none" />

              {/* 2. БАРУУН БА ЗҮҮН ТАЛЫН ХАВТАСНУУД (z-25) */}
              <div className="absolute inset-0 z-25 pointer-events-none">
                <div
                  className="absolute inset-0 bg-[#1c2c4c] rounded-l-xl"
                  style={{ clipPath: 'polygon(0 0, 50% 43%, 0 100%)' }}
                />
                <div
                  className="absolute inset-0 bg-[#182643] rounded-r-xl"
                  style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 43%)' }}
                />
              </div>

              {/* 3. ДООД ТАЛЫН ГУРВАЛЖИН ХАВТАС (z-25) */}
              <div
                className="absolute inset-0 bg-[#142038] z-25 rounded-b-xl pointer-events-none"
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 43%)' }}
              />

              {/* 4. ДЭЭД ГУРВАЛЖИН ХАВТАС (FLAP - z-30) */}
              <motion.div
                className="absolute inset-0 bg-[#23355c] rounded-t-xl origin-top shadow-md"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 45%)',
                  backfaceVisibility: 'hidden',
                }}
                animate={{
                  rotateX: isOpen ? 180 : 0,
                  zIndex: isOpen ? 5 : 30,
                }}
                transition={{ duration: 0.75, ease: 'easeInOut' }}
              />

              {/* 5. ИНТЕРАКТИВ ЛУГШИХ ЛАВАН ТАМГА (WAX SEAL - z-40) */}
              <motion.button
                onClick={handleOpenSequence}
                aria-label="Open invitation envelope"
                className="absolute w-16 h-16 bg-[#C9A227] rounded-full z-40 shadow-[0_8px_24px_rgba(0,0,0,0.55),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center cursor-pointer group focus:outline-none"
                animate={{
                  scale: isOpen ? 0 : [1, 1.03, 1],
                }}
                transition={{
                  scale: isOpen
                    ? { duration: 0.25 }
                    : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
                }}
                whileHover={{ scale: 1.06 }}
              >
                {/* Лааны жигд бус ирмэгийг дуурайлгасан гоёмсог угалз */}
                <div className="absolute inset-0 w-[114%] h-[110%] -left-[7%] -top-[5%] rounded-[46%_54%_44%_56%/_52%_46%_54%_46%] bg-[#C9A227] z-0 border border-black/10 shadow-[inset_0_-2px_5px_rgba(0,0,0,0.35)]" />

                {/* 
                  ЗАСАЛТ: Үлгэрийн номын угалзтай чамин хэв маягийг гаргах сонголт:
                  Сонголт А (Хуучны үлгэрийн ном шиг): fontFamily: "'Uncial Antiqua', serif"
                  Сонголт Б (Тансаг угалзтай хааны тамга шиг): fontFamily: "'Cinzel Decorative', serif"
                  Доорх кодонд илүү тод 'Cinzel Decorative'-ийг шууд зааж өгсөн. Хэрэв үлгэрийн ном шиг 
                  болгохыг хүсвэл доорх нэрийг 'Uncial Antiqua' болгож солиход л хангалттай.
                */}
                <span
                  className="relative z-50 text-[#1B2A4A] font-bold text-xl tracking-wide select-none uppercase"
                  style={{ fontFamily: "'Cinzel Decorative', serif" }}
                >
                  {wedding.monogram[lang]}
                </span>
              </motion.button>
            </div>

            {/* Заавар бичвэр */}
            <motion.p
              className="text-[#F6F1EA]/50 font-sans text-[11px] font-light tracking-[0.3em] uppercase text-center mt-12 pointer-events-none"
              animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              {t('tapTheSeal')}
            </motion.p>
          </motion.div>
        ) : (
          /* --- ҮНДСЭН УРИЛГЫН ХЭСЭГ --- */
          <motion.div
            key="main-content-flow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="w-full h-auto flex flex-col relative"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
