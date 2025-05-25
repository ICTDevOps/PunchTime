/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boxing: {
          red: '#DC2626',
          dark: '#1F2937',
          light: '#F9FAFB'
        }
      }
    },
  },
  plugins: [],
}
