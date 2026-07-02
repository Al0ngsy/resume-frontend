"use client";

import { Container, Typography, Box, Chip, Divider } from "@mui/material";
import { motion } from "framer-motion";
import siteData from "@/lib/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function AboutClient() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 } }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h1" sx={{ mb: 3 }}>
          About
        </Typography>
      </motion.div>

      {/* Career Summary */}
      <motion.div {...fadeIn} transition={{ delay: 0.1, duration: 0.5 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: { xs: "1rem", md: "1.1rem" } }}>
          {siteData.careerSummary}
        </Typography>
      </motion.div>

      <Divider sx={{ mb: 6 }} />

      {/* Engineering Philosophy */}
      <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Engineering Philosophy
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          {siteData.philosophy}
        </Typography>
      </motion.div>

      <Divider sx={{ mb: 6 }} />

      {/* Timeline */}
      <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Experience
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {siteData.experience.map((exp, i) => (
            <Box key={exp.company + exp.title + i} sx={{ borderLeft: "2px solid", borderColor: "divider", pl: 3, position: "relative" }}>
              <Typography variant="h4">{exp.title}</Typography>
              <Typography variant="body2" color="secondary" sx={{ mb: 1 }}>
                {exp.company} &middot; {exp.period}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {exp.description}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
                {exp.technologies.map((tech) => (
                  <Chip key={tech} label={tech} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </motion.div>

      <Divider sx={{ my: 6 }} />

      {/* Technologies */}
      <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Technologies
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {siteData.skills.map((skill) => (
            <Box key={skill.category}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {skill.category}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
                {skill.items.map((item) => (
                  <Chip key={item} label={item} variant="outlined" />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
}