import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0b',
        surface: '#18181b',
        border: '#27272a',
        primary: '#3b82f6',
        accent: '#10b981',
      },
    },
  },
  plugins: [],
};

export default config;
