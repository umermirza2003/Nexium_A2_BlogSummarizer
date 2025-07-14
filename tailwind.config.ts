import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: false,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: '#fff0f5', // Light pink background
        foreground: '#1f1f1f', // Dark text
        card: {
          DEFAULT: '#ffe4e6', // Soft pink card
          foreground: '#1f1f1f',
        },
        popover: {
          DEFAULT: '#ffe4e6',
          foreground: '#1f1f1f',
        },
        primary: {
          DEFAULT: '#ec4899', // Pink primary
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#fcd3e1',
          foreground: '#1f1f1f',
        },
        muted: {
          DEFAULT: '#f9e7ef',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT: '#f472b6',
          foreground: '#1f1f1f',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#fbcfe8',
        input: '#fdf2f8',
        ring: '#f9a8d4',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'pulse-scale': 'pulse-scale 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
