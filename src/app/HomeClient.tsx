"use client";

import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import RecruiterChat from "@/components/RecruiterChat";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function HomeClient() {
  const { t } = useLanguage();
  const { data: siteData } = useSiteData();

  return (
    <>
      <Hero />

      {/* AI Recruiter Chat */}
      <RecruiterChat />

      {/* Featured Projects */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div {...fadeIn}>
          <Typography variant="h2" sx={{ mb: 1, textAlign: "center" }}>
            {t.home.featuredProjects}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 5, textAlign: "center", maxWidth: 500, mx: "auto" }}
          >
            {t.home.featuredProjectsSubtitle}
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
            {t.home.skills}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 5, textAlign: "center", maxWidth: 500, mx: "auto" }}
          >
            {t.home.skillsSubtitle}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
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