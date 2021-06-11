module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        25: '6.25rem',
        128: '32rem',
        144: '36rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
