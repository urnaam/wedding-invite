"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";

const swatches = [
  wedding.colors.navy,
  wedding.colors.navyLight,
  wedding.colors.burgundy,
  wedding.colors.sage,
  wedding.colors.ivory,
];

export default function DressCode() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-gold">
        <span>Хувцасны өнгө</span>
      </p>
      <h2 className="mt-4 font-display text-4xl italic text-ivory">Dress Code</h2>

      <div className="mt-8 flex justify-center gap-3">
        {swatches.map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="h-10 w-10 rounded-full border border-white/20 sm:h-14 sm:w-14"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-ivory/80">
        {wedding.dressCode.mn}
      </p>
    </section>
  );
}
