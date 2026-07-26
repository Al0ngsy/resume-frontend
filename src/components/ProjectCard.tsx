"use client";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { GitHub, Launch } from "@mui/icons-material";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Project } from "@/types";
import { accentGradient } from "@/lib/theme";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
        bgcolor: "rgba(24, 24, 27, 0.8)",
        backdropFilter: "blur(8px)",
        transition: "all 0.2s",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-2px)",
          boxShadow: "0 12px 40px rgba(236, 72, 153, 0.15)",
        },
      }}
    >
      {/* Gradient accent strip on top */}
      <Box
        aria-hidden
        sx={{
          height: 3,
          background: accentGradient,
          opacity: 0.6,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>
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
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 0.5, mt: 2 }}>
          {project.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "divider",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "rgba(236, 72, 153, 0.08)",
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ px: 3, pb: 2 }}>
        {project.github && (
          <Button
            size="small"
            startIcon={<GitHub />}
            href={project.github}
            target="_blank"
            sx={{ textTransform: "none", borderRadius: 999 }}
          >
            {t.projects.code}
          </Button>
        )}
        {project.liveUrl && (
          <Button
            size="small"
            startIcon={<Launch />}
            href={project.liveUrl}
            target="_blank"
            sx={{ textTransform: "none", borderRadius: 999 }}
          >
            {t.projects.live}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}