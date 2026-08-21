'use client';

import { useEffect, useRef, useState } from 'react';
import Curtain from '@/components/Curtain';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import LocationSection from '@/components/LocationSection';
import DressCode from '@/components/DressCode';
import LoveStory from '@/components/LoveStory';
import ScheduleSection from '@/components/ScheduleSection';
import RsvpForm from '@/components/RsvpForm';
import { useLanguage } from '@/i18n/LanguageContext';
import GiftSection from '@/components/GiftSection';
import { Lang } from '@/i18n/translations';

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-12 text-center text-xs uppercase tracking-[0.3em] text-ivory/40">
      {t('footerThanks')}
    </footer>
  );
}

interface SiteExperienceProps {
  slug?: string;
  initialLang?: string;
}

export default function SiteExperience({
  slug,
  initialLang,
}: SiteExperienceProps) {
  const { suggestLang } = useLanguage();

  useEffect(() => {
    if (initialLang && suggestLang) {
      suggestLang(initialLang as Lang);
    }
  }, [initialLang, suggestLang]);

  return (
    <Curtain>
      <main className="bg-navy">
        <Hero />
        <Countdown />
        {/* <ScheduleSection /> */}
        <LoveStory />
        <LocationSection />
        <DressCode />
        <GiftSection />
        {slug && (
          <section className="px-6 py-24">
            <RsvpForm slug={slug} />
          </section>
        )}
        <Footer />
      </main>
      {/* <MusicToggle ref={musicRef} /> */}
    </Curtain>
  );
}
