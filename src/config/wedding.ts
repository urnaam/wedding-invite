// ── EDIT THIS FILE to customize your wedding details ──────────────────────
// Everything on the site (countdown, calendar link, map, dress code text)
// is driven from here so you don't need to touch component code.

export const wedding = {
  coupleNames: { mn: "Урнаа & Хайртай", en: "Urnaa & Partner" },

  // ISO datetime, local time of the venue. Change this to your real date/time.
  dateTimeISO: "2027-06-12T15:00:00+02:00",
  durationHours: 5, // used for the Google Calendar "end time"

  venue: {
    name: "Château de Exemple",
    address: "1 Rue de la Cérémonie, 75000 Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    // Google Maps embed needs no API key — just the address, URL-encoded below.
  },

  dressCode: {
    mn: "Хатуу дүрэм байхгүй ч, өнгөний палитраа баримжаалж хувцасаа сонговол баярлана: харанхуй хөх (navy), бордо (burgundy), алт (gold). Цагаан өнгийг өмсхийг хүсэхгүй байна.",
    en: "No strict dress code, but we'd love it if you leaned into our palette: navy, burgundy, and gold. Please avoid white.",
  },

  music: {
    // Put your own royalty-cleared mp3 at public/music.mp3
    src: "/music.mp3",
    title: "Our Song",
  },

  colors: {
    navy: "#1B2A4A",
    navyLight: "#2E4272",
    burgundy: "#6E1F2E",
    sage: "#7C8B7A",
    ivory: "#F6F1EA",
    gold: "#C9A227",
  },
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.address
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.address
)}`;

function toGCalDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function googleCalendarUrl() {
  const start = new Date(wedding.dateTimeISO);
  const end = new Date(start.getTime() + wedding.durationHours * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.coupleNames.en} — Wedding`,
    dates: `${toGCalDate(start.toISOString())}/${toGCalDate(end.toISOString())}`,
    location: wedding.venue.address,
    details: "We can't wait to celebrate with you!",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
