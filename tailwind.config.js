/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 单一深色系统：页面 / 卡片 / 描边（cards.md：卡片比页面亮一档）
        page: '#0a0a0c',
        card: '#141417',
        ink: '#ececf0',
        'ink-dim': '#a5a5ad',
        hairline: 'rgba(236,236,240,0.09)',
        // 唯一强调色：GitHub star 黄，只用在星数与选中态
        star: '#e3b341',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        wrap: '1280px',
      },
    },
  },
  plugins: [],
}
