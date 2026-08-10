"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Result = { slug: string; displayName: string };

export default function FindInvite() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/guests/search?q=${encodeURIComponent(query)}`);
      if (res.ok) setResults(await res.json());
    }, 300);
  }, [query]);

  return (
    <section className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-gold">
        <span>RSVP</span>
      </p>
      <h2 className="mt-4 font-display text-4xl italic text-ivory">
        Өөрийн урилгыг олоорой
      </h2>
      <p className="mt-3 text-sm text-ivory/70">
        Нэрээ бичээд ирц баталгаажуулна уу.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Таны нэр..."
        className="mt-6 w-full rounded-full border border-gold/40 bg-transparent px-5 py-3 text-center text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
        aria-label="Нэрээ хайх"
      />

      <AnimatePresence>
        {results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-2xl border border-gold/30"
          >
            {results.map((r) => (
              <li key={r.slug}>
                <button
                  onClick={() => router.push(`/rsvp/${r.slug}`)}
                  className="block w-full px-5 py-3 text-left text-ivory hover:bg-gold/10"
                >
                  {r.displayName}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
