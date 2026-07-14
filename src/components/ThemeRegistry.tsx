"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { darkTheme, lightTheme } from "@/lib/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { useMemo, useState } from "react";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar toggleTheme={() => setDarkMode((p) => !p)} isDark={darkMode} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
