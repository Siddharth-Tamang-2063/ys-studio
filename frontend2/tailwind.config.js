/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base — warm linen white & near-true black
        cream: {
          DEFAULT: '#F2EBE0',   // warm linen — stronger, more fashion-forward
          50: '#FAF7F2',
          100: '#F2EBE0',
          200: '#E2D3C0',       // deep warm taupe
        },
        charcoal: {
          DEFAULT: '#0D0B09',   // warm near-black — richer than flat black
          800: '#1E1A16',
          900: '#070504',
        },
        // Amber-cognac — rich, editorial gold
        sand: {
          DEFAULT: '#BF7B16',
          light: '#DBA940',
          dark: '#8A5610',
        },
        // Deep forest emerald — bold & unexpected
        sage: {
          DEFAULT: '#185C3E',
          light: '#2E8A63',
        },
        // Crimson wine — replaces bland blush
        blush: {
          DEFAULT: '#8C1B35',
          light: '#C4476A',
        },
        // Deep midnight ink — for dark sections
        ink: {
          DEFAULT: '#10131F',
          light: '#1E2338',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-left': 'slideLeft 0.5s ease forwards',
        'slide-right': 'slideRight 0.5s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideLeft: { from: { opacity: 0, transform: 'translateX(24px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        slideRight: { from: { opacity: 0, transform: 'translateX(-24px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'luxury': '0 4px 40px rgba(0,0,0,0.08)',
        'luxury-lg': '0 8px 60px rgba(0,0,0,0.12)',
        'card': '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.12)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}