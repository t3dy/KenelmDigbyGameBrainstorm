/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#f4f1ea',
          DEFAULT: '#e8e4d9',
          dark: '#dcd7c9',
        },
        ink: {
          light: '#3a3a3a',
          DEFAULT: '#1a1a1a',
          dark: '#0a0a0a',
        },
        gold: {
          light: '#efbf04',
          DEFAULT: '#d4af37',
          dark: '#9a7e1a',
        },
        azure: {
          light: '#3b82f6',
          DEFAULT: '#1d4ed8',
          dark: '#1e3a8a',
        }
      },
      fontFamily: {
        serif: ['"IM Fell English"', 'serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      backgroundImage: {
        'marginalia-texture': "url('/media/texture_paper.png')",
      }
    },
  },
  plugins: [],
}
