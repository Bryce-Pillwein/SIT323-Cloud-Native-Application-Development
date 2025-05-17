import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'mb': '425px'
      },
      fontSize: {
        'xxs': '0.625rem'
      },
      fontFamily: {
        drukWide: ['DrukeWide-Medium', '"Inter"', 'sans-serif'],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji",],
      },
      colors: {
        hsl: {
          l5: 'hsl(0 0% 5%)', l10: 'hsl(0 0% 10%)', l13: 'hsl(0 0% 13%)',
          l15: 'hsl(0 0% 15%)', l20: 'hsl(0 0% 20%)', l25: 'hsl(0 0% 25%)',
          l30: 'hsl(0 0% 30%)', l40: 'hsl(0 0% 40%)',
          l50: 'hsl(0 0% 50%)',
          l60: 'hsl(0 0% 60%)', l70: 'hsl(0 0% 70%)',
          l80: 'hsl(0 0% 80%)', l85: 'hsl(0 0% 85%)', l90: 'hsl(0 0% 90%)',
          l95: 'hsl(0 0% 95%)', l98: 'hsl(0 0% 98%)', l100: 'hsl(0 0% 100%)',
        },
        mb: {
          'pink': '#FF3EB5',
          'yellow': '#FFE900',
          'pink-active': '#EB29A1',
          'yellow-active': '#d0bf00',
        },
        g: {
          'orange': 'rgb(243 122 55)',
          'blue': 'rgb(20 147 162)',
          'orange-light': 'rgb(248 182 146)',
          'blue-light': 'rgb(125 228 239)',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
