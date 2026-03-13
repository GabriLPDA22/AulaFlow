/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1D3557',
          hover: '#16293F',
          light: '#EEF2F7',
        },
        accent: '#2A9D8F',
        base: '#F7F7F3',
        subtle: '#F1F0ED',
        surface: '#FFFFFF',
        border: '#E5E3E0',
        ink: {
          DEFAULT: '#111111',
          secondary: '#5C5C5C',
          disabled: '#9CA3AF',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'display': ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }],
        'h1': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'h2': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'h3': ['1.125rem', { lineHeight: '1.625rem', fontWeight: '500' }],
        'body': ['0.9375rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'small': ['0.8125rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.05)',
        'float': '0 2px 8px rgba(0,0,0,0.07)',
        'modal': '0 8px 32px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
