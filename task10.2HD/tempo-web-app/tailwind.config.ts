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
        hsl5: 'hsl(0 0% 5%)', hsl10: 'hsl(0 0% 10%)', hsl13: 'hsl(0 0% 13%)',
        hsl15: 'hsl(0 0% 15%)', hsl20: 'hsl(0 0% 20%)', hsl25: 'hsl(0 0% 25%)',
        hsl30: 'hsl(0 0% 30%)', hsl40: 'hsl(0 0% 40%)',
        hsl50: 'hsl(0 0% 50%)',
        hsl60: 'hsl(0 0% 60%)', hsl70: 'hsl(0 0% 70%)',
        hsl80: 'hsl(0 0% 80%)', hsl85: 'hsl(0 0% 85%)', hsl90: 'hsl(0 0% 90%)',
        hsl95: 'hsl(0 0% 95%)', hsl98: 'hsl(0 0% 98%)', hsl100: 'hsl(0 0% 100%)',

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
