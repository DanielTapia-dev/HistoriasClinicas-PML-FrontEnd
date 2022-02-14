module.exports = {
  mode: "jit",
  prefix: "",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "enter-card": "enterCard 1s ",
      },
      keyframes: {
        enterCard: {
          "0%": { transform: "scale(0.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
