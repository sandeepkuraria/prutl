/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customDarkmode: '#020617', //blackBG
        hoverLinkColor:'#575758',  //Gray
        themeColorOrange:'#d1644d',
        hoverButtonColorOrange:'#91402f'
      },
  
    },
  },
  plugins: [],
}