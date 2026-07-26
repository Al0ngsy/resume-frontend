"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CyberpunkScene from "@/components/CyberpunkScene";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { darkTheme, lightTheme } from "@/lib/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { useEffect, useMemo, useState } from "react";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  // Respect prefers-reduced-motion: skip 3D if user prefers it
  const [enable3D, setEnable3D] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnable3D(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnable3D(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Fixed cyberpunk city background */}
        {enable3D && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <CyberpunkScene />
          </div>
        )}
        {/* Dark overlay for readability (always present, even without 3D) */}
        {!enable3D && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 0,
              backgroundColor: "#09090b",
              backgroundImage:
                "linear-gradient(rgba(252,238,10,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />
        )}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(9,9,11,0.7) 0%, rgba(9,9,11,0.5) 50%, rgba(9,9,11,0.8) 100%)",
          }}
        />
        <LanguageProvider>
          <div
            style={{
              position: "relative",
              zIndex: 2,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar toggleTheme={() => setDarkMode((p) => !p)} isDark={darkMode} />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}