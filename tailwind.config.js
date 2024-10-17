/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '/index.html',
    '/assets/js/**/*.{html,js}',
  ],
  
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
    },
  },

  plugins: [],
  }
}
