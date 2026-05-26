/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        terminal: {
          bg: '#0d1117',
          text: '#e6edf3',
          green: '#3fb950',
          amber: '#d29922',
          red: '#f85149',
          blue: '#58a6ff',
          muted: '#8b949e',
        },
      },
    },
  },
  plugins: [],
}
