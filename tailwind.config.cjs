/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        COALevel1: '#334155',
        COALevel2: '#71717A',
        COALevel3: '#525252'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
