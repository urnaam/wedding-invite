"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";

const date = new Date(wedding.dateTimeISO);
const formatted = date.toLocaleDateString("mn-MN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-burgundy/20 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="divider-flourish w-64 font-body text-xs uppercase tracking-[0.35em] text-gold"
      >
        <span>Бид хуримаа тэмдэглэнэ</span>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="mt-6 font-display text-6xl italic leading-tight text-ivory sm:text-8xl"
      >
        {wedding.coupleNames.mn}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 font-display text-2xl text-ivory/90"
      >
        {formatted}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-4 h-16 w-px bg-gold/50"
      />
    </section>
  );
}
