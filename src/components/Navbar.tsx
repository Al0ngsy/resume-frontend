"use client";

import { AppBar, Toolbar, Button, Box, IconButton, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  toggleTheme,
  isDark,
}: {
  toggleTheme: () => void;
  isDark: boolean;
}) {
  const theme = useTheme();

  return (
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
          CT
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {navLinks.map((link) => (
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
        <IconButton onClick={toggleTheme} sx={{ ml: 1 }}>
          {isDark ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}