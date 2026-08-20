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

        if (data.language) {
          // Таны i18n системд changeLanguage эсвэл suggestLang байгаа бол дуудна
          if (suggestLang) {
            suggestLang(data.language as Lang);
          }
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
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-10 h-10 border-2 border-[#C9A227] border-t-transparent rounded-full mb-4"
        />
        <p className="text-center font-sans text-sm tracking-widest text-[#F6F1EA]/60 animate-pulse">
          {t('loading')}
        </p>
      </div>
    );
  }

  if (notFound || !guest) {
    return (
      <div className="mx-auto max-w-md text-center py-20 px-6 border border-[#C9A227]/20 rounded-2xl bg-[#142038]/30">
        <span className="text-3xl block mb-3">✉️</span>
        <p className="font-sans text-sm tracking-wide text-[#F6F1EA]/70">
          {t('notFound')}
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-md text-center py-12 px-6 border-2 border-[#C9A227]/30 bg-[#142038]/60 rounded-2xl shadow-2xl relative"
      >
        <div className="absolute inset-1 border border-[#C9A227]/10 rounded-xl pointer-events-none" />
        <span className="text-5xl block mb-4 text-[#C9A227] animate-bounce">
          ✨
        </span>
        <h2 className="font-display text-4xl italic text-[#F6F1EA] tracking-wide">
          {t('thankYouTitle')}
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-[#F6F1EA]/80 max-w-xs mx-auto">
          {choice === 'attending'
            ? t('thankYouAttending')
            : t('thankYouNotAttending')}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-lg text-center bg-[#142038]/40 border border-[#C9A227]/20 p-6 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm relative">
      {/* Нарийн тансаг дотоод алтан шугам */}
      <div className="absolute inset-1.5 border border-[#C9A227]/10 rounded-xl pointer-events-none" />

      <p className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-[#C9A227]">
        <span>{t('inviteLabel')}</span>
      </p>
      <h1 className="mt-3 font-display text-4xl italic text-[#F6F1EA] sm:text-5xl tracking-wide">
        {guest.displayName}
      </h1>
      <p className="mt-3 font-sans text-xs tracking-widest text-[#F6F1EA]/60 uppercase">
        {t('confirmPrompt')}
      </p>

      {/* ШИНЭЧЛЭГДСЭН ИНТЕРАКТИВ СОНГОЛТЫН ТОВЧЛУУРУУД (ЗӨӨЛӨН ХӨДӨЛГӨӨНТЭЙ) */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <motion.button
          onClick={() => setChoice('attending')}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`rounded-xl py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
            choice === 'attending'
              ? 'bg-[#C9A227] text-[#1B2A4A] border border-transparent shadow-[#C9A227]/20 shadow-lg'
              : 'border border-[#C9A227]/30 text-[#F6F1EA] hover:bg-[#C9A227]/10 bg-[#121d33]/50'
          }`}
        >
          <span>✨</span> {t('attendingBtn')}
        </motion.button>
        <motion.button
          onClick={() => setChoice('not_attending')}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`rounded-xl py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
            choice === 'not_attending'
              ? 'bg-[#a32638] text-[#F6F1EA] border border-transparent shadow-[#a32638]/20 shadow-lg'
              : 'border border-[#C9A227]/30 text-[#F6F1EA] hover:bg-[#C9A227]/10 bg-[#121d33]/50'
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
            className="mt-8 text-left space-y-6"
          >
            {/* ГИШҮҮДИЙН НЭРСИЙГ СОНГОХ ХЭСЭГ (ИНТЕРАКТИВ КАРТУУД) */}
            <div>
              <p className="mb-3 text-center text-[10px] uppercase tracking-[0.25em] text-[#F6F1EA]/50 font-light">
                {t('whoComing')}
              </p>
              <ul className="grid grid-cols-1 gap-2.5">
                {members.map((m) => (
                  <motion.li
                    key={m.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <label
                      className={`flex items-center justify-between rounded-xl border px-4 py-3.5 cursor-pointer transition-all duration-300 ${
                        m.attending
                          ? 'border-[#C9A227] bg-[#C9A227]/5 shadow-sm shadow-[#C9A227]/5'
                          : 'border-white/10 bg-[#121d33]/30 hover:border-white/20'
                      }`}
                    >
                      <span
                        className={`text-sm font-medium tracking-wide transition-colors ${m.attending ? 'text-[#C9A227]' : 'text-[#F6F1EA]/90'}`}
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
                          className="sr-only" // Нууц checkbox (Тансаг custom загвар гаргах зорилготой)
                        />
                        {/* Алтан чагт бүхий тансаг Custom Checkbox дүрслэл */}
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            m.attending
                              ? 'bg-[#C9A227] border-[#C9A227]'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {m.attending && (
                            <svg
                              className="w-3 h-3 text-[#1B2A4A] stroke-current fill-none stroke-[2.5]"
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
            {/* ХОOЛНЫ ХАРШИЛ БА АНХААРАХ ЗҮЙЛС */}
            <div className="bg-[#121d33]/40 border border-white/5 p-4 rounded-xl space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A227] font-medium flex items-center gap-1.5">
                <span>🍽️</span> {t('dietaryNotes')}
              </p>
              <textarea
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                rows={3}
                placeholder={t('dietaryPlaceholder')}
                className="w-full rounded-lg border border-white/10 bg-[#121d33]/50 px-3 py-2.5 text-[#F6F1EA] placeholder:text-[#F6F1EA]/20 focus:border-[#C9A227] focus:outline-none text-xs sm:text-sm leading-relaxed transition-colors resize-none"
              />
            </div>
            {/* УНАА ТЭВЭР БА ЛОЖИСТИК КАРТ */}
            <div className="flex flex-col gap-3">
              {/* Асуултын гарчиг */}
              <label className="text-xs sm:text-sm font-medium tracking-wide text-[#F6F1EA] flex items-center gap-2">
                <span>🧭</span> {t('transportQuestion')}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {/* 1. Машинаар ирэх сонголт */}
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                    whichTransport === 'car'
                      ? 'border-[#C9A227] bg-[#C9A227]/10'
                      : 'border-white/10 bg-[#121d33]/40 hover:border-white/20'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all"
                    style={{
                      borderColor:
                        whichTransport === 'car'
                          ? '#C9A227'
                          : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {whichTransport === 'car' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C9A227]" />
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
                    <span className="text-base">🚗</span>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        whichTransport === 'car'
                          ? 'text-[#C9A227]'
                          : 'text-[#F6F1EA]'
                      }`}
                    >
                      {t('byCar')}
                    </span>
                  </div>
                </motion.label>

                {/* 2. Галт тэрэгний унаагаар ирэх сонголт */}
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-center gap-3.5 rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                    whichTransport === 'train'
                      ? 'border-[#C9A227] bg-[#C9A227]/10'
                      : 'border-white/10 bg-[#121d33]/40 hover:border-white/20'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all"
                    style={{
                      borderColor:
                        whichTransport === 'train'
                          ? '#C9A227'
                          : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {whichTransport === 'train' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C9A227]" />
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
                    <span className="text-base">🚆</span>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        whichTransport === 'train'
                          ? 'text-[#C9A227]'
                          : 'text-[#F6F1EA]'
                      }`}
                    >
                      {t('byTrain')}
                    </span>
                  </div>
                </motion.label>
              </div>
            </div>
            {/* 🏰 БАЙРЛАХ / ХОНОХ ГАЗРЫН АСУУЛГА КАРТ */}
            <motion.label
              whileHover={{ scale: 1.01 }}
              className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all duration-300 ${wantsAccommodation ? 'border-[#C9A227] bg-[#C9A227]/5' : 'border-white/5 bg-[#121d33]/40 hover:border-white/10'}`}
            >
              {/* Custom Тансаг Чекбокс */}
              <div
                className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all"
                style={{
                  backgroundColor: wantsAccommodation
                    ? '#C9A227'
                    : 'transparent',
                  borderColor: wantsAccommodation
                    ? '#C9A227'
                    : 'rgba(255,255,255,0.3)',
                }}
              >
                {wantsAccommodation && (
                  <svg
                    className="w-3 h-3 text-[#1B2A4A] stroke-current fill-none stroke-[2.5]"
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

              {/* Текст болон Дэд тайлбар бичвэрүүд */}
              <div className="flex flex-col select-none text-left">
                <span
                  className={`text-xs sm:text-sm font-medium tracking-wide flex items-center gap-1.5 ${wantsAccommodation ? 'text-[#C9A227]' : 'text-[#F6F1EA]'}`}
                >
                  <span>🏰</span> {t('accommodationTitle')}
                </span>
                <span className="text-[11px] text-[#F6F1EA]/50 mt-1 font-light leading-normal">
                  {t('accommodationDesc')}
                </span>
              </div>
            </motion.label>
            {/* ҮГ ХЭЛЭХ / ТОСТ ДЭВШҮҮЛЭХ КАРТ */}
            <motion.label
              whileHover={{ scale: 1.01 }}
              className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all duration-300 ${wantsToSpeak ? 'border-[#C9A227] bg-[#C9A227]/5' : 'border-white/5 bg-[#121d33]/40 hover:border-white/10'}`}
            >
              <div
                className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all"
                style={{
                  backgroundColor: wantsToSpeak ? '#C9A227' : 'transparent',
                  borderColor: wantsToSpeak
                    ? '#C9A227'
                    : 'rgba(255,255,255,0.3)',
                }}
              >
                {wantsToSpeak && (
                  <svg
                    className="w-3 h-3 text-[#1B2A4A] stroke-current fill-none stroke-[2.5]"
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
              <div className="flex flex-col select-none">
                <span
                  className={`text-xs sm:text-sm font-medium tracking-wide flex items-center gap-1.5 ${wantsToSpeak ? 'text-[#C9A227]' : 'text-[#F6F1EA]'}`}
                >
                  <span>🎤</span> {t('speechTitle')}
                </span>
                <span className="text-[11px] text-[#F6F1EA]/50 mt-1 font-light leading-normal">
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
            className="mt-8 text-left"
          >
            <p className="mb-2.5 text-center text-[10px] uppercase tracking-[0.2em] text-[#F6F1EA]/50 font-light">
              {t('wishPrompt')}
            </p>
            <div className="bg-[#121d33]/40 border border-white/5 p-4 rounded-xl">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder={t('messagePlaceholder')}
                className="w-full rounded-lg border border-white/10 bg-[#121d33]/50 px-4 py-3 text-[#F6F1EA] placeholder:text-[#F6F1EA]/30 focus:border-[#C9A227] focus:outline-none text-sm leading-relaxed transition-colors resize-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {choice && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.button
            onClick={submit}
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-8 w-full rounded-full bg-[#C9A227] py-3.5 text-sm uppercase tracking-[0.15em] text-[#1B2A4A] font-semibold transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-[#1B2A4A] border-t-transparent rounded-full animate-spin" />
            ) : (
              t('submit')
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
