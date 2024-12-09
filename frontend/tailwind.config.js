/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#38D1EC',
      },
      backgroundPosition: {
        'center-80': 'center 80%',
      },
    },
  },
  variants: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "aqua", "pastel"],
  },
};

