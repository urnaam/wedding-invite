'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function StorySection() {
  const { t, lang } = useLanguage();

  // Хайрын түүхийн өгөгдөл (Зургийн замууд таны public/images/ хавтаснаас уншигдана)
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
      text: `ourJourneysDesc`,
      imgUrl: '/journey.jpg',
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
    <section className="w-full bg-[#1B2A4A] text-[#F6F1EA] py-24 px-4 sm:px-6 relative overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto relative">
        {/* Хэсгийн дээд гарчиг */}
        <div className="text-center mb-16 relative z-10">
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#C9A227] font-light mb-3">
            {lang === 'mn'
              ? 'Бидний нандин дурсамжууд'
              : 'Our Beautiful Journey'}
          </p>
          <h2
            className="text-3xl sm:text-5xl font-normal text-[#F6F1EA]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {lang === 'mn' ? 'Хайрын Түүх' : 'Our Love Story'}
          </h2>
          <div className="w-16 h-px bg-[#C9A227]/40 mx-auto mt-4" />
        </div>

        {/* 
          ГӨЛ ДУНДУУР ГҮЙХ МИНИМАЛИСТ ТЭНХЛЭГИЙН ШУГАМ 
          ЗАСАЛТ: Дээр нь ямар нэгэн бичвэртэй дугуй давхцахгүй тул цэвэрхэн нарийн шугам байх болно.
        */}
        <div className="absolute left-1/2 -translate-x-1/2 top-32 bottom-0 w-px bg-gradient-to-b from-[#C9A227]/10 via-[#C9A227]/40 to-transparent hidden md:block" />

        {/* ДУРСАМЖУУДЫН ЖАГСААЛТ БЛОК */}
        <div className="space-y-16 md:space-y-24 relative z-10">
          {timelineEvents.map((event, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={event.id}
                className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* ЗҮҮН/БАРУУН ТАЛ: ЗУРГИЙН ХЭСЭГ */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  /* Great Gatsby Art Deco тэгш өнцөгт жааз ба гүн сүүдэр */
                  className="w-full md:w-[46%] aspect-[4/3] sm:aspect-[16/10] bg-[#0c1322] border-2 border-[#C9A227]/60 p-3 sm:p-4 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_15px_rgba(201,162,39,0.15)]"
                >
                  {/* Дотор талын давхар Art Deco нарийхан алтан шугамууд */}
                  <div className="absolute inset-1.5 border border-[#C9A227]/30 pointer-events-none z-20" />
                  <div className="absolute inset-2.5 border border-[#C9A227]/15 pointer-events-none z-20" />

                  {/* Art Deco Булангийн геометрийн хурц өнцөгт алтан хээнүүд */}
                  {[
                    { align: 'top-1 left-1', transform: '' },
                    { align: 'top-1 right-1', transform: 'scaleX(-1)' },
                    { align: 'bottom-1 left-1', transform: 'scaleY(-1)' },
                    { align: 'bottom-1 right-1', transform: 'scale(-1, -1)' },
                  ].map((item, index) => (
                    <svg
                      key={index}
                      className={`absolute w-7 h-7 sm:w-10 sm:h-10 stroke-[#C9A227] fill-none stroke-[1.2] z-30 pointer-events-none ${item.align}`}
                      style={{ transform: item.transform }}
                      viewBox="0 0 50 50"
                    >
                      <path
                        d="M 0,0 L 20,0 L 20,4 L 4,4 L 4,20 L 0,20 Z"
                        className="fill-[#C9A227]/30 stroke-none"
                      />
                      <path d="M 0,0 L 32,0 L 32,2 L 2,2 L 2,32 L 0,32 Z" />
                      <path d="M 8,8 L 24,8 L 24,10 L 10,10 L 10,24 L 8,24 Z" />
                      <polygon
                        points="18,18 24,12 18,6 12,12"
                        className="fill-[#C9A227]/50 stroke-none"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="1.5"
                        className="fill-[#C9A227] stroke-none"
                      />
                    </svg>
                  ))}

                  {/* Дээд ба Доод талын Төв Art Deco Чимэглэл (Gatsby Crown Ornament) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <svg
                      className="w-16 h-4 sm:w-20 sm:h-5 stroke-[#C9A227] fill-none stroke-[1]"
                      viewBox="0 0 100 25"
                    >
                      <path d="M 0,0 L 35,0 L 50,15 L 65,0 L 100,0" />
                      <polygon
                        points="50,4 57,13 50,22 43,13"
                        className="fill-[#C9A227]/30 stroke-[#C9A227]"
                      />
                    </svg>
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <svg
                      className="w-16 h-4 sm:w-20 sm:h-5 stroke-[#C9A227] fill-none stroke-[1]"
                      viewBox="0 0 100 25"
                    >
                      <path d="M 0,25 L 35,25 L 50,10 L 65,25 L 100,25" />
                      <polygon
                        points="50,21 57,12 50,3 43,12"
                        className="fill-[#C9A227]/30 stroke-[#C9A227]"
                      />
                    </svg>
                  </div>

                  {/* Зургийн контейнер */}
                  <div className="w-full h-full relative overflow-hidden bg-[#090e1a]">
                    {/* Дотоод сүүдэр */}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.85)] z-10 pointer-events-none" />

                    {/* Зураг */}
                    <img
                      src={event.imgUrl}
                      alt={t(event.title)}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-104 transition-all duration-700 ease-out"
                    />
                  </div>

                  {/* Огнооны хүрээ (Gatsby хэв маягийн хурц өнцөгтэй) */}
                  <div className="absolute top-5 left-5 bg-[#121d33]/90 text-[#C9A227] text-[10px] sm:text-xs font-medium uppercase tracking-widest px-3 py-1.5 border border-[#C9A227]/50 shadow-md font-sans-clean z-30 pointer-events-none">
                    {t(event.date)}
                  </div>
                </motion.div>

                {/* БАРУУН/ЗҮҮН ТАЛ: ТЕКСТЭН МЭДЭЭЛЛИЙН ХЭСЭГ (Давхардал 100% арилсан) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="w-full md:w-[46%] flex flex-col justify-center text-center md:text-left"
                >
                  <h3
                    className="text-2xl sm:text-3xl font-normal text-[#C9A227] mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {t(event.title)} 💍
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#F6F1EA]/80 font-light max-w-xl mx-auto md:mx-0">
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
