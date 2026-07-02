"use client";

import { Container, Typography, Box, Chip, Button, Divider } from "@mui/material";
import { Download } from "@mui/icons-material";
import { motion } from "framer-motion";
import siteData from "@/lib/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ResumeClient() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 } }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h1" sx={{ mb: 1 }}>
          Resume
        </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: 2, mb: 5 }}>
          <Typography variant="body1" color="text.secondary">
            Professional experience and skills.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              href="/lequocanh_tran_cv_de.pdf"
              sx={{ textTransform: "none", borderRadius: 3 }}
            >
              Download CV (DE)
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              href="/lequocanh_tran_cv_en.pdf"
              sx={{ textTransform: "none", borderRadius: 3 }}
            >
              Download CV (EN)
            </Button>
          </Box>
        </Box>
      </motion.div>

      <Divider sx={{ mb: 6 }} />

      {/* Experience */}
      <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Professional Experience
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {siteData.experience.map((exp) => (
            <Box key={exp.company}>
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

      {/* Skills */}
      <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Skills
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