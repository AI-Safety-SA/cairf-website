/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // CAISAF Primary Colors
        primary: "hsl(var(--color-primary) / <alpha-value>)",

        // CAISAF Secondary Colors
        white: "hsl(var(--color-white) / <alpha-value>)",
        "blue-light": "hsl(var(--color-blue-light) / <alpha-value>)",
        "green-dark": "hsl(var(--color-green-dark) / <alpha-value>)",

        // CAISAF Tertiary Colors
        yellow: "hsl(var(--color-yellow) / <alpha-value>)",
        mud: "hsl(var(--color-mud) / <alpha-value>)",
        black: "hsl(var(--color-black) / <alpha-value>)",
        "mud-light": "hsl(var(--color-mud-light) / <alpha-value>)",

        // CAISAF Serif Colors
        button: "hsl(var(--color-button) / <alpha-value>)",

        // Neutral Colors for UI
        "text-base": "hsl(var(--color-text-base) / <alpha-value>)",
        "text-muted": "hsl(var(--color-text-muted) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        "surface-alt": "hsl(var(--color-surface-alt) / <alpha-value>)",
      },

      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
        "work-sans": ["Work Sans", "system-ui", "sans-serif"],
      },

      fontSize: {
        // Special sizes from typography.md
        special: ["3rem", { lineHeight: "4rem" }], // 48/64
        brand: ["1.5rem", { lineHeight: "auto" }], // 24/auto
        "nav-link": ["1.25rem", { lineHeight: "auto" }], // 20/auto
        label: ["0.75rem", { lineHeight: "1.5rem" }], // 12/24

        // Standard sizes
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12/16
        sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14/20
        base: ["1rem", { lineHeight: "1.5rem" }], // 16/24
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18/28
        xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20/28
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24/32
        "3xl": ["2rem", { lineHeight: "2.25rem" }], // 32/36
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36/40
        "5xl": ["3rem", { lineHeight: "1" }], // 48/48
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60/60
      },

      spacing: {
        // Extended spacing scale for better proportions
        18: "4.5rem", // 72px
        88: "22rem", // 352px
        128: "32rem", // 512px
        144: "36rem", // 576px
      },

      letterSpacing: {
        button: "0.06em", // 6% letter spacing for buttons
      },
    },
  },
  plugins: [],
};
