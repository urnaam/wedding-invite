// ── EDIT THIS FILE to customize your wedding details ──────────────────────
// Everything on the site (countdown, calendar link, map, dress code text)
// is driven from here so you don't need to touch component code.

export const wedding = {
  coupleNames: {
    mn: 'Урангуа & Оливер',
    en: 'Urangua & Olivier',
    fr: 'Urangua & Olivier',
    de: 'Urangua & Olivier',
    nl: 'Urangua & Olivier',
    yue: '艺华 & 李荣',
  },

  // Latin initials for the decorative script-font monogram (the curtain seal, etc.)
  // Great_Vibes / most script fonts only support Latin glyphs, so keep this Latin
  // regardless of site language.
  monogram: {
    mn: 'У&О',
    en: 'U&O',
    fr: 'U&O',
    de: 'U&O',
    nl: 'U&O',
    yue: '艺&李',
  },

  // ISO datetime, local time of the venue. Change this to your real date/time.
  dateTimeISO: '2027-10-12T12:00:00+02:00',
  durationHours: 5, // used for the Google Calendar "end time"

  venue: {
    name: 'Château Du Mont Martin - Normandie',
    address: '8 Rue du Mont Martin, 27600 Gaillon, France',
    lat: 48.8566,
    lng: 2.3522,
    // Google Maps embed needs no API key — just the address, URL-encoded below.
    // Put your own venue photos in public/venue/ and list them here for the carousel.
    photos: ['/venue/1.jpg', '/venue/2.jpg', '/venue/3.jpg'],
  },

  // Dress code copy now lives in src/i18n/translations.ts (per language) so it
  // switches along with the rest of the site.

  music: {
    // Put your own royalty-cleared mp3 at public/music.mp3
    src: '/music.mp3',
    title: 'Our Song',
  },

  dressCode: {
    women:
      'Урт, шингэн даавуутай, харанхуй хөх/бордо/алт өнгийн даашинз санал болгож байна. Хурц улаан, цагаан өнгөнөөс зайлсхий.',
    men: 'Харанхуй хөх костюм, бордо эсвэл алт өнгийн зангиа/бабочка сайхан зохицоно. Цагаан цамц, хүрэн/хар гутал.',
  },

  story: [
    {
      date: '2019',
      title: 'Анх танилцсан',
      text: 'Найзынхаа төрсөн өдрөөр анх уулзсан.',
      image: '/story/1.jpg',
    },
    {
      date: '2021',
      title: 'Хамтдаа амьдарч эхэлсэн',
      text: 'Эхний байраа хамтдаа сонгосон.',
      image: '/story/2.jpg',
    },
    {
      date: '2026',
      title: 'Гуйлт',
      text: 'Тэнгэралдсан үдэш, далайн эрэг дээр.',
      image: '/story/3.jpg',
    },
    {
      date: '2027',
      title: 'Хуримын өдөр',
      text: 'Одоо ээж, ааваа бид хамт байх болно.',
      image: '/story/4.jpg',
    },
  ],

  schedule: [
    { time: '14:30', title: 'Зочид ирж эхэлнэ' },
    { time: '15:00', title: 'Ёслолын хурим' },
    { time: '16:00', title: 'Коктейль цаг, зураг авалт' },
    { time: '18:00', title: 'Оройн зоог, бүжиг' },
    { time: '23:00', title: 'Баяр ёслол өндөрлөнө' },
  ],

  faq: [
    {
      q: 'Хүүхэдтэй ирж болох уу?',
      a: 'Мэдээж! RSVP дээр хүүхдээ мөн бүртгүүлнэ үү.',
    },
    { q: 'Зогсоол байгаа юу?', a: 'Тийм, венюн дээр үнэгүй зогсоол бий.' },
    {
      q: 'Бэлэг авчрах шаардлагатай юу?',
      a: 'Таны ирц бидэнд хамгийн том бэлэг. Хэрэв хүсвэл дэлгэрэнгүйг гэрийн хүмүүсээс лавлаарай.',
    },
    {
      q: 'Гэрэл зурагчинтай уулзаж болох уу?',
      a: 'Тийм ээ, хуримын өдөр мэргэжлийн зурагчин ажиллана.',
    },
  ],

  travel: [
    {
      title: 'Буудал',
      summary: 'Венюгийн ойролцоох санал болгож буй буудлууд',
      detail:
        'Hôtel de Exemple (алхаж болно), Ibis Styles (10 мин авто), Airbnb сонголтууд ч бас гарч ирдэг тул эрт захиалаарай.',
    },
    {
      title: 'Онгоцны буудал',
      summary: 'Хамгийн ойрхон нисэх онгоцны буудал',
      detail:
        'Charles de Gaulle (CDG) — венюгээс ~45 минут. Orly (ORY) — ~35 минут.',
    },
    {
      title: 'Зогсоол & чиглэл',
      summary: 'Хэрхэн ирэх, хаана зогсоох',
      detail:
        'Венюн дээр үнэгүй зогсоол бий. Google Maps дээрх чиглэлийг дээрх товчоор ашиглана уу.',
    },
  ],

  colors: {
    navy: '#1B2A4A',
    navyLight: '#2E4272',
    burgundy: '#6E1F2E',
    satinGold: '#D4AF37',
    ivory: '#F6F1EA',
    gold: '#C9A227',
  },
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.address,
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.address,
)}`;

function toGCalDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, '');
}

export function googleCalendarUrl() {
  const start = new Date(wedding.dateTimeISO);
  const end = new Date(
    start.getTime() + wedding.durationHours * 60 * 60 * 1000,
  );
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${wedding.coupleNames.en} — Wedding`,
    dates: `${toGCalDate(start.toISOString())}/${toGCalDate(end.toISOString())}`,
    location: wedding.venue.address,
    details: "We can't wait to celebrate with you!",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
