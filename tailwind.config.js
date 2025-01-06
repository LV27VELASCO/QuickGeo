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
        blueTurqui:"#1A1E60",
        whiteTransparent:"rgb(245, 246, 255,0.1)",
      },
      animation:{
        'show-after-delay':'show 0.5s ease-in-out 3s forwards'
      },
      keyframes:{
        show:{
          '0%':{display:'none',opacity:'0'},
          '1%':{display:'block',opacity:'0'},
          '100%':{opacity:'1'}
        }
      }
    },
  },
  plugins: [],
}

