/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand tokens. Admin-editable colors will be applied as CSS variables in Step 5.
        brand: {
          50: '#EEF4FC',
          100: '#DCE8F8',
          500: '#1565E0',
          600: '#0B5BD3',
          700: '#0A4BB0',
          900: '#0B1F4B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Bengali', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 50px -20px rgba(11, 31, 75, 0.25)',
      },
    },
  },
  plugins: [],
};
