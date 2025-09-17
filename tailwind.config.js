/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 98%)',
        accent: 'hsl(208.9 90.8% 57.5%)',
        primary: 'hsl(222.2 47.4% 11.2%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(240 10% 10.6%)',
        'text-secondary': 'hsl(240 10% 30%)',
        purple: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95'
        }
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px'
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0, 0%, 0%, 0.12)'
      },
      spacing: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px'
      },
      animation: {
        'fadeIn': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slideUp': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}