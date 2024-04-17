import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      greenPrimary: "#1AB2A5",
      greenSecondary: "#6CD200",
      red: "#F20D0D",
      blue: "#00CBDD",
      orange: "#F07D1A",
      pinkGradient: {
        light: "#FF00FF",
        dark: "#B12BFF",
      },
      greenGradient: {
        light: "#23B2A4",
        dark: "#3CA55B",
      },
      grayPrimary: "#d0d0d0",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      serif: ["Montserrat", "sans-serif"],
      mono: ["Montserrat", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-image": 'url("/assets/images/hero.svg")',
      },
    },
  },
  plugins: [],
};
export default config;
