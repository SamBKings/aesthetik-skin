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
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-barlow)", "system-ui", "sans-serif"],
        /* legacy aliases */
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-barlow)", "system-ui", "sans-serif"],
      },
      colors: {
        aq1:  "#00d4e8",
        aq2:  "#4ecdc4",
        aq3:  "#00b4d8",
        "aq-gold": "#c4a96a",
        /* legacy */
        gold: "#c4a96a",
        carbon: "#1A1A1A",
        cream: "#F8F5F0",
        "cream-dark": "#F2EDE6",
        alabaster: "#F8F5F0",
        sand: "#E8DDD0",
        nude: "#E8DDD0",
        slate: "#6B6560",
        ink: "#2C2C2C",
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
