/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,jsx}", "./src/legacy-client/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",
        secondary: "#0d9488",
        accent: "#4ade80",
        background: "#f9fffe",
        text: "#1a2332",
        surface: "#f0fdf4",
        border: "#d1fae5",
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
