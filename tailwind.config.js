/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1E2A38',
          mid: '#2F4A63',
          green: '#4CAF50',
          'green-dark': '#3d9140',
          'green-light': '#E8F5E9',
          bg: '#F5F7FA',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)',
        'card-hover': '0 6px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
        'header': '0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
};
