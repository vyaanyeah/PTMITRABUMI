/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black':     '#111111',
        'brand-darkblack': '#080808',
        'brand-gold':      '#C8A45D',
        'brand-lightgold': '#DFBF79',
        'brand-offwhite':  '#F7F6F2',
        'brand-gray':      '#6B7280',
      },
      fontFamily: {
        sans:   ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display:['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        cinzel: ['"Fresh Mango"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C8A45D 0%, #DFBF79 50%, #C8A45D 100%)',
      },
    },
  },
  plugins: [],
}
