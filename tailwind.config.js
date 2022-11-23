/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['text-**', 'bg-**-**', 'md:pt-4'],
  theme: {
    extend: {},
  },
  plugins: [],
};
