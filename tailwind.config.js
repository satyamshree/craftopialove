/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        maroon: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d1d9',
          300: '#f4aab9',
          400: '#ec7a92',
          500: '#df4d6e',
          600: '#cb2a55',
          700: '#aa1d44',
          800: '#8c1a3b',
          900: '#751b36',
          950: '#6b1a32',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf8f3',
          200: '#fbf3eb',
          300: '#f8ebe0',
          400: '#f5e5d8',
          500: '#f0dcc9',
        },
        burgundy: {
          DEFAULT: '#722F37',
          light: '#8B3A42',
          dark: '#5C252C',
          lighter: '#A0414A',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
