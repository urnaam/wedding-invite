'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function StorySection() {
  const { t, lang } = useLanguage();

  const timelineEvents = [
    {
      id: 1,
      date: 'firstMeetingDate',
      title: 'firstMeeting',
      text: 'firstMeetingDesc',
      imgUrl: '/firstmeet.jpg',
    },
    {
      id: 2,
      date: 'ourJourneysDate',
      title: 'ourJourneys',
      text: 'ourJourneysDesc',
      imgUrl: '/journey.JPG',
    },
    {
      id: 3,
      date: 'proposalDate',
      title: 'proposal',
      text: 'proposalDesc',
      imgUrl: '/proposal.jpg',
    },
  ];

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

      <div className="max-w-5xl mx-auto relative z-20">
        {/* ХЭСГИЙН ДЭЭД ГАРЧИГ */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* ҮНДСЭН ГАРЧГИЙН ДЭЭД АЛТАН ЦЭЦГЭН ХЭЭ */}
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
            {t('loveStoryTitle')}
          </span>

          {/* ХЯЗГААРГҮЙН ТЭМДЭГТЭЙ ЗУРААС */}
          <div className="flex items-center justify-center w-full max-w-xs my-3 gap-4">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
            <span className="text-[#D4AF37]/70 text-base font-serif">∞</span>
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
          </div>

          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#F6F1EA]/70 mt-1 font-medium">
            {t('beautifulJourney')}
          </p>
        </div>

        {/* ГОЛ ДУНДУУР ГҮЙХ НАРИЙН АЛТАН ШУГАМ */}
        <div className="absolute left-1/2 -translate-x-1/2 top-44 bottom-12 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent hidden md:block" />

        {/* ДУРСАМЖУУДЫН ЖАГСААЛТ */}
        <div className="space-y-16 md:space-y-24 relative">
          {timelineEvents.map((event, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={event.id}
                className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* ЗУРГИЙН ХЭСЭГ (Яг таарч багтах жаазтай) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7 }}
                  className="w-full md:w-[48%] relative group"
                >
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#D4AF37]/40 p-2 bg-[#121D33] shadow-2xl transition-all duration-500 group-hover:border-[#D4AF37]/80">
                    <div className="w-full h-full overflow-hidden rounded relative flex items-center justify-center bg-black/20">
                      <img
                        src={event.imgUrl}
                        alt={t(event.title)}
                        className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>

                    {/* Огноо */}
                    <div className="absolute top-4 left-4 bg-[#121D33]/90 text-[#D4AF37] text-[10px] sm:text-xs font-serif italic px-3 py-1 border border-[#D4AF37]/40 rounded backdrop-blur-sm z-10">
                      {t(event.date)}
                    </div>
                  </div>
                </motion.div>

                {/* ТЕКСТЭН МЭДЭЭЛЭЛ & ГАРЧГИЙН ДЭЭД ЦЭЦЭГ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`w-full md:w-[48%] flex flex-col items-center ${
                    isEven
                      ? 'md:items-end md:text-right'
                      : 'md:items-start md:text-left'
                  } text-center`}
                >
                  {/* ТИТЭМ/ГАРЧИГ БҮРИЙН ДЭЭД НАРИЙН ЦЭЦГЭН ХЭЭ (FLORAL ORNAMENT) */}
                  <svg
                    className="w-12 h-5 text-[#D4AF37]/80 mb-2"
                    viewBox="0 0 60 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="currentColor"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M30 18 Q30 8 30 2" />
                      <path
                        d="M30 10 C24 4 12 7 9 13 C15 15 22 13 30 10 Z"
                        fill="currentColor"
                        fillOpacity="0.15"
                      />
                      <path
                        d="M30 10 C36 4 48 7 51 13 C45 15 38 13 30 10 Z"
                        fill="currentColor"
                        fillOpacity="0.15"
                      />
                      <circle cx="30" cy="2" r="1.5" fill="currentColor" />
                    </g>
                  </svg>

                  <h3 className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] mb-3">
                    {t(event.title)}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#F6F1EA]/80 font-light max-w-xl">
                    {t(event.text)}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
