"use client";

import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";
import { Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ProjectsClient() {
  const { t } = useLanguage();
  const { data: siteData } = useSiteData();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 } }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h1" sx={{ mb: 1 }}>
          {t.projects.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 600 }}>
          {t.projects.subtitle}
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {siteData.projects.map((project, i) => (
          <Grid key={project.title} size={{ xs: 12, md: 6 }}>
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}