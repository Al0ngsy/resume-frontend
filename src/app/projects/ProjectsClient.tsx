"use client";

import { Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import siteData from "@/lib/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ProjectsClient() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 } }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h1" sx={{ mb: 1 }}>
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 600 }}>
          Detailed case studies of systems I&apos;ve built, including the problems they solved
          and the lessons learned along the way.
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