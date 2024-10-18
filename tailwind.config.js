/** @type {import('tailwindcss').Config} */

module.exports = {

  content: ["./assets/js/app.js",
            "./index.html"
           ],
  
  theme: {

    screens: {
      '2xs': '350px',
      // => @media (min-width: 300px) { ... }
      
      'xs': '400px',
      // => @media (min-width: 400px) { ... }
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      
      '3xl': '1800px',
      // => @media (min-width: 1800px) { ... }
    },

    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },

    plugins: ["prettier-plugin-tailwindcss"],
  }
}
