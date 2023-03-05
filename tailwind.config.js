/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    container: {
      center: true,
      screens: {
        raw: "100%",
      },
    },
    screens: {
      tablet: "640px",

      laptop: "1024px",

      desktop: "1280px",
    },
  },
  plugins: [],
};
