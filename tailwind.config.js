module.exports = {
  content: ['./pages/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}', './components/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          1: '#FCF8EC',
          2: '#E6F0EF',
          3: '#79A3B1',
          4: '#456268',
          red: '#D43C3C',
          green: '#469451',
        },
        dark: {
          1: '#303841',
          2: '#3A4750',
          3: '#F6C90E',
          4: '#EEEEEE',
          red: '#FF7979',
          green: '#74D082',
        },
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
