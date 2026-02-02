/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spectral: ['Spectral', 'serif'],
        public: ['Public Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
