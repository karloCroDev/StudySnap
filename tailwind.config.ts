import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /w-column-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /offset-(1|2|3|4|5|6|7|8|9|10|11)/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
  ],
  theme: {
    extend: {
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        md: '20px',
        lg: '24px',
        xl: '28px',
        '2xl': '32px',
        '3xl': '36px',
        '4xl': '40px',
        // note: Add more sizes if you think we need them
        '9xl': '60px',
      },
      spacing: {
        'desktop-dialog': '550px',
      },
      lineHeight: {
        12: '48px',
      },
      colors: {
        blue: {
          400: '#3F72AF',
          900: '#112D4E',
        },
        red: {
          400: '#C62E2E',
        },
        green: {
          400: '#72BF78',
        },
        gray: {
          100: '#F9F7F7', // figma: white
          200: '#D0D0D2',
          300: '#A1A1A4',
          400: '#898A8D',
          500: '#6F6F72',
          600: '#545457',
          700: '#3A3A3B',
          800: '#1F1F20',
          900: '#000', // figma: black
        },
      },
      zIndex: {
        max: '999',
      },
      keyframes: {
        // Universal
        hide: {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },

        show: {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        // Dialog
        'content-open': {
          from: {
            opacity: '0',
            top: 'calc(50% + 500px)',
          },
          to: {
            opacity: '1',
            top: '50%',
          },
        },
        'content-closed': {
          from: {
            opacity: '1',
            top: '50%',
          },
          to: {
            opacity: '0',
            top: 'calc(50% - 500px)',
          },
        },
        'overlay-open': {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '0.6',
          },
        },
        'overlay-closed': {
          from: {
            opacity: '0.6',
          },
          to: {
            opacity: '0',
          },
        },

        // Toast
        'slide-in': {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(var(--radix-toast-swipe-end-x))',
          },
        },
        'slide-out': {
          from: {
            transform: 'translateX(calc(var(--radix-toast-swipe-end-x)))',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },

        // Menu
        'menu-open': {
          from: {
            opacity: '0',
            transform: 'translateY(100px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        'menu-closed': {
          from: {
            opacity: '1',
            transform: 'translateY(0)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(100px)',
          },
        },
      },
      animation: {
        // Dialog animation
        'content-open': 'content-open 500ms ease-in-out',
        'content-closed': 'content-closed 500ms ease-in-out',
        'overlay-open': 'overlay-open 250ms linear',
        'overlay-closed': 'overlay-closed 250ms linear',

        // Toast animation
        'slide-in': 'slide-in 250ms linear',
        'slide-out': 'slide-out 150ms linear',

        // Menu animation
        'menu-open': 'menu-open 300ms ease-in-out',
        'menu-closed': 'menu-closed 300ms ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
