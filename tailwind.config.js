/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        grayHover: "rgba(255, 255, 255, 0.08)",
        red: "red",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
