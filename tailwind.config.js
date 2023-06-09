module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      "open-sans": ["Open Sans", "sans-serif"],
    },
    colors: {
      background: "#000000",
      primary: "#FFFFFF",
      secondary: "#9E9E9E",
      active: "#5371EF",
      danger: "#FF385C",
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};