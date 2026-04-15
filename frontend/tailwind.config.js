/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101826',
        mist: '#f2efe8',
        clay: '#d56f3e',
        pine: '#184f43',
        sand: '#eadfce',
      },
      boxShadow: {
        panel: '0 24px 60px rgba(16, 24, 38, 0.14)',
      },
    },
  },
  plugins: [],
};
