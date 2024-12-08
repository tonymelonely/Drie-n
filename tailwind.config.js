/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(green|blue|red|purple|black)-(800|900)/,
      variants: ['hover']
    },
    {
      pattern: /from-(green|blue|red|purple|black)-(800|900)/,
      variants: ['hover']
    },
    {
      pattern: /to-(green|blue|red|purple|black)-(800|900)/,
      variants: ['hover']
    }
  ]
};