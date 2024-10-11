import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
          100: '#F9F7F',
          500: '#',
          900: '#000',
        },
      },
    },
  },
  plugins: [],
};
export default config;
