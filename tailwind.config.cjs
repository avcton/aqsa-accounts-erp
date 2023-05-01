/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        COALevel1: '#a9dde8',
        COALevel2: '#FCC29A',
        COALevel3: '#FDE9C9',
        SubmitPDF: '#374151',
        SubmitPDFHover: '#1F2937',
        CancelExcel: '#661F1F',
        CancelExcelHover: '#4C1414'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
