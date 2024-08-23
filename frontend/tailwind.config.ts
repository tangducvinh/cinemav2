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
      flex: {
        "2": "2 2 0%",
        "3": "3 3 0%",
        "4": "4 4 0%",
        "5": "5 5 0%",
        "6": "6 6 0%",
        "7": "7 7 0%",
      },
      colors: {
        normal: "#4A4A4A",
        main: "#f5811f",
        overlay: "#333333",
        forcus: "#034EA2",
        "bg-overlay": "rgba(0, 0, 0, 0.5)",
        "overlay-main": "rgba(251, 148, 64, .8);",
      },
      width: {
        main: "1280px",
        "main-lg": "400px",
      },
      animation: {
        wiggle: "wiggle 0.2s linear",
      },
      keyframes: {
        wiggle: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      gridColumn: {
        // "span-13": "span 13 / span 13",
        // "span-14": "span 14 / span 14",
        // "span-15": "span 15 / span 15",
        // "span-16": "span 16 / span 16",
        // "span-17": "span 17 / span 17",
        // "span-18": "span 18 / span 18",
        // "span-19": "span 19 / span 19",
        // "span-20": "span 20 / span 20",
      },
      gridTemplateColumns: {
        "11": "repeat(11, minmax(0, 1fr))",
        "12": "repeat(12, minmax(0, 1fr))",
        "13": "repeat(13, minmax(0, 1fr))",
        "14": "repeat(14, minmax(0, 1fr))",
        "15": "repeat(15, minmax(0, 1fr))",
        "16": "repeat(16, minmax(0, 1fr))",
        "17": "repeat(17, minmax(0, 1fr))",
        "18": "repeat(18, minmax(0, 1fr))",
        "19": "repeat(19, minmax(0, 1fr))",
        "20": "repeat(20, minmax(0, 1fr))",
        "21": "repeat(21, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
