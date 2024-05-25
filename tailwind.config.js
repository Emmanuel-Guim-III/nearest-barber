/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#5d6043',
        accent: '#925b42',
        'brand-light': '#aaab96',
        'accent-light': '#cbbca7',
        base: '#ede9e3',
        primary: '#272930',
        secondary: '#646872',
        tertiary: '#81848F',
      },
    },
  },
  plugins: [],
};
