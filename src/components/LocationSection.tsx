"use client";

import { motion } from "framer-motion";
import { wedding, mapsEmbedUrl, mapsDirectionsUrl } from "@/config/wedding";

export default function LocationSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-gold"
      >
        <span>Хаана</span>
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-4 text-center font-display text-4xl italic text-ivory"
      >
        {wedding.venue.name}
      </motion.h2>
      <p className="mt-2 text-center text-sm text-ivory/70">{wedding.venue.address}</p>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-8 overflow-hidden rounded-2xl border border-gold/30"
      >
        <iframe
          title="Venue map"
          src={mapsEmbedUrl}
          width="100%"
          height="360"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>

      <div className="mt-6 flex justify-center">
        <a
          href={mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gold/60 px-6 py-3 text-sm uppercase tracking-[0.15em] text-ivory transition-colors hover:bg-gold hover:text-navy"
        >
          Чиглэл авах
        </a>
      </div>
    </section>
  );
}
