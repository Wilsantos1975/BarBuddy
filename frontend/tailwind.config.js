/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fascinate': ['Fascinate', 'sans-serif'],
      },
      colors: {
        'forest': '#1B4D3E',
        'bubblegum': '#FFB7D5',
        'sunshine': '#FFE168',
        'white': '#FFFFFF',
      },
      borderRadius: {
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
} 