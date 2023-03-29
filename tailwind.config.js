/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      bgWhite: '#f1f5f9',
      ftWhite: '#e5e7eb',
      cardFtBlack: '#27272a',
      ftBlick: '#171717',
      ftBlue: '#2657A6',
    },
    extend: {
      keyframes: {
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: 0,
          },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        down: {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        right: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        spin: 'spin 3s linear infinite ',
        down: 'down 0.4s linear ',
        right: 'right 0.6s linear ',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
};
