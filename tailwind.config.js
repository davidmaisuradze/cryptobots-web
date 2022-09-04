const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      main: ['Oxanium'],
    },
    extend: {
      colors: {
        ...colors,
        elVioletNatural: '#5333ff',
        blueMediumDark: '#453FB9',
        blueMediumLight: '#795cf5',
        blueMedium: '#292fa7',
        blueDodgeLight: '#2390ff',
        valhalla: '#261858',
        violet: '#0f0933',
        violetNeutral: '#180a42',
        purpleLight: '#dc19ff',
        black: '#020205',
        greigeLight: '#BFBCD2',
        white: '#ffffff'
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer'), require('@tailwindcss/forms'),],
};