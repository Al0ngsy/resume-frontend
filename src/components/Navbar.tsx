"use client";

import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { Brightness4, Brightness7, Menu as MenuIcon, Language } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { locales, localeNames, localeShortNames, type Locale } from "@/i18n/config";

export default function Navbar({
  toggleTheme,
  isDark,
}: {
  toggleTheme: () => void;
  isDark: boolean;
}) {
  const theme = useTheme();
  const { t, locale, setLocale, mounted } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langAnchor, setLangAnchor] = useState<HTMLElement | null>(null);

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.resume, href: "/resume" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const handleLangClick = (e: React.MouseEvent<HTMLElement>) => {
    setLangAnchor(e.currentTarget);
  };

  const handleLangClose = (newLocale?: Locale) => {
    if (newLocale) setLocale(newLocale);
    setLangAnchor(null);
  };

  // Use English labels for SSR to avoid hydration mismatch
  const ssrNavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];
  const activeNavLinks = mounted ? navLinks : ssrNavLinks;
  const activeShortName = mounted ? localeShortNames[locale] : "EN";

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.default",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ maxWidth: 960, width: "100%", mx: "auto", px: { xs: 2, md: 0 } }}>
          <Box component={Link} href="/" sx={{ textDecoration: "none", color: "text.primary", fontWeight: 700, fontSize: "1.25rem", flexGrow: 1 }}>
            LQAT
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {activeNavLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{ color: "text.secondary", textTransform: "none", fontWeight: 500, "&:hover": { color: "text.primary" } }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Language switcher */}
          <Button
            onClick={handleLangClick}
            startIcon={<Language />}
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 500,
              ml: 1,
              minWidth: "auto",
              "&:hover": { color: "text.primary" },
            }}
          >
            {activeShortName}
          </Button>
          <Menu
            anchorEl={langAnchor}
            open={Boolean(langAnchor)}
            onClose={() => handleLangClose()}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                },
              },
            }}
          >
            {locales.map((l) => (
              <MenuItem
                key={l}
                onClick={() => handleLangClose(l)}
                selected={locale === l}
                sx={{ textTransform: "none" }}
              >
                {localeNames[l]}
              </MenuItem>
            ))}
          </Menu>

          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "text.secondary" }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={toggleTheme} sx={{ ml: 1 }}>
            {isDark ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 260,
              bgcolor: "background.default",
              color: "text.primary",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
            <MenuIcon />
          </IconButton>
        </Box>
        <List>
          {activeNavLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          {locales.map((l) => (
            <ListItem key={l} disablePadding>
              <ListItemButton
                onClick={() => {
                  setLocale(l);
                  setMobileOpen(false);
                }}
                selected={locale === l}
              >
                <ListItemText primary={localeNames[l]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}