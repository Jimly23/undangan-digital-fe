/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'angin' akan menjadi nama class Anda: font-angin
        angin: ['Angin Senja', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

