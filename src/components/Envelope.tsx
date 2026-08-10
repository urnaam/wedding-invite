"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/config/wedding";

// Signature moment: the site opens as a wax-sealed envelope.
// Tapping the seal "breaks" it and the invitation unfolds underneath.
// This also doubles as the required user gesture that unlocks audio autoplay.
export default function Envelope({
  onOpen,
  children,
}: {
  onOpen: () => void;
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);

  function handleOpen() {
    setOpened(true);
    onOpen();
  }

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy"
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.4 } }}
          >
            <motion.button
              onClick={handleOpen}
              className="group relative flex h-28 w-28 items-center justify-center rounded-full border border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              aria-label="Урилгыг нээх"
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-burgundy"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative font-display text-3xl italic text-ivory">
                {wedding.coupleNames.mn.split(" ")[0][0]}
                {wedding.coupleNames.mn.split(" ").slice(-1)[0][0]}
              </span>
            </motion.button>
            <motion.p
              className="mt-6 font-body text-xs uppercase tracking-[0.3em] text-ivory/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Дардаг тамгыг товшиж нээнэ үү
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
