/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Clash Display', 'system-ui', 'sans-serif'],
        body: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Couleur principale (neutre chaud)
        volt: {
          400: '#d6d3d1',
          500: '#a8a29e',
          600: '#78716c',
        },
        // Accent (rose pâle/taupe)
        plasma: {
          400: '#e7e5e4',
          500: '#d6d3d1',
          600: '#a8a29e',
        },
        // Highlight (blanc cassé)
        ice: {
          400: '#fafaf9',
          500: '#f5f5f4',
          600: '#e7e5e4',
        },
      },
      backgroundImage: {
        'grid-ink': 'linear-gradient(to right, rgba(64,64,64,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(64,64,64,0.3) 1px, transparent 1px)',
        'glow-volt': 'radial-gradient(ellipse at center, rgba(214,211,209,0.15) 0%, transparent 70%)',
        'glow-plasma': 'radial-gradient(ellipse at center, rgba(231,229,228,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan': 'scan 2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'volt': '0 0 20px rgba(214, 211, 209, 0.3)',
        'plasma': '0 0 20px rgba(231, 229, 228, 0.3)',
        'ice': '0 0 20px rgba(250, 250, 249, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'deep': '0 8px 40px rgba(0, 0, 0, 0.6)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
