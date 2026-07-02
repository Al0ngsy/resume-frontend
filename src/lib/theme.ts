"use client";

import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0f172a" },
    secondary: { main: "#6366f1" },
    background: { default: "#ffffff", paper: "#f8fafc" },
    text: { primary: "#0f172a", secondary: "#475569" },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
    h1: { fontWeight: 700, fontSize: "3.5rem", letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, fontSize: "2.5rem", letterSpacing: "-0.01em" },
    h3: { fontWeight: 600, fontSize: "1.75rem" },
    h4: { fontWeight: 600, fontSize: "1.25rem" },
    body1: { fontSize: "1.1rem", lineHeight: 1.7 },
    body2: { fontSize: "0.95rem", color: "#475569" },
  },
  shape: { borderRadius: 12 },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e2e8f0" },
    secondary: { main: "#818cf8" },
    background: { default: "#0a0a0a", paper: "#111111" },
    text: { primary: "#e2e8f0", secondary: "#94a3b8" },
  },
  typography: lightTheme.typography,
  shape: { borderRadius: 12 },
});