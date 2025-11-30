/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./app/components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        expandGray: "#6b7280", // gray accent
        panel: "#f8f9fa"
      }
    }
  },
  plugins: []
}
