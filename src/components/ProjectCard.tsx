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

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        transition: "border-color 0.2s",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
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
            <Chip key={tech} label={tech} size="small" variant="outlined" />
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
            sx={{ textTransform: "none" }}
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
            sx={{ textTransform: "none" }}
          >
            {t.projects.live}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}