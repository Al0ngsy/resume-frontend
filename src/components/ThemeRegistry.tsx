"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CyberpunkScene from "@/components/CyberpunkScene";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { darkTheme } from "@/lib/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { useSyncExternalStore } from "react";

// prefers-reduced-motion as an external store: SSR + first client render
// assume 3D is fine; after hydration the real media query wins.
function subscribeReducedMotion(onStoreChange: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const enable3D = !reducedMotion;

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* 3D city background or static grid fallback */}
        {enable3D ? (
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
        ) : (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 0,
              pointerEvents: "none",
              backgroundColor: "#09090b",
              backgroundImage:
                "linear-gradient(rgba(252,238,10,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        )}
        {/* Dark readability overlay */}
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
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}