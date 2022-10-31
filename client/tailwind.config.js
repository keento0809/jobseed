/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'content-blue': '#0079BD'
      },
      fontFamily: {
        Inter: ['Inter', "sans-serif"]
      }
    },
  },
  plugins: [],
}
