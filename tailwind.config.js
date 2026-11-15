/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          900: '#070a13',
          800: '#0b1120',
          700: '#111827',
          600: '#1f293d',
        },
        nasa: {
          blue: '#1a56db',
          accent: '#38bdf8',
          yellow: '#facc15',
          gold: '#eab308',
          green: '#22c55e',
          leaf: '#16a34a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '50%': { transform: 'scale(1.4)', opacity: '0.4' },
          '100%': { transform: 'scale(2.0)', opacity: '0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        orbitRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'pulse-ring': 'pulseRing 2.5s cubic-bezier(0.2, 0, 0, 1) infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'orbit-spin': 'orbitRotate 20s linear infinite',
      }
    },
  },
  plugins: [],
}

