import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          900: "#12131A",
          800: "#21222C",
          700: "#2A2B37",
          600: "#404254",
          500: "#E4E4EF",
          400: "#F2F2F7",
        },
        purple: {
          500: "#C27CF8",
          400: "#D3A0FA",
        },
        yellow: {
          500: "#FF9F00",
        },
        orange: {
          800: "#DA3701",
          500: "#FE8159",
        },
      },
      boxShadow: {
        "text-area": "0 0 10px theme('colors.purple.400')",
        "text-area-error": "0 0 10px theme('colors.orange.800')",
        "text-area-error-dark": "0 0 10px theme('colors.orange.500')",
      },
    },
  },
  darkMode: "selector",
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
