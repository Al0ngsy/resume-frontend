"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";

// Only the tech actually used to build & deploy THIS resume project's FE and BE
const techGroups = [
  {
    key: "frontend" as const,
    chips: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "MUI v9",
      "Framer Motion",
      "Three.js / R3F",
      "Cloudflare Workers",
    ],
    color: "#FCEE0A",
  },
  {
    key: "backend" as const,
    chips: [
      "Python 3.11",
      "FastAPI",
      "SQLAlchemy 2.0",
      "asyncpg",
      "Alembic",
      "pgvector",
      "Neon PostgreSQL",
      "Jina AI",
      "OpenAI SDK",
      "Render",
    ],
    color: "#00F0FF",
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "rgba(252, 238, 10, 0.15)",
        py: 4,
        mt: "auto",
        textAlign: "center",
        backdropFilter: "blur(16px)",
        bgcolor: "rgba(9, 9, 11, 0.7)",
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        &copy; {new Date().getFullYear()} {t.footer.copyright}
      </Typography>
      <Stack spacing={2.5} sx={{ alignItems: "center" }}>
        {techGroups.map((group) => (
          <Box key={group.key}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mb: 0.75,
                color: group.color,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "0.7rem",
              }}
            >
              {t.footer[group.key]}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ justifyContent: "center", flexWrap: "wrap" }}
            >
              {group.chips.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: `${group.color}40`,
                    color: "#e4e4e7",
                    bgcolor: "rgba(24, 24, 27, 0.4)",
                    "&:hover": {
                      borderColor: group.color,
                      bgcolor: "rgba(24, 24, 27, 0.6)",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}