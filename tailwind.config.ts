import type { Config } from 'tailwindcss';

// todo: fix the animations, because I use too many of them, they need to have more general names

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /w-column-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl', 'xl2'],
    },
    {
      pattern: /offset-(1|2|3|4|5|6|7|8|9|10|11)/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl', 'xl2'],
    },
  ],
  plugins: [require('@tailwindcss/typography')],

  theme: {
    extend: {
      screens: {
        '2xl': '1800px',
      },

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
        42: '168px',
        68: '272px',
        76: '304px',
      },
      lineHeight: {
        12: '48px',
        14: '56px',
        64: '256px',
      },
      textUnderlineOffset: {
        12: '12px',
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
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },

        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },

        // landig page
        'slide-down-accordion': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'slide-up-accordion': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // auth
        'auth-page': {
          from: {
            opacity: '0',
            transform: 'translateY(50%)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
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
            transform: 'translateY(50%)',
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
            transform: 'translateY(50%)',
          },
        },

        'search-open': {
          from: {
            opacity: '0',
            transform: 'translateX(-200px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0px)',
          },
        },
        'search-closed': {
          from: {
            opacity: '1',
            transform: 'translateX(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateX(-200px)',
          },
        },
        'title-open': {
          from: {
            opacity: '0',
            transform: 'translateY(-100px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0px)',
          },
        },
        'title-closed': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(-100px)',
          },
        },
        'search-initial-apperance': {
          from: {
            opacity: '0',
            transform: 'translateX(200px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'title-initial-apperance': {
          from: {
            opacity: '0',
            transform: 'translateX(-200px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },

        // Drawer
        'drawer-slide-open': {
          from: {
            opacity: '0',
            transform: 'translateX(-83.33%)',
          },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'drawer-slide-closed': {
          from: {
            opacity: '1',
            transform: 'translateX(0)',
          },
          to: {
            opacity: '0',
            transform: 'translateX(-83.33%)',
          },
        },

        // Card
        'card-options-hover': {
          from: {
            opacity: '0',
            transform: 'translateY(-50px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'card-options-unhovered': {
          from: {
            transform: 'translateY(0)',
          },
          to: {
            transform: 'translateY(-50px)',
          },
        },
        'card-apperance': {
          from: {
            opacity: '0',
            transform: 'translateY(400px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        // Public-profile
        'public-profile-initial-apperance': {
          from: {
            opacity: '0',
            transform: 'translateY(-50%)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        // Note-editor
        'header-initial-apperance': {
          from: {
            transform: 'translateY(-150px)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
        'text-editor-initial-apperance': {
          from: {
            opacity: '0',
            transform: 'translateY(150px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'text-editor-editing': {
          from: {
            opacity: '0',
            transform: 'scale(80%)',
          },
          to: {
            opacity: '1',
            transform: 'scale(100%)',
          },
        },

        // Quizz

        'slide-in-quizz': {
          from: {
            transform: 'translateX(-50%)',
          },
          to: {
            transform: 'translateX(0px)',
          },
        },
      },
      animation: {
        // General animation
        show: 'show 500ms ease-in-out',
        hide: 'hide 500ms ease-in-out',
        'infinite-scroll': 'infinite-scroll 10s linear infinite',

        // Landing animation
        'slide-down-accordion': 'slide-down-accordion 0.3s ease-out',
        'slide-up-accordion': 'slide-up-accordion 0.3s ease-out',

        // Auth animation
        'auth-page': 'auth-page 500ms ease-in-out',

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

        // Search animation
        'search-open': 'search-open 300ms ease-in',
        'search-closed': 'search-closed 300ms ease-in',
        'title-open': 'title-open 300ms ease-in-out',
        'title-closed': 'title-closed 300ms ease-in-out',
        'search-initial-apperance': 'search-initial-apperance 500ms ease-in',
        'title-initial-apperance': 'title-initial-apperance 500ms ease-in',

        // Drawer animation
        'drawer-slide-open': 'drawer-slide-open 400ms ease-in',
        'drawer-slide-closed': 'drawer-slide-closed 400ms ease-in',

        // Card animation
        'card-options-hover': 'card-options-hover 200ms linear',
        'card-options-unhovered': 'card-options-unhovered 200ms linear',
        'card-apperance': 'card-apperance 500ms ease-in',

        // Public-profile
        'public-profile-initial-apperance':
          'public-profile-initial-apperance 500ms ease-in',

        // Note-editor
        'header-initial-apperance': 'header-initial-apperance 300ms linear',
        'text-editor-initial-apperance':
          'text-editor-initial-apperance 300ms linear',
        'text-editor-editing': 'text-editor-editing 300ms linear',
        'slide-in-quizz': 'slide-in-quizz 300ms ease-in',
      },
    },
  },
};
export default config;
