/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./formkit.config.js"
  ],
  theme: {
    extend: {
      width: {
        '9/10': '90%', // Añade la clase personalizada
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}

