"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Member = { id: string; name: string; attending: boolean };
type Guest = {
  slug: string;
  displayName: string;
  status: string;
  members: Member[];
};

export default function RsvpForm({ slug }: { slug: string }) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [choice, setChoice] = useState<"attending" | "not_attending" | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/guests/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data: Guest) => {
        setGuest(data);
        setMembers(data.members);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  function toggleMember(id: string) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, attending: !m.attending } : m))
    );
  }

  async function submit() {
    if (!guest || !choice) return;
    setSubmitting(true);
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: guest.slug,
        attending: choice === "attending",
        members,
        message: message || null,
      }),
    });
    setSubmitting(false);
    if (res.ok) setSubmitted(true);
  }

  if (loading) {
    return <p className="text-center text-ivory/70">Түр хүлээнэ үү...</p>;
  }

  if (notFound || !guest) {
    return (
      <p className="text-center text-ivory/70">
        Уучлаарай, урилга олдсонгүй. Танд илгээсэн холбоосоор дахин орж үзнэ үү.
      </p>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md text-center"
      >
        <h2 className="font-display text-4xl italic text-ivory">Баярлалаа!</h2>
        <p className="mt-4 text-ivory/80">
          {choice === "attending"
            ? "Таны хариултыг хүлээн авлаа. Хуримын өдөр уулзацгаая!"
            : "Таны сайхан хүслийг хүлээн авлаа. Маш их баярлалаа."}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-md text-center">
      <p className="divider-flourish font-body text-xs uppercase tracking-[0.35em] text-gold">
        <span>Урилга</span>
      </p>
      <h1 className="mt-4 font-display text-4xl italic text-ivory">
        {guest.displayName}
      </h1>
      <p className="mt-3 text-sm text-ivory/70">Та ирэх эсэхээ бидэнд мэдэгдэнэ үү.</p>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setChoice("attending")}
          className={`rounded-full px-6 py-3 text-sm uppercase tracking-[0.15em] transition-colors ${
            choice === "attending"
              ? "bg-gold text-navy"
              : "border border-gold/50 text-ivory hover:bg-gold/10"
          }`}
        >
          Ирнэ
        </button>
        <button
          onClick={() => setChoice("not_attending")}
          className={`rounded-full px-6 py-3 text-sm uppercase tracking-[0.15em] transition-colors ${
            choice === "not_attending"
              ? "bg-burgundy text-ivory"
              : "border border-gold/50 text-ivory hover:bg-gold/10"
          }`}
        >
          Явахгүй
        </button>
      </div>

      <AnimatePresence mode="wait">
        {choice === "attending" && (
          <motion.div
            key="members"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 text-left"
          >
            <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-ivory/60">
              Хэн хэн нь ирэх вэ?
            </p>
            <ul className="space-y-2">
              {members.map((m) => (
                <li key={m.id}>
                  <label className="flex items-center justify-between rounded-xl border border-gold/20 px-4 py-3">
                    <span className="text-ivory">{m.name}</span>
                    <input
                      type="checkbox"
                      checked={m.attending}
                      onChange={() => toggleMember(m.id)}
                      className="h-5 w-5 accent-gold"
                    />
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {choice === "not_attending" && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 text-left"
          >
            <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-ivory/60">
              Сайн сайхан хүсэл илгээх үү?
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Танд амьдралын хамгийн сайхан мөчүүдийг хүсье..."
              className="w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {choice && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={submit}
          disabled={submitting}
          className="mt-8 w-full rounded-full bg-gold py-3 text-sm uppercase tracking-[0.15em] text-navy transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Илгээж байна..." : "Хариултаа илгээх"}
        </motion.button>
      )}
    </div>
  );
}
