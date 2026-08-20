'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function StorySection() {
  const { lang } = useLanguage();

  // Хайрын түүхийн өгөгдөл (Зургийн замууд таны public/images/ хавтаснаас уншигдана)
  const timelineEvents = [
    {
      id: 1,
      dateMn: '2022 оны 10-р сар',
      dateEn: 'October 2022',
      titleMn: 'Анхны уулзалт 🌟',
      titleEn: 'First Meeting 🌟',
      textMn:
        'Бидний түүх анх олны хөл хөдөлгөөн ихтэй намрын нэгэн өдөр эхэлсэн юм. Анхны харцаар бие биедээ татагдаж, цаг хугацаа зогсох шиг л санагдаж билээ. Тэр өдрөөс хойш бид сая сая дурсамжуудыг хамтдаа бүтээж эхэлсэн.',
      textEn:
        'Our story began on a bustling autumn day. It was love at first sight, a moment where time seemed to stand still. Since that day, we have been building a lifetime of beautiful memories together.',
      imgUrl: '/images/story-first-meet.jpeg',
    },
    {
      id: 2,
      dateMn: '2024 оны 05-р сар',
      dateEn: 'May 2024',
      titleMn: 'Хамтын аялал ✈️',
      titleEn: 'Our Journeys ✈️',
      textMn:
        'Аялал бол бидний хайрыг улам бат бөх болгосон нандин гүүр юм. Шинэ газруудтай танилцаж, хамтдаа хөтлөлцөн алхсан алхам бүр маань биднийг нэгэн цул, салшгүй нэгэн болгож өгсөн билээ.',
      textEn:
        'Traveling became the bridge that strengthened our bond. Discovering new places and walking hand in hand through every milestone made us inseparable, creating a beautiful foundation for our future.',
      imgUrl: '/images/story-travel.jpeg',
    },
    {
      id: 3,
      dateMn: '2026 оны 02-р сар',
      dateEn: 'February 2026',
      titleMn: 'Тийм гэж хэлсэн мөч 💍',
      titleEn: 'The Proposal 💍',
      textMn:
        "Хамгийн нандин, мартагдашгүй мөч. Хайртай хүнийхээ гэрлэх саналыг сонсоод, ирээдүйн амьдралаа хамтдаа туулах бат итгэлтэйгээр 'Тийм' гэж хариулсан тэр агшин бидний амьдралын шинэ хуудсыг нээсэн юм.",
      textEn:
        "The most magical moment of our lives. Hearing the question and answering with a definitive 'Yes' to spending forever together opened a beautiful new chapter in our love story.",
      imgUrl: '/images/story-proposal.jpeg',
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
                  className="w-full md:w-[46%] aspect-[4/3] sm:aspect-[16/10] bg-[#142038]/60 border border-[#C9A227]/20 rounded-2xl overflow-hidden shadow-lg relative group"
                >
                  <img
                    src={event.imgUrl}
                    alt={lang === 'mn' ? event.titleMn : event.titleEn}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  {/* 
                    ЗАСАЛТ: Огноог бичвэр дээр давхардуулахгүй байх үүднээс 
                    зургийн зүүн дээд буланд маш чамин рамтайгаар absolute байрлуулж бэхлэв.
                  */}
                  <div className="absolute top-3 left-3 bg-[#121d33]/90 text-[#C9A227] text-[10px] sm:text-xs font-medium uppercase tracking-widest px-3 py-1.5 rounded border border-[#C9A227]/30 shadow-md font-sans-clean">
                    {lang === 'mn' ? event.dateMn : event.dateEn}
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
                    {lang === 'mn' ? event.titleMn : event.titleEn}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#F6F1EA]/80 font-light max-w-xl mx-auto md:mx-0">
                    {lang === 'mn' ? event.textMn : event.textEn}
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
