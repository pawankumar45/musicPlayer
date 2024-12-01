/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.2)', 
      }
    },
  },
  plugins: [],
}

