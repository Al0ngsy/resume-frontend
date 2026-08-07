"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Project } from "@/types";
import { Business, GitHub, Launch } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const liveUrls = project.liveUrls ?? [];

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.08)",
        borderRadius: 4,
        bgcolor: "rgba(24, 24, 27, 0.5)",
        backdropFilter: "blur(12px)",
        transition: "all 0.2s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "&:hover": {
          borderColor: "rgba(252, 238, 10, 0.4)",
          boxShadow: "0 0 24px rgba(252, 238, 10, 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: compact ? 2.5 : 3, flex: 1 }}>
        <Typography variant={compact ? "h5" : "h4"} gutterBottom>
          {project.title}
        </Typography>
        {project.context && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}
          >
            <Business fontSize="small" />
            {project.context}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>
        {!compact && (
          <>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                {t.projects.problem}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.problem}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                {t.projects.solution}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.solution}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }} gutterBottom>
                {t.projects.challengesLessons}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.challenges} {project.lessons}
              </Typography>
            </Box>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 0.5,
            mt: 2,
          }}
        >
          {project.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "divider",
                "&:hover": {
                  borderColor: "#52525b",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions
        sx={{ px: compact ? 2.5 : 3, pb: 2, flexWrap: "wrap", gap: 1 }}
      >
        {project.github && (
          <Button
            size="small"
            startIcon={<GitHub />}
            href={project.github}
            target="_blank"
            sx={{
              textTransform: "none",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            {t.projects.code}
          </Button>
        )}
        {liveUrls.map((url) => (
          <Button
            key={url}
            size="small"
            startIcon={<Launch />}
            href={url}
            target="_blank"
            sx={{
              textTransform: "none",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            {new URL(url).hostname.replace(/^www\./, "")}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}
