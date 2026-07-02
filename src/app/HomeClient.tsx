"use client";

import { Container, Typography, Box, Grid, Chip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import siteData from "@/lib/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function HomeClient() {
  return (
    <>
      <Hero />

      {/* Featured Projects */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div {...fadeIn}>
          <Typography variant="h2" sx={{ mb: 1, textAlign: "center" }}>
            Featured Projects
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 5, textAlign: "center", maxWidth: 500, mx: "auto" }}
          >
            A selection of projects that showcase my approach to building
            reliable, scalable backend systems.
          </Typography>
        </motion.div>
        <Grid container spacing={3}>
          {siteData.projects.slice(0, 3).map((project, i) => (
            <Grid key={project.title} size={{ xs: 12, md: 6, lg: 4 }}>
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

      {/* Skills Summary */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <motion.div {...fadeIn}>
          <Typography variant="h2" sx={{ mb: 1, textAlign: "center" }}>
            Skills &amp; Technologies
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 5, textAlign: "center", maxWidth: 500, mx: "auto" }}
          >
            Tools and technologies I work with daily.
          </Typography>
        </motion.div>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {siteData.skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              {...fadeIn}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>
                {skill.category}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
                {skill.items.map((item) => (
                  <Chip key={item} label={item} variant="outlined" />
                ))}
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </>
  );
}