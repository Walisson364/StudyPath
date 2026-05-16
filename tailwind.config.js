/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0f172a',
        mist: '#f8fafc',
        brand: {
          blue: '#2563eb',
          purple: '#7c3aed',
          green: '#10b981',
        },
      },
      boxShadow: {
        soft: '0 20px 55px rgba(15, 23, 42, 0.10)',
        glow: '0 20px 70px rgba(37, 99, 235, 0.22)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pop: {
          '0%': { transform: 'scale(.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pop: 'pop .35s ease-out both',
      },
    },
  },
  plugins: [],
};
