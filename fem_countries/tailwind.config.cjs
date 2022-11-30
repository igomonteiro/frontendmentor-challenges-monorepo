/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '375px',
        xl: '1440px',
      },
      colors: {
        'brand-blue': {
          700: 'hsl(209, 23%, 22%)',
          800: 'hsl(207, 26%, 17%)',
          900: 'hsl(200, 15%, 8%)',
        },
        'brand-gray': {
          dark: 'hsl(0, 0%, 52%)',
          light: 'hsl(0, 0%, 98%)'
        }
      },
    },
  },
  plugins: [],
};
