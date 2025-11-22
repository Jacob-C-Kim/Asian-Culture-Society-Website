/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        "acs-teal": "#99E3ED",
        "acs-teal-dark": "#8BD4E0",
        "acs-teal-alt": "#94D1D0",
        "acs-navy": "#195259",
        "acs-navy-dark": "#23464b",
        "acs-slate": "#2C3E50",
      },
      fontFamily: {
        lexend: ["'Lexend'", "sans-serif"],
        "avant-garde": ["'ITC Avant Garde Gothic'", "sans-serif"],
        inter: [
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        4.5: "1.125rem", // 18px
        18: "4.5rem", // 72px
      },
      borderRadius: {
        card: "15px",
        large: "18px",
      },
      transitionTimingFunction: {
        "calendar-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
