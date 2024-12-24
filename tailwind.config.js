/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        purpura:"#454EFC",
        indigox:"rgb(245, 246, 255)",
        basex:"#525587",
        blackLow:"#00054F",
        blueTurqui:"#1A1E60"
      }
    },
  },
  plugins: [],
}

