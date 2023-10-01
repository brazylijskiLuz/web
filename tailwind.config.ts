import { useA11yStore } from "@/stores/a11y.store";
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
        primary: "rgb(var(--primary-colors))",
        secondary: "rgb(var(--secondary-colors))",
        light: "rgb(var(--light-colors))",
        gray: "rgb(var(--gray-colors))",
        darkGray: "rgb(var(--darkGray-colors))",
        white: "rgb(var(--white-colors))",
        black: "rgb(var(--black-colors))",
        success: "rgb(var(--success-colors))",
        danger: "rgb(var(--danger-colors))",
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
