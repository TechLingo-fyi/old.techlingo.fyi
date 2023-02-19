/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#F2E9E4",
        dark0: "rgba(55, 57, 62)",
        dark1: "rgba(47, 49, 54)",
        dark3: "rgba(67, 70, 77)",
        textLight0: "rgba(150,152,157)",
      },
    },
  },
  plugins: [],
};
