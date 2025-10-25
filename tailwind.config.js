/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // bebé note 컬러 시스템
        primary: {
          50: '#FFF0F5',
          100: '#FFE5EC',
          200: '#FFCCD9',
          300: '#FFB3C6',
          400: '#FF99B3',
          500: '#FF6B9D', // 메인 핑크
          600: '#E6568B',
          700: '#CC4178',
          800: '#B32C66',
          900: '#991753',
        },
        cream: {
          50: '#FFFCF8',
          100: '#FFF9F0', // 메인 배경
          200: '#FFF3E0',
          300: '#FFECC7',
          400: '#FFE5AE',
          500: '#FFDE95',
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
