/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#183668',   // deep navy blue
        secondary: '#f8a23a', // warm orange
        washedprimary : '#8894AC',
        washedsecondary: '#BC8C64',
        gradient: "#8C9CAD",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};