import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm-neutral palette with a single muted accent.
        paper: "#F8F7F4",
        surface: "#FFFFFF",
        line: "#E4E1DA",
        muted: "#6B6760",
        ink: "#22211F",
        accent: {
          DEFAULT: "#3D6B5C",
          dark: "#2F5548",
          soft: "#EEF3F0",
        },
        danger: "#A1402F",
        warn: "#8A5A12",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
