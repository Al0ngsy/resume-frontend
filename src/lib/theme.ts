"use client";

import { createTheme } from "@mui/material/styles";

/**
 * Cyberpunk dystopian design system — dark mode only.
 * Neon yellow (#FCEE0A) + cyan (#00F0FF) accents on dark base.
 * Transparent backgrounds so the 3D city shows through.
 */

const sharedTypography = {
  fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif",
  h1: { fontWeight: 700, fontSize: "3.5rem", letterSpacing: "-0.03em" },
  h2: { fontWeight: 700, fontSize: "2.5rem", letterSpacing: "-0.02em" },
  h3: { fontWeight: 600, fontSize: "1.75rem", letterSpacing: "-0.01em" },
  h4: { fontWeight: 600, fontSize: "1.25rem" },
  body1: { fontSize: "1.1rem", lineHeight: 1.7 },
  body2: { fontSize: "0.95rem", lineHeight: 1.6 },
  button: { textTransform: "none" as const, fontWeight: 600 },
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FCEE0A" },
    secondary: { main: "#00F0FF", contrastText: "#18181b" },
    background: { default: "transparent", paper: "rgba(24, 24, 27, 0.6)" },
    text: { primary: "#fafafa", secondary: "#a1a1aa" },
    divider: "rgba(255,255,255,0.08)",
  },
  typography: sharedTypography,
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#09090b",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(9, 9, 11, 0.6)",
          borderBottom: "1px solid rgba(252, 238, 10, 0.15)",
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 999, fontWeight: 600 } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 999, fontWeight: 500 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 999 } },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(9, 9, 11, 0.85)",
        },
      },
    },
  },
});