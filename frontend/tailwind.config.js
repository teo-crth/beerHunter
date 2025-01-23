export const theme = {
  extend: {
    colors: {
      primary: 'var(--primary-color)',
      secondary: 'var(--secondary-color)',
      tertiary: 'var(--tertiary-color)',
      middle: 'var(--middle-color)',
      dark: 'var(--dark-color)',
      black: 'var(--black-color)',
    },
    fontFamily: {
      title: ['var(--title-font)', 'sans-serif'],
      text: ['var(--text-font)', 'sans-serif'],
    },
    screens: {
      mobile: 'var(--mobile-screen)',
      tablet: 'var(--tablet-screen)',
      desktop: 'var(--desktop-screen)',
    },
  },
};

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Inclus tous les fichiers de ton dossier src
  ],
  theme,
  plugins: [],
};
