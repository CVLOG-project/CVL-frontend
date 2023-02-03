/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      bgWhite: '#f1f5f9',
      ftWhite: '#e5e7eb',
      cardFtBlack: '#27272a',
      ftBlick: '#171717',
      ftBlue: '#2563eb',
    },
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
};
