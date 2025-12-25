/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b35', // Vibrant orange
        secondary: '#bf3100', // Deep orange/red
        dark: '#1a1a1a', // Rich black/gray
        'dark-lighter': '#2a2a2a', // Slightly lighter dark for cards
        light: '#f7fff7', // Off-white
        accent: '#ec9f05', // Gold/Yellow accent
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
