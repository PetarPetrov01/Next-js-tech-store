import type { Config } from "tailwindcss";
import scrollbar_hide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "source-sans": ["var(--font-source-sans)"],
        "playfair-display": ["var(--font-playfair-display)"],
      },
      screens: {
        mdl: "940px",
      },
      colors: {
        darkblue: "#03045e",
        lightblue: "#00b4d8",
        purple: "#cb00bb",
        pink: "#ff0198",
        green: "#88d42b",
        new: {
          darkblue: "#050421",
          midnight: {
            80: "#091349b5",
            90: "#091349e5",
            100: "#091349",
          },
          sandstone: "#d9b08c",
          peach: {
            80: "#fcc188b5",
            90: "#fcc188e5",
            100: "#fcc188",
          },
          mint: "#e4e8f7",
        },
      },
      animation: {
        "fast-bounce": "bounceFast 0.7s infinite",
        "fill-right": "fillRight ease-in 0.7s forwards",
        "skeleton-load": "skeletonLoad linear 1s infinite",
      },
      keyframes: {
        bounceFast: {
          "0%, 100%": { transform: "translateY(-35%)" },
          "50%": { transform: "none" },
        },
        fillRight: {
          "0%": { width: "0", height: "100%" },
          "40%": { width: "30%", height: "100%" },
          "60%": { width: "80%", height: "100%" },
          "100%": { width: "100%", height: "100%" },
        },
        skeletonLoad: {
          "0%": { left: "-100%" },
          "75%": { left: "100%" },
          "100%": { left: "100%" },
        },
      },
    },
  },
  plugins: [scrollbar_hide],
};
export default config;
