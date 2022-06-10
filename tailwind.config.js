module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "lg": { "min": "968px" },
      // => @media (max-width: 1023px) { ... }

      "sm": { "min": "0px", "max" :"967px" },
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};