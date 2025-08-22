import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  // App Router support via content globs (JIT is default in Tailwind v3+)
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Enable dark mode using the class strategy
  darkMode: "class",

  theme: {
    // Custom breakpoints (range-based)
    // xs: 0–575px, sm: 576–767px, md: 768–991px, lg: 992–1199px,
    // xl: 1200–1399px, xxl: 1400px+
    screens: {
      xs: { max: "575px" },
      sm: { min: "576px", max: "767px" },
      md: { min: "768px", max: "991px" },
      lg: { min: "992px", max: "1199px" },
      xl: { min: "1200px", max: "1399px" },
      xxl: { min: "1400px" },
    },

    // Centered container with responsive max-widths
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2rem",
        xxl: "3rem",
      },
      screens: {
        // Typical max-widths corresponding to the above breakpoints
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        xxl: "1320px",
      },
    },

    extend: {
      // Protegrity branding colors
      colors: {
        primary: "#fa5a25", // CTA buttons and highlights
        secondary: "#373737", // Headings and wordmark
        background: "#ffffff", // Surfaces (light)
        text: "#181818", // Paragraphs (dark)
        contrast: "#ffffff", // Hover states and overlays
      },

      // Font families
      fontFamily: {
        // Override the default sans font with DINPro
        sans: ["var(--font-din-pro)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },

  // Safelist dynamic utilities and state variants you might generate at runtime
  safelist: [
    {
      pattern: /(bg|text|border)-(primary|secondary|background|text|contrast)/,
      variants: ["hover", "focus", "active", "dark"],
    },
    {
      pattern: /(from|via|to)-(primary|secondary|contrast)/,
    },
    {
      pattern: /(ring|shadow)-(sm|md|lg)/,
      variants: ["hover", "focus"],
    },
  ],

  plugins: [
    // Basic accessibility enhancements
    plugin(function ({ addBase, theme, addUtilities }) {
      // Focus-visible outlines with transition support
      addBase({
        ":focus-visible": {
          outline: `2px solid ${theme("colors.contrast")}`,
          outlineOffset: "2px",
          transitionProperty: "outline-color, outline-offset",
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
        body: {
          color: theme("colors.text"),
          backgroundColor: theme("colors.background"),
        },
        // Prefer color contrast for default text
        "html[lang='en']": {
          // Ensures language attribute handling; already set in layout.tsx
          // This also provides a stable hook for locale-specific overrides
        },
        // Motion reduction respect
        "@media (prefers-reduced-motion: reduce)": {
          ":root": {
            scrollBehavior: "auto",
          },
          "*": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
          },
        },
      });

      // Line clamp utilities
      addUtilities({
        '.line-clamp-2': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
        '.line-clamp-3': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
      });
    }),
  ],
};

export default config;

