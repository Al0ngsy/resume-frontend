"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";

const feTechStack = [
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

const beTechStack = [
  "Python 3.11",
  "FastAPI",
  "OpenAI SDK",
  "Pydantic Settings",
  "SlowAPI",
  "structlog",
  "tiktoken",
  "uvicorn",
  "Render",
];

export default function Footer() {
  const { t } = useLanguage();

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
        &copy; {new Date().getFullYear()} {t.footer.copyright}
      </Typography>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 0.5 }}
          >
            {t.footer.frontend}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: "center", flexWrap: "wrap" }}
          >
            {feTechStack.map((tech) => (
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
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 0.5 }}
          >
            {t.footer.backend}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: "center", flexWrap: "wrap" }}
          >
            {beTechStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                color="secondary"
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}