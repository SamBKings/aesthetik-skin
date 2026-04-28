import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-montserrat)", "system-ui", "sans-serif"],
        serif:   ["var(--font-playfair)", "Georgia", "serif"],
        sans:    ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      colors: {
        cream:        "#F4EDE4",
        "cream-alt":  "#EDE5DC",
        "taupe-light":"#D9CEC3",
        taupe:        "#BBA796",
        rose:         "#BE7865",
        "rose-dark":  "#A8614E",
        brand:        "#1A1A1A",
        "brand-mid":  "#4A3F38",
        mid:          "#7A6B60",
        muted:        "#9E9087",
        /* legacy compat */
        carbon: "#1A1A1A",
        ink:    "#2C2C2C",
      },
      borderRadius: {
        DEFAULT: "9999px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
