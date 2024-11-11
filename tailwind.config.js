/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#000000',
          alt: '#121212',
        },
        mid: '#1a1a1a',
        accent: {
          DEFAULT: '#1a1a1a',
          dark: '#0a0a0a',
          light: '#2a2a2a',
        },
        border: {
          DEFAULT: '#333333',
          hover: '#404040',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};