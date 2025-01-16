/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import scrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FF6700',
        lightGray: '#EBEBEB',
        gray: '#C0C0C0',
        blueLight: '#3A6EA5',
        blueDark: '#004E8F',
        orangeHover: "#E65500", 
      },

      fontFamily: {
        sporty: ['sporty', 'sans-serif'],
      },
    },
  },
  plugins: [
    forms,
    scrollbar, 
  ],
};
