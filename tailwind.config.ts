import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A4A',
        'navy-light': '#2E4272',
        burgundy: '#6E1F2E',
        sage: '#7C8B7A',
        ivory: '#F6F1EA',
        gold: '#C9A227',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-jost)', 'sans-serif'],
        display: ['var(--font-cormorant-garamond)', 'serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
        monogram: ['var(--font-unical-antiqua)', 'serif'],
      },
      keyframes: {
        bloom: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        bloom: 'bloom 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
