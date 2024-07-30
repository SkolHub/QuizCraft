import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'primary-50': '#f5f7f9',
        'primary-100': '#e8ebf1',
        'primary-200': '#d7dce6',
        'primary-300': '#bbc4d5',
        'primary-400': '#9aa6c0',
        'primary-500': '#818db0',
        'primary-600': '#6f79a1',
        'primary-700': '#636992',
        'primary-800': '#525675',
        'primary-900': '#474b61',
        'primary-950': '#2e2f3d',
        'secondary-50': '#f2f4fc',
        'secondary-100': '#e1e6f8',
        'secondary-200': '#cad3f3',
        'secondary-300': '#a6b8ea',
        'secondary-400': '#7c93de',
        'secondary-500': '#5d71d4',
        'secondary-600': '#5561cb',
        'secondary-700': '#3f45b6',
        'secondary-800': '#383a95',
        'secondary-900': '#313477',
        'secondary-950': '#222349',
        'white-overlap': '#f6f7fd'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
};
export default config;
