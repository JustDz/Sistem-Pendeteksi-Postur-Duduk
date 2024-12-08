// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // pastikan mencakup semua file yang kamu gunakan
  ],
  theme: {
    extend: {
      colors: {
        'font-clr': '#313131',
        'first-bg': '#efefef',
        'second-bg': '#eae6e0',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
