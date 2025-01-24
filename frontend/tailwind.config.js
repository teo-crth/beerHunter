export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        middle: 'var(--middle-color)',
        dark: 'var(--dark-color)',
        darkBlack: 'var(--color-dark-black)',
        light: 'var(--color-light)',
      },
      fontFamily: {
        title: ['var(--title-font)', 'serif'],
        text: ['var(--text-font)', 'serif'],
      },
      screens: {
        mobile: 'var(--mobile-screen)',
        tablet: 'var(--tablet-screen)',
        desktop: 'var(--desktop-screen)',
      },
    },
  },
  plugins: [],
};
