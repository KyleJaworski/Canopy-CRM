/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        treeGreen: "#0e802a", // Custom green color
        treeGreenLight: "#28b74b", // Custom green color
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
