import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Jost,
  Great_Vibes,
  Montserrat,
  Uncial_Antiqua,
} from 'next/font/google';
import { LanguageProvider } from '@/i18n/LanguageContext';

import '@/app/globals.css'; // Таны төслийн глобал CSS стиль энд дуудагдана

// 1. Дагалдах бичвэр, туслах гарчиг (Классик Serif сонголт)
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
});
// 2. Үндсэн жижиг бичвэр, заавар (Минималист Sans-serif сонголт)

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500'],
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-greatVibes',
});
// 3. Лаван тамганы голд орох монограмд (Тансаг хааны хэв маяг)
const unicalAntiqua = Uncial_Antiqua({
  subsets: ['latin'],
  variable: '--font-unical-antiqua',
  weight: ['400'],
});
// 4. Төслийн үндсэн биеийн текст (Шулуун, уншихад хялбар геометрийн фонт)
const body = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

// 5. Хос нэрс болон гар бичмэл хэсгүүдэд (Романтик уран бичлэг)
const script = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
});
export const metadata: Metadata = {
  title: 'Wedding invitation',
  description: 'Wedding invitation & RSVP',
  icons: {
    icon: '/ring.avif', // Default fallback icon
    shortcut: '/ring.avif',
    apple: '/ring.avif', // Apple touch icon for mobile home screens
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mn"
      /*
        ЗАСАЛТ: Бүх 5 фонтын CSS `--font-...` хувьсагчуудыг html тагны className
        дээр нэг бүрчлэн маш цэвэрхэн холбож өгөв. Ингэснээр Tailwind эдгээрийг
        таны төслийн хаанаас ч шууд олж унших боломжтой болно.
      */
      className={`
        ${montserrat.variable}
        ${greatVibes.variable}
        ${unicalAntiqua.variable}
        ${display.variable}
        ${body.variable}
        ${script.variable}
      `}
    >
      <body className="font-body antialiased bg-[#1B2A4A] text-[#F6F1EA]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
