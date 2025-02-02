export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, 
  },
  variants: {
    extend: {
      scrollBehavior: ["responsive"],
    },
  },
};
