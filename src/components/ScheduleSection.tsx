'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

// Хуримын хөтөлбөрийн өгөгдөл
const scheduleEvents = [
  {
    time: '16:00',
    titleMn: 'Зочид хүрэлцэн ирэх',
    titleEn: 'Guest Arrival & Welcome',
    descMn: 'Эрхэм зочдоо угтан авч, ундаа болон хөнгөн зуушаар үйлчилнэ.',
    descEn:
      'Welcoming our lovely guests with refreshing drinks and light appetizers.',
    img: '/drink.avif',
  },
  {
    time: '16:30',
    titleMn: 'Гэрлэх ёслол',
    titleEn: 'Wedding Ceremony',
    descMn: 'Хосуудын нандин гэрлэлтийн баталгаа, бөгж солилцох нандин мөч.',
    descEn: 'The exchange of vows and rings under the beautiful wedding arch.',
    img: '/outside-view.jpeg',
  },
  {
    time: '17:30',
    titleMn: 'Дурсамжийн зураг авалт',
    titleEn: 'Cocktail Hour & Photos',
    descMn:
      'Гэр бүл, найз нөхөдтэйгөө нандин дурсамж үлдээх зураг авалтын цаг.',
    descEn:
      'Capturing unforgettable group memories and scenic portraits with guests.',
    img: '/photo.jpeg',
  },
  {
    time: '19:00',
    titleMn: 'Хуримын оройн зоог',
    titleEn: 'Dinner & Celebration',
    descMn: 'Хуримын хүндэтгэлийн хүлээн авалт, оройн зоог болон баярын шоу.',
    descEn:
      'The grand reception with dining, heartfelt toasts, and evening dance.',
    img: '/inside-view.jpeg',
  },
];

export default function ScheduleSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="w-full bg-[#1B2A4A] text-[#F6F1EA] py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* ХЭСГИЙН ГАРЧИГ */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-[#C9A227] mb-3"
          >
            <span>{lang === 'mn' ? 'ХӨТӨЛБӨР' : 'THE ITINERARY'}</span>
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl italic text-[#F6F1EA] sm:text-5xl"
          >
            {lang === 'mn' ? 'Хуримын өдрийн цаглабар' : 'Wedding Day Schedule'}
          </motion.h2>
          <div className="w-16 h-px bg-[#C9A227]/40 mx-auto mt-4" />
        </div>

        {/* 
          ҮНДСЭН TIMELINE СҮҮЛЖИЛСЭН МАКЕТ
          Төв тэнхлэгийн шугам: Том дэлгэц дээр яг ГОЛД НЬ (md:left-1/2), 
          жижиг дэлгэц (гар утас) дээр зүүн тал руугаа шахагдана.
        */}
        <div className="relative w-full">
          {/* Төвийн алтан уусгалтай нарийн босоо шугам */}
          <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A227]/10 via-[#C9A227]/40 to-[#C9A227]/10 left-4 md:left-1/2 md:-translate-x-1/2" />

          {/* Хөтөлбөрүүдийн жагсаалтын давталт */}
          <div className="space-y-16 md:space-y-24">
            {scheduleEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-stretch w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* --- АЛТАН ЦЭГ БА ЦАГ ХҮҮХЭД (TIMELINE KNOT) --- */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 flex flex-col items-center justify-start z-30">
                    {/* Хөдөлгөөнтэй гэрэлтэх алтан дугуй цэг */}
                    <motion.div
                      className="w-3 h-3 rounded-full bg-[#C9A227] shadow-[0_0_10px_#C9A227] border-2 border-[#1B2A4A] mt-8"
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />

                    {/* 
                      ЗАСАЛТ: Цагийг цэгтэй нь давхцуулахгүйн тулд цэгийн ЯГ ДЭЭР НЬ 
                      тусдаа нарийн гоёмсог хайрцагтай байрлуулж өгөв.
                    */}
                    <div className="absolute -top-3 whitespace-nowrap bg-[#142038] px-3 py-1 border border-[#C9A227]/30 rounded text-xs sm:text-sm font-medium text-[#C9A227] tracking-wider shadow-md">
                      {event.time}
                    </div>
                  </div>

                  {/* --- ЗҮҮН / БАРУУН ТАЛД СӨӨЛЖИХ ХӨТӨЛБӨРИЙН ХАЙРЦАГ --- */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`w-full md:w-[46%] pl-12 md:pl-0 ${
                      isEven ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    {/* Үндсэн контент хайрцаг */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#142038]/50 border border-white/5 shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:border-[#C9A227]/20 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center sm:items-start text-left">
                      {/* Слайд зургийн хэсэг - Responsive хэмжээтэй */}
                      <div className="w-full sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 h-36 rounded-xl overflow-hidden bg-black/10 border border-white/10 shadow-md">
                        <img
                          src={event.img}
                          alt={event.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Текст мэдээллийн блок */}
                      <div className="flex-1">
                        <h3 className="font-serif-luxury text-lg sm:text-xl font-medium text-[#F6F1EA] tracking-wide mb-2">
                          {lang === 'mn' ? event.titleMn : event.titleEn}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-[#F6F1EA]/70 font-light font-sans">
                          {lang === 'mn' ? event.descMn : event.descEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Эсрэг талын хоосон зайг тэнцвэржүүлэх Desktop блок */}
                  <div className="hidden md:block w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
