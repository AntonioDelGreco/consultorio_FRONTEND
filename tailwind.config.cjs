/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      turqueza:'#00ABB3',
      grisOscuro:'#3C4048',
      grisClaro:'#B2B2B2',
      casiBlanco:'#EAEAEA',
      blanco:'#FFFFFF',
      negro:'#000000'
    },
    extend: {},
  },
  plugins: [],
}