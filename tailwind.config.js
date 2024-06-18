/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primery:'#d4324e',
        secondry:'#038b8b',
        "secondry-hover":'#026c6c',
        neutral:'#323232'
      }
    },
  },
  plugins: [],
};
