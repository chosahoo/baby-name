/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // bébé name - 베베 노트 통일 컬러 시스템
        primary: {
          50: '#FEF5EF',
          100: '#FDEADF',
          200: '#FBD5BF',
          300: '#F9C09F',
          400: '#F0AB8F',
          500: '#E8A87C', // 메인 피치/복숭아색
          600: '#D4956B',
          700: '#C0825A',
          800: '#8B7355',
          900: '#6B5643',
        },
        cream: {
          50: '#FFFCF9',
          100: '#FAF3E8', // 밝은 배경
          200: '#F5E6D3', // 메인 배경 (베베 노트와 동일)
          300: '#F0DAC0',
          400: '#EBCDAD',
          500: '#E6C19A',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 12px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
