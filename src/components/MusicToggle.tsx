"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";

export type MusicHandle = { play: () => void };

// Floating toggle. Browsers block autoplay-with-sound until a user gesture,
// so call `play()` (via ref) from the Envelope's onOpen click handler.
const MusicToggle = forwardRef<MusicHandle>((_props, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    },
  }));

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src={wedding.music.src} loop preload="none" />
      <motion.button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-navy/80 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={playing ? "Хөгжим зогсоох" : "Хөгжим тоглуулах"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <motion.span
          className="block h-3 w-3 rounded-full bg-gold"
          animate={playing ? { scale: [1, 1.6, 1] } : { scale: 1 }}
          transition={{ duration: 1.2, repeat: playing ? Infinity : 0 }}
        />
      </motion.button>
    </>
  );
});

MusicToggle.displayName = "MusicToggle";
export default MusicToggle;
