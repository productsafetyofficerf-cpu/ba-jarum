import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f5f6f7",
        foreground: "#2c3338",
        card: "#ffffff",
        primary: "#1e3a5f",
        "primary-light": "#2d5a8a",
        accent: "#e8a838",
        "accent-dark": "#d4912a",
        muted: "#eef0f2",
        destructive: "#c0392b",
        success: "#2d8a5f",
        input: "#d8dde2",
        auth: "#f0f2f4",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      boxShadow: {
        photo: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        form: "0 4px 12px rgba(0,0,0,0.05), 0 16px 48px rgba(0,0,0,0.12)",
        shutter: "0 0 24px rgba(232, 168, 56, 0.5), 0 0 48px rgba(232, 168, 56, 0.3)",
        logo: "0 0 0 4px #f5f6f7, 0 0 0 5px rgba(232, 168, 56, 0.4)",
        elevated: "0 8px 32px rgba(0,0,0,0.12)",
      },
      keyframes: {
        "logo-in": {
          "0%": { opacity: "0", transform: "scale(0.8) translateY(-10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "form-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shutter-pulse": {
          "0%, 100%": { boxShadow: "0 0 24px rgba(232, 168, 56, 0.5)" },
          "50%": { boxShadow: "0 0 36px rgba(232, 168, 56, 0.8), 0 0 64px rgba(232, 168, 56, 0.4)" },
        },
        "shutter-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "logo-in": "logo-in 0.5s ease-out",
        "form-in": "form-in 0.45s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "shutter-pulse": "shutter-pulse 2s ease-in-out infinite",
        "shutter-spin": "shutter-spin 8s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
