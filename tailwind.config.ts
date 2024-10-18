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
      colors: {
        blue: {
          400: '#3F72AF', // figma: light blue
          900: '#112D4E', // figma: dark blue
        },
        red: {
          400: '#EF5A6F',
        },
        green: {
          400: '#72BF78',
        },
        grayscale: {
          // fix: add more grayscales (because figmas rgba doesn't work same as css on normal elements I think - they will be transparent)
          100: '#F9F7F7',
          400: '#898A8D',
          900: '#000',
        },
      },
      zIndex: {
        max: '999',
      },
      keyframes: {
        // Dialog keyframes
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
      },
      animation: {
        // Dialog animation
        'content-open': 'content-open 500ms ease-in-out',
        'content-closed': 'content-closed 500ms ease-in-out',
        'overlay-open': 'overlay-open 250ms linear',
        'overlay-closed': 'overlay-closed 250ms linear',
      },
    },
  },
  plugins: [],
};
export default config;
