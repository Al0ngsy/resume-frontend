"use client";

import { Download } from "@mui/icons-material";
import { Container, Typography, Box, Chip, Button, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ResumeClient() {
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
          {t.resume.title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: 2, mb: 5 }}>
          <Typography variant="body1" color="text.secondary">
            {t.resume.subtitle}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              href="/lequocanh_tran_cv_de.pdf"
              download
              disableElevation
              sx={{
                textTransform: "none",
                borderRadius: 999,
                bgcolor: "#FCEE0A",
                color: "#18181b",
                boxShadow: "0 0 16px rgba(252, 238, 10, 0.2)",
                px: 3,
                py: 1.2,
                "&:hover": {
                  bgcolor: "#FFD700",
                  boxShadow: "0 0 24px rgba(252, 238, 10, 0.4)",
                },
              }}
            >
              {t.resume.downloadCvDe}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              href="/lequocanh_tran_cv_en.pdf"
              download
              sx={{
                textTransform: "none",
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(0, 240, 255, 0.3)",
                color: "#00F0FF",
                backdropFilter: "blur(8px)",
                bgcolor: "rgba(24, 24, 27, 0.4)",
                px: 3,
                py: 1.2,
                "&:hover": {
                  borderWidth: 1,
                  borderColor: "#00F0FF",
                  bgcolor: "rgba(24, 24, 27, 0.6)",
                  boxShadow: "0 0 16px rgba(0, 240, 255, 0.15)",
                },
              }}
            >
              {t.resume.downloadCvEn}
            </Button>
          </Box>
        </Box>
      </motion.div>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: "block",
          mb: 5,
          fontStyle: "italic",
          opacity: 0.7,
        }}
      >
        {t.resume.referencesNote}
      </Typography>

      <Divider sx={{ mb: 6 }} />

      {/* Experience */}
      <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          {t.resume.professionalExperience}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {siteData.experience.map((exp) => (
            <Box key={exp.company + exp.title} sx={{ borderLeft: "2px solid", borderColor: "divider", pl: 3, position: "relative" }}>
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
          {t.resume.skills}
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