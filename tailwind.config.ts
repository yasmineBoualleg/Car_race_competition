import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.rotateX-90': {
          transform: 'rotateX(90deg)',
        },
        '.bg-radial-gradient': {
          background: 'radial-gradient(circle at center, rgba(153,153,153,0.2), transparent)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

export default config 