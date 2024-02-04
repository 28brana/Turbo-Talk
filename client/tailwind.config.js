/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        textPrimary:"#333333",
        textSecondary:"#9d9d9d",
        background:"#1D88F6",
        backgroundSecondary:"#E8E9ED",
        primary: '#201a31',      
        secondary: '#009975',  
        hover:'#0099753b',
        error:'#E63333',
      },
    },
  },
  plugins: [],
}