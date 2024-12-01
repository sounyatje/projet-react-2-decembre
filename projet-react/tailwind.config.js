/** @type {import('tailwindcss').Config} */
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
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'), // Utilisation correcte du plugin
  ],
};


