/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        h1: { fontSize: config('theme.fontSize.2xl') },
        h2: { fontSize: config('theme.fontSize.xl') },
        h3: { fontSize: config('theme.fontSize.lg') }
      })
    })
  ]
}
