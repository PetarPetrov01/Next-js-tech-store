import type { Config } from "tailwindcss";
import scrollbar_hide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  // Theme configuration is now in globals.css using @theme directive
  plugins: [scrollbar_hide],
};
export default config;
