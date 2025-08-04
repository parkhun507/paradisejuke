/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 원본 HTML의 화려한 색상 팔레트를 그대로 사용합니다.
      colors: {
        'brand-pink': '#ec4899',
        'brand-purple': '#8b5cf6',
        'brand-indigo': '#4f46e5',
      },
      // 원본 HTML의 그라데이션을 그대로 사용합니다.
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #fce7f3, #ffffff, #f0e6ff)',
        'cta-gradient': 'linear-gradient(to right, #8b5cf6, #ec4899)',
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
        'lifted': '0 10px 20px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
