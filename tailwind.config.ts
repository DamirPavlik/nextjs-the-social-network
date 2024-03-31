import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-bg": "#22272e",
      "primary-bg-tint": "#2d333b",
      "primary-bg-shade": "#1c2128",
      "primary-text": "#c5d1de",
      "primary-blue": "#539bf5",
      "border-color": "#444c56",
    },
  },
  plugins: [],
};
export default config;
