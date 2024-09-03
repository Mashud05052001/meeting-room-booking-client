/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {

    extend: {
      colors: {
        common: {
          100: "#d1c4a3",
          200: "#caba93",
          300: "#c2b084",
          400: "#bba674",
          500: "#b39c65",
          600: "#a18c5b",
          700: "#8f7d51",
          800: "#7d6d47",
          900: "#6b5e3d",
          1000: "#5a4e33",
        },
      },
    },
  },
  plugins: [],
}