"use client";

import { useRef } from "react";
import Envelope from "@/components/Envelope";
import MusicToggle, { MusicHandle } from "@/components/MusicToggle";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import LocationSection from "@/components/LocationSection";
import DressCode from "@/components/DressCode";
import FindInvite from "@/components/FindInvite";

export default function Home() {
  const musicRef = useRef<MusicHandle>(null);

  return (
    <Envelope onOpen={() => musicRef.current?.play()}>
      <main className="bg-navy">
        <Hero />
        <Countdown />
        <LocationSection />
        <DressCode />
        <FindInvite />
        <footer className="py-12 text-center text-xs uppercase tracking-[0.3em] text-ivory/40">
          Бидэнтэй хамт байгаад баярлалаа
        </footer>
      </main>
      <MusicToggle ref={musicRef} />
    </Envelope>
  );
}
