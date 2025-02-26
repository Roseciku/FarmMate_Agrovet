/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farmGreen: '#4CAF50',
        earthyGreen: ' #81C784',
        brightYellow: '#FFB300',
        brightOrange: '#FFA726'

      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      },
      backgroundImage: {
        'hero': "url('/images/hero1.jpg')",
      },
    },
  },
  plugins: [],
}
