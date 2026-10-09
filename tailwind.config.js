/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', 'sans-serif'],
        heading: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      screens: {
        'xs': '420px',
      },
      colors: {
        brand: {
          dark: '#080C14',
          surface: '#0F1626',
          panel: '#131B2E',
          border: '#1E293B',
          accent: '#8B1E2F',
          neon: '#10B981',
          gold: '#F59E0B',
          blue: '#3B82F6',
        }
      }
    },
  },
  plugins: [],
}

