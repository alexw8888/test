/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mac-bg': '#f5f5f7',
        'mac-window': 'rgba(255, 255, 255, 0.8)',
        'mac-dock': 'rgba(255, 255, 255, 0.2)',
      },
      boxShadow: {
        'mac-window': '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
