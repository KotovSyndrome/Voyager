/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'demoBG': "url('https://www.dmarge.com/wp-content/uploads/2020/03/paris-aprtment-balcony.jpg')"
      },
    },
  },
  plugins: [],
};
