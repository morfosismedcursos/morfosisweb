
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",           // Busca en la raíz (App.tsx, etc)
    "./components/**/*.{js,ts,jsx,tsx}", // Busca en components
    "./context/**/*.{js,ts,jsx,tsx}",    // Busca en context
    "./services/**/*.{js,ts,jsx,tsx}"    // Busca en services
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#8e2a2a',
        'brand-secondary': '#5d1a1a',
        'brand-light': '#fdf2f2',
        'brand-accent': '#d4bda5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
