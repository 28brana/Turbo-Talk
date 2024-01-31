/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        textPrimary:"#333333",
        textSecondary:"#9d9d9d",
        background:"#583dff",
        primary: '#201a31',      
        secondary: '#0df5e3',  
      },
    },
  },
  plugins: [],
}