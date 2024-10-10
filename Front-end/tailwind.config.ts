import type { Config } from "tailwindcss";

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
          mint: "#d1e8e2",
        },
      },
      animation: {
        "fast-bounce": "bounceFast 0.7s infinite",
      },
      keyframes: {
        bounceFast: {
          "0%, 100%": { transform: "translateY(-35%)" },
          "50%": { transform: "none" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
