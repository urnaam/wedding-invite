'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { wedding, googleCalendarUrl } from '@/config/wedding';
import { useLanguage } from '@/i18n/LanguageContext';

function getRemaining() {
  const diff = new Date(wedding.dateTimeISO).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export default function Countdown() {
  const [t2, setT2] = useState(getRemaining());
  const { t } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => setT2(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number][] = [
    [t('days'), t2.days],
    [t('hours'), t2.hours],
    [t('minutes'), t2.minutes],
    [t('seconds'), t2.seconds],
  ];

  return (
    <section className="flex flex-col items-center px-6 py-24">
      {/* Илүү том, тансаг SAVE THE DATE хэсэг */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-10"
      >
        <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl tracking-[0.35em] uppercase text-gold font-medium">
          Save the Date
        </p>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mt-3" />
      </motion.div>

      {/* Хугацаа тоологч (Countdown) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-4 gap-4 sm:gap-8"
      >
        {units.map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-display text-4xl text-gold sm:text-6xl">
              {String(value).padStart(2, '0')}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ivory/70 sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Календарт нэмэх товч */}
      <motion.a
        href={googleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 rounded-full border border-gold/60 px-6 py-3 font-body text-sm uppercase tracking-[0.15em] text-ivory transition-colors hover:bg-gold hover:text-navy"
      >
        {t('addToCalendar')}
      </motion.a>
    </section>
  );
}
