"use client";

import { createTheme } from "@mui/material/styles";

/**
 * Shared gradient used throughout the UI for accent buttons, borders, glows.
 * Matches the pink → red → orange aesthetic from the personal-landing component.
 */
export const accentGradient =
  "linear-gradient(to top right, #ec4899, #ef4444, #fb923c)";

export const accentGradientR =
  "linear-gradient(to right, #ef4444, #ec4899, #fb923c)";

/**
 * Shared typography — Inter-first stack with Geist fallback.
 * Both light and dark themes use the same typography scale.
 */
const sharedTypography = {
  fontFamily:
    'Inter, var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  h1: { fontWeight: 800, fontSize: "3.5rem", letterSpacing: "-0.03em" },
  h2: { fontWeight: 700, fontSize: "2.25rem", letterSpacing: "-0.02em" },
  h3: { fontWeight: 600, fontSize: "1.75rem", letterSpacing: "-0.01em" },
  h4: { fontWeight: 600, fontSize: "1.25rem" },
  body1: { fontSize: "1.1rem", lineHeight: 1.7 },
  body2: { fontSize: "0.95rem", lineHeight: 1.6 },
  button: { textTransform: "none" as const, fontWeight: 600 },
};

/**
 * Light theme — adapted to the dark-first design.
 * Uses soft white/zinc tones with the pink-red-orange gradient accent.
 */
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#ec4899" },
    secondary: { main: "#fb923c", contrastText: "#ffffff" },
    background: {
      default: "#f4f4f5",
      paper: "#ffffff",
    },
    text: { primary: "#18181b", secondary: "#52525b" },
    divider: "#e4e4e7",
  },
  typography: sharedTypography,
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f4f4f5",
          backgroundImage:
            "radial-gradient(ellipse at top left, rgba(236, 72, 153, 0.06), transparent 50%), radial-gradient(ellipse at bottom right, rgba(251, 146, 60, 0.06), transparent 50%)",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

/**
 * Dark theme — the primary look, matching the personal-landing component.
 * Deep zinc gradient background, glassmorphic paper, gradient accents.
 */
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ec4899" },
    secondary: { main: "#fb923c", contrastText: "#ffffff" },
    background: {
      default: "#09090b",
      paper: "#18181b",
    },
    text: { primary: "#fafafa", secondary: "#a1a1aa" },
    divider: "#27272a",
  },
  typography: sharedTypography,
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#09090b",
          backgroundImage:
            "linear-gradient(to bottom right, #18181b, #09090b, #18181b)",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(9, 9, 11, 0.8)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
  },
});