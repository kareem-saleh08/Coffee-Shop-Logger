/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE7',
        espresso: '#2B1F15',
        burnt: {
          DEFAULT: '#8B5A3C',
          dark: '#6B4226',
        },
        sandy: '#F4A460',
        sage: '#2E8B57',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 2px 12px 0 rgba(43, 31, 21, 0.08)',
        'warm-md': '0 4px 20px 0 rgba(43, 31, 21, 0.12)',
      },
    },
  },
  plugins: [],
};
