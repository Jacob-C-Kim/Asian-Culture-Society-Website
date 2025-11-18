/**
 * Design Tokens
 * Centralized design system values extracted from Figma-generated code
 */

export const colors = {
  // Primary brand colors
  primary: {
    teal: "#99E3ED",
    tealDark: "#8BD4E0",
    darkTeal: "#94D1D0",
    navy: "#195259",
    darkNavy: "#23464b",
    slate: "#2C3E50",
  },

  // Semantic colors
  white: "#FFFFFF",
  black: "#000000",

  // Alpha colors (for overlays)
  whiteAlpha: {
    10: "rgba(255, 255, 255, 0.1)",
    20: "rgba(255, 255, 255, 0.2)",
    50: "rgba(255, 255, 255, 0.5)",
    80: "rgba(255, 255, 255, 0.8)",
    90: "rgba(255, 255, 255, 0.9)",
  },

  blackAlpha: {
    60: "rgba(0, 0, 0, 0.6)",
    80: "rgba(0, 0, 0, 0.8)",
  },

  gray: {
    200: "#e5e7eb",
    400: "#9ca3af",
  },
};

export const spacing = {
  // Card spacing
  card: {
    padding: "18px",
    paddingLg: "20px",
  },

  // Custom gap values
  gap: {
    5: "5px",
    18: "18px",
    72: "72px",
  },
};

export const fontFamilies = {
  lexend: {
    regular: "'Lexend', 'Lexend:Regular', sans-serif",
    medium: "'Lexend', 'Lexend:Medium', sans-serif",
    bold: "'Lexend', 'Lexend:Bold', sans-serif",
  },
  avantGarde: {
    bold: "'ITC Avant Garde Gothic', 'ITC_Avant_Garde_Gothic:Bold', sans-serif",
  },
  inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

export const borderRadius = {
  card: "15px",
  button: "10px",
  large: "18px",
};

export const shadows = {
  text: {
    default: "2px 2px 4px rgba(0, 0, 0, 0.8)",
    glow: "0px 0px 8px rgba(0, 0, 0, 0.6)",
    combined: "2px 2px 4px rgba(0, 0, 0, 0.8), 0px 0px 8px rgba(0, 0, 0, 0.6)",
  },
};

export const transitions = {
  default: "all 0.2s ease",
  smooth: "all 0.3s ease-out",
  calendar: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
};
