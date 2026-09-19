import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EC",
        ink: "#16231C",
        pine: "#1F4D3A",
        "pine-light": "#2F6F4E",
        gold: "#B8892F",
        line: "#DAD3BE",
        rust: "#9A3324",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "serif"],
        sans: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
