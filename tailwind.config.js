/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        md: "560px",
        lg: "1280px",
        sm: "360px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
