export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 1s ease-in-out',
        pulseSlow: 'pulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};