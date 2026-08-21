'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Lang } from '@/i18n/translations';

type Member = {
  id: string;
  name: string;
  attending: boolean;
  isChild?: boolean;
};

type Guest = {
  slug: string;
  displayName: string;
  status: string;
  language: string;
  members: Member[];
};

export default function RsvpForm({ slug }: { slug: string }) {
  const { t, lang, suggestLang } = useLanguage();

  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [choice, setChoice] = useState<'attending' | 'not_attending' | null>(
    null,
  );
  const [members, setMembers] = useState<Member[]>([]);

  const [message, setMessage] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [wantsAccommodation, setWantsAccommodation] = useState(false);
  const [wantsToSpeak, setWantsToSpeak] = useState(false);
  const [whichTransport, setWhichTransport] = useState<'car' | 'train' | null>(
    'car',
  );

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/guests/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((data: Guest) => {
        setGuest(data);
        setMembers(data.members);

        if (data.language && suggestLang) {
          suggestLang(data.language as Lang);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, suggestLang]);

  function toggleMember(id: string) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, attending: !m.attending } : m)),
    );
  }

  async function submit() {
    if (!guest || !choice) return;
    setSubmitting(true);

    let finalMessage = null;
    if (choice === 'not_attending') {
      finalMessage = message || null;
    } else if (choice === 'attending' && wantsToSpeak) {
      finalMessage =
        lang === 'mn'
          ? 'Зочин хуримын баярын үеэр үг хэлж, тост дэвшүүлэх хүсэлтэй байна.'
          : 'The guest wishes to give a speech or toast during the reception.';
    }

    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: guest.slug,
        attending: choice === 'attending',
        members,
        message: finalMessage,
        dietaryNotes: choice === 'attending' ? dietaryNotes || null : null,
        whichTransport: choice === 'attending' ? whichTransport || null : null,
        wantsAccommodation: choice === 'attending' ? wantsAccommodation : null,
      }),
    });
    setSubmitting(false);
    if (res.ok) setSubmitted(true);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-navy text-[#F6F1EA]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full mb-4"
        />
        <p className="text-center font-sans text-xs tracking-[0.2em] text-[#F6F1EA]/60 uppercase animate-pulse">
          {t('loading')}
        </p>
      </div>
    );
  }

  if (notFound || !guest) {
    return (
      <section className="relative w-full bg-navy text-[#F6F1EA] py-20 px-4 sm:px-6 overflow-hidden flex justify-center">
        <div className="mx-auto max-w-md text-center py-16 px-6 border border-[#D4AF37]/30 rounded-2xl bg-[#121D33]/60 shadow-2xl backdrop-blur-sm relative">
          <div className="absolute inset-1.5 border border-[#D4AF37]/15 rounded-xl pointer-events-none" />
          <span className="text-3xl block mb-3 text-[#D4AF37]">✉️</span>
          <p className="font-serif text-sm tracking-wide text-[#F6F1EA]/80">
            {t('notFound')}
          </p>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="relative w-full bg-navy text-[#F6F1EA] py-20 px-4 sm:px-6 overflow-hidden flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-md text-center py-12 px-8 border border-[#D4AF37]/30 bg-[#121D33]/60 rounded-2xl shadow-2xl relative backdrop-blur-sm"
        >
          <div className="absolute inset-1.5 border border-[#D4AF37]/15 rounded-xl pointer-events-none" />
          <span className="text-4xl block mb-4 text-[#D4AF37]">✨</span>
          <h2 className="font-serif italic text-3xl sm:text-4xl text-[#D4AF37] tracking-wider">
            {t('thankYouTitle')}
          </h2>
          <div className="flex items-center justify-center w-full max-w-[160px] mx-auto my-3 gap-3">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
            <span className="text-[#D4AF37]/70 text-xs font-serif">∞</span>
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
          </div>
          <p className="mt-4 font-sans text-xs sm:text-sm leading-relaxed text-[#F6F1EA]/80 max-w-xs mx-auto font-light">
            {choice === 'attending'
              ? t('thankYouAttending')
              : t('thankYouNotAttending')}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-navy text-[#F6F1EA] py-20 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center">
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

      <div className="w-full max-w-lg mx-auto relative z-20 text-center flex flex-col items-center">
        {/* ХЭСГИЙН ДЭЭД ГАРЧИГ БОЛОН ЦЭЦГЭН ХЭЭ */}
        <div className="flex flex-col items-center text-center mb-8">
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

          <p className="font-sans text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
            {t('inviteLabel')}
          </p>

          <h1 className="mt-2 font-serif italic text-3xl sm:text-5xl tracking-wider text-[#F6F1EA]">
            {guest.displayName}
          </h1>

          {/* ХЯЗГААРГҮЙН ТЭМДЭГТЭЙ ЗУРААС */}
          <div className="flex items-center justify-center w-full max-w-xs my-3 gap-4">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
            <span className="text-[#D4AF37]/70 text-base font-serif">∞</span>
            <div className="h-[1px] flex-1 bg-[#D4AF37]/30" />
          </div>

          <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#F6F1EA]/70 font-light">
            {t('confirmPrompt')}
          </p>
        </div>

        {/* ҮНДСЭН КАРТ ХОРИОЛТ */}
        <div className="relative w-full rounded-xl border border-[#D4AF37]/30 bg-[#121D33]/60 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          {/* Дотоод нарийн хүрээ шугам */}
          <div className="absolute inset-1.5 border border-[#D4AF37]/15 rounded-lg pointer-events-none" />

          {/* ИНТЕРАКТИВ СОНГОЛТЫН ТОВЧЛУУРУУД */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
            <motion.button
              onClick={() => setChoice('attending')}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl py-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                choice === 'attending'
                  ? 'bg-[#D4AF37] text-navy border border-transparent shadow-[#D4AF37]/20 shadow-lg'
                  : 'border border-[#D4AF37]/30 text-[#F6F1EA] hover:bg-[#D4AF37]/10 bg-[#121D33]/40'
              }`}
            >
              <span>✨</span> {t('attendingBtn')}
            </motion.button>
            <motion.button
              onClick={() => setChoice('not_attending')}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl py-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                choice === 'not_attending'
                  ? 'bg-[#a32638] text-[#F6F1EA] border border-transparent shadow-[#a32638]/20 shadow-lg'
                  : 'border border-[#D4AF37]/30 text-[#F6F1EA] hover:bg-[#D4AF37]/10 bg-[#121D33]/40'
              }`}
            >
              <span>✉️</span> {t('notAttendingBtn')}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {choice === 'attending' && (
              <motion.div
                key="members-flow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="mt-6 text-left space-y-5 relative z-10"
              >
                {/* ГИШҮҮДИЙН НЭРСИЙГ СОНГОХ ХЭСЭГ */}
                <div>
                  <p className="mb-2.5 text-center text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]/80 font-medium">
                    {t('whoComing')}
                  </p>
                  <ul className="grid grid-cols-1 gap-2">
                    {members.map((m) => (
                      <motion.li
                        key={m.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <label
                          className={`flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer transition-all duration-300 ${
                            m.attending
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-sm'
                              : 'border-white/10 bg-[#121D33]/30 hover:border-white/20'
                          }`}
                        >
                          <span
                            className={`text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                              m.attending
                                ? 'text-[#D4AF37]'
                                : 'text-[#F6F1EA]/90'
                            }`}
                          >
                            {m.name}
                            {m.isChild && (
                              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-normal tracking-normal text-[#F6F1EA]/60 align-middle">
                                {t('child')}
                              </span>
                            )}
                          </span>
                          <div className="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={m.attending}
                              onChange={() => toggleMember(m.id)}
                              className="sr-only"
                            />
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                m.attending
                                  ? 'bg-[#D4AF37] border-[#D4AF37]'
                                  : 'border-white/30 bg-transparent'
                              }`}
                            >
                              {m.attending && (
                                <svg
                                  className="w-3 h-3 text-navy stroke-current fill-none stroke-[2.5]"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        </label>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* ХООЛНЫ ХАРШИЛ БА АНХААРАХ ЗҮЙЛС */}
                <div className="bg-[#121D33]/40 border border-white/10 p-3.5 rounded-xl space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
                    <span>🍽️</span> {t('dietaryNotes')}
                  </p>
                  <textarea
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    rows={3}
                    placeholder={t('dietaryPlaceholder')}
                    className="w-full rounded-lg border border-white/10 bg-[#121D33]/60 px-3 py-2 text-[#F6F1EA] placeholder:text-[#F6F1EA]/30 focus:border-[#D4AF37] focus:outline-none text-xs sm:text-sm leading-relaxed transition-colors resize-none font-light"
                  />
                </div>

                {/* УНАА ТЭВЭР БА ЛОЖИСТИК КАРТ */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs sm:text-sm font-medium tracking-wide text-[#F6F1EA] flex items-center gap-2">
                    <span>🧭</span> {t('transportQuestion')}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Машинаар */}
                    <motion.label
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center gap-3 rounded-xl border p-3.5 cursor-pointer transition-all duration-300 ${
                        whichTransport === 'car'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                          : 'border-white/10 bg-[#121D33]/30 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all"
                        style={{
                          borderColor:
                            whichTransport === 'car'
                              ? '#D4AF37'
                              : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {whichTransport === 'car' && (
                          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="whichTransport"
                        value="car"
                        checked={whichTransport === 'car'}
                        onChange={() => setWhichTransport('car')}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2 select-none">
                        <span className="text-sm">🚗</span>
                        <span
                          className={`text-xs font-medium ${
                            whichTransport === 'car'
                              ? 'text-[#D4AF37]'
                              : 'text-[#F6F1EA]'
                          }`}
                        >
                          {t('byCar')}
                        </span>
                      </div>
                    </motion.label>

                    {/* Галт тэрэгээр */}
                    <motion.label
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center gap-3 rounded-xl border p-3.5 cursor-pointer transition-all duration-300 ${
                        whichTransport === 'train'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                          : 'border-white/10 bg-[#121D33]/30 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all"
                        style={{
                          borderColor:
                            whichTransport === 'train'
                              ? '#D4AF37'
                              : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {whichTransport === 'train' && (
                          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="whichTransport"
                        value="train"
                        checked={whichTransport === 'train'}
                        onChange={() => setWhichTransport('train')}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2 select-none">
                        <span className="text-sm">🚆</span>
                        <span
                          className={`text-xs font-medium ${
                            whichTransport === 'train'
                              ? 'text-[#D4AF37]'
                              : 'text-[#F6F1EA]'
                          }`}
                        >
                          {t('byTrain')}
                        </span>
                      </div>
                    </motion.label>
                  </div>
                </div>

                {/* БАЙРЛАХ / ХОНОХ ГАЗРЫН АСУУЛГА КАРТ */}
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-start gap-3.5 rounded-xl border p-3.5 cursor-pointer transition-all duration-300 ${
                    wantsAccommodation
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-white/10 bg-[#121D33]/30 hover:border-white/20'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all"
                    style={{
                      backgroundColor: wantsAccommodation
                        ? '#D4AF37'
                        : 'transparent',
                      borderColor: wantsAccommodation
                        ? '#D4AF37'
                        : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {wantsAccommodation && (
                      <svg
                        className="w-3 h-3 text-navy stroke-current fill-none stroke-[2.5]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={wantsAccommodation}
                    onChange={(e) => setWantsAccommodation(e.target.checked)}
                    className="sr-only"
                  />
                  <div className="flex flex-col select-none text-left">
                    <span
                      className={`text-xs sm:text-sm font-medium tracking-wide flex items-center gap-1.5 ${
                        wantsAccommodation ? 'text-[#D4AF37]' : 'text-[#F6F1EA]'
                      }`}
                    >
                      <span>🏰</span> {t('accommodationTitle')}
                    </span>
                    <span className="text-[11px] text-[#F6F1EA]/60 mt-0.5 font-light leading-normal">
                      {t('accommodationDesc')}
                    </span>
                  </div>
                </motion.label>

                {/* ҮГ ХЭЛЭХ / ТОСТ ДЭВШҮҮЛЭХ КАРТ */}
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-start gap-3.5 rounded-xl border p-3.5 cursor-pointer transition-all duration-300 ${
                    wantsToSpeak
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-white/10 bg-[#121D33]/30 hover:border-white/20'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all"
                    style={{
                      backgroundColor: wantsToSpeak ? '#D4AF37' : 'transparent',
                      borderColor: wantsToSpeak
                        ? '#D4AF37'
                        : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {wantsToSpeak && (
                      <svg
                        className="w-3 h-3 text-navy stroke-current fill-none stroke-[2.5]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={wantsToSpeak}
                    onChange={(e) => setWantsToSpeak(e.target.checked)}
                    className="sr-only"
                  />
                  <div className="flex flex-col select-none text-left">
                    <span
                      className={`text-xs sm:text-sm font-medium tracking-wide flex items-center gap-1.5 ${
                        wantsToSpeak ? 'text-[#D4AF37]' : 'text-[#F6F1EA]'
                      }`}
                    >
                      <span>🎤</span> {t('speechTitle')}
                    </span>
                    <span className="text-[11px] text-[#F6F1EA]/60 mt-0.5 font-light leading-normal">
                      {t('speechDesc')}
                    </span>
                  </div>
                </motion.label>
              </motion.div>
            )}

            {choice === 'not_attending' && (
              <motion.div
                key="message-flow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="mt-6 text-left relative z-10"
              >
                <p className="mb-2 text-center text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/80 font-medium">
                  {t('wishPrompt')}
                </p>
                <div className="bg-[#121D33]/40 border border-white/10 p-3.5 rounded-xl">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={t('messagePlaceholder')}
                    className="w-full rounded-lg border border-white/10 bg-[#121D33]/60 px-3 py-2.5 text-[#F6F1EA] placeholder:text-[#F6F1EA]/30 focus:border-[#D4AF37] focus:outline-none text-xs sm:text-sm leading-relaxed transition-colors resize-none font-light"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ИЛГЭЭХ ТОВЧЛУУР */}
          {choice && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative z-10 mt-6"
            >
              <motion.button
                onClick={submit}
                disabled={submitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full rounded-full bg-[#D4AF37] py-3.5 text-xs uppercase tracking-[0.2em] text-navy font-semibold transition-all hover:bg-[#e0be4d] disabled:opacity-50 cursor-pointer shadow-lg flex items-center justify-center"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                ) : (
                  t('submit')
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
