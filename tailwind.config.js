/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F7CE45',
        accent: '#0000004D',
        danger: '#E80B26',
        dark: '#000000',
        border: '#F2F2F2',
      },
    },
  },
  plugins: [],
};
