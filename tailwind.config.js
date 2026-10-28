/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#020405',
          900: '#030708',
          850: '#070d10',
          800: '#0b1419',
          700: '#111d24',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          900: '#064E3B',
          950: '#022C22',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          900: '#164E63',
          950: '#083344',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'spin-very-slow': 'spin 30s linear infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        glowPulse: {
          '0%': { opacity: '0.3', filter: 'blur(20px)' },
          '100%': { opacity: '0.7', filter: 'blur(35px)' },
        }
      }
    },
  },
  plugins: [],
}
