/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: [
          '"EB Garamond"',
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        body: [
          '"Kdam Thmor Pro"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        italian: ["Italiana", "ui-sans-serif"],
      },
    },
  },
  plugins: [],
};
