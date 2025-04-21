/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        colorSubtitle:"#525587",
        green100:"#e2f8e0",
        green200:"#c6efc3",
        green300:"#97e194",
        green400:"#5cb239",
        green500:"#3caf38",
        green600:"#2c9029",
        green700:"#257223",
        back800:"#0a290b",
        slate:"#F1F5F9",
        dark:"#111827",
        bgSecundary:"#F9FAFB",
        blackLow:"#00054F",
      },
    },
  },
  plugins: [],
}

