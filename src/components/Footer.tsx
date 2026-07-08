"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";

const techStack = [
  "React 19",
  "Next.js 16",
  "TypeScript",
  "MUI v9",
  "Framer Motion",
  "Emotion",
  "Tailwind CSS",
  "Cloudflare",
  "Yarn Berry",
];

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
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        &copy; {new Date().getFullYear()} Le Quoc Anh Tran.
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ justifyContent: "center", flexWrap: "wrap" }}
      >
        {techStack.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            variant="outlined"
            color="primary"
          />
        ))}
      </Stack>
    </Box>
  );
}
