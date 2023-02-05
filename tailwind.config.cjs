/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'demoBG': "url('https://www.dmarge.com/wp-content/uploads/2020/03/paris-aprtment-balcony.jpg')"
      },
    },
    screens: {
      'custom1': '542px',

      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    }
  },
  plugins: [require("@tailwindcss/forms")],
};
