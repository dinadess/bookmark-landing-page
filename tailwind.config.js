/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'soft-blue': 'hsl(231, 69%, 60%)',
        'soft-red': 'hsl(0, 94%, 66%)',
        'grayish-blue': 'hsl(229, 8%, 60%)',
        'dark-blue': 'hsl(229, 31%, 21%)',
      },
    },
    screens: {
      sm: '40rem', // 40rem * 16px = 640px
      // => @media (min-width: 640px) { ... }

      md: '48rem', // 48rem * 16px = 768px
      // => @media (min-width: 768px) { ... }

      lg: '64rem', // 64rem * 16px = 1024px
      // => @media (min-width: 1024px) { ... }

      xl: '80rem', // 80rem * 16px = 1280px
      // => @media (min-width: 1280px) { ... }

      '2xl': '96rem', //96rem * 16px = 1536px
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
