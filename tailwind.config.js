/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B0000', // Deep Red
        secondary: '#FFD700', // Gold
        dark: '#1A1A1A', // Dark Gray
        light: '#F5F5F5', // Off-white
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
