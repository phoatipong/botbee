const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      prompt: ["Prompt", ...defaultTheme.fontFamily.sans],
      kanit: ["Kanit", ...defaultTheme.fontFamily.sans],
    },

    extend: {},
  },
  plugins: [],
};
