import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: "0 0 2px 0 --tw-shadow-color",
        md: "0 0 4px 0 --tw-shadow-color",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        primary: "#2667FF",
        secondary: "#F52E8E",
        light: "#F3F5FA",
        gray: "#BCBCBC",
        darkGray: "#78797E",
        white: "#FFFFFF",
        black: "#000000",
        success: "#00C48C",
        danger: "#FF3D71",
        yellow: "#EDDE57",
        lightYellow: "#FDFCEE",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
export default config;
