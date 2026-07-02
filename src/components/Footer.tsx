"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        py: 4,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Le Quoc Anh Tran. Built with Next.js.
      </Typography>
    </Box>
  );
}