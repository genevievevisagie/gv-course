import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dexy brand palette — sampled from the sign-in mock
        forest: {
          DEFAULT: "#192A1F", // primary app background
          deep: "#132018", // gradient base / inputs
          surface: "#16241B", // cards
          raised: "#1E3326", // raised card / hover
        },
        border: "#2C4233",
        orange: {
          DEFAULT: "#F08C4F",
          hover: "#E67E3C",
          soft: "#F5A86E",
        },
        maroon: "#9F2A2C",
        cream: "#F5F1E8", // primary text
        muted: "#9DB0A2", // secondary text
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03), 0 8px 24px -12px rgba(0,0,0,0.6)",
        deck: "0 20px 50px -20px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "splash-grow": {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "30%": { opacity: "1" },
          "70%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1.15)", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "splash-grow": "splash-grow 2.4s ease-in-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
