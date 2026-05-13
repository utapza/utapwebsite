/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          DEFAULT: '#4CAF50',
          accent: '#81C784',
          ink: '#2E7D32',
          subink: '#388E3C',
          placeholder: '#A5D6A7',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          soft: '#64748B',
        },
      },
      backgroundImage: {
        'emerald-gradient': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'emerald-soft': 'linear-gradient(180deg, #ECFDF5 0%, #FFFFFF 100%)',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.08)',
        'card-lg': '0 10px 30px -10px rgb(5 150 105 / 0.25)',
        focus: '0 0 0 3px rgb(16 185 129 / 0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.2, 0.65, 0.3, 1) both',
        'fade-in': 'fadeIn 0.6s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.2, 0.65, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
