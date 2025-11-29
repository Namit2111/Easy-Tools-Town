import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'neo-bg': '#fdf6e3',
        'neo-red': '#ff6b6b',
        'neo-cyan': '#9bf6ff',
        'neo-yellow': '#fdffb6',
        'neo-pink': '#ffc6ff',
        'neo-purple': '#a388ee',
        'neo-lavender': '#bdb2ff',
        'neo-green': '#caffbf',
        'neo-peach': '#ffadad',
        'neo-orange': '#ff9f1c',
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '6px 6px 0px 0px rgba(0,0,0,1)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'marquee': 'marquee 15s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

