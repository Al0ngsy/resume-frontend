"use client";

import { Container, Typography, Button, Box } from "@mui/material";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ContactClient() {
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
          {t.contact.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 500 }}>
          {t.contact.subtitle}
        </Typography>
      </motion.div>

      <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Email />}
            href={`mailto:${siteData.email}`}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
            }}
          >
            {siteData.email}
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GitHub />}
            href={siteData.github}
            target="_blank"
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
            }}
          >
            {t.contact.github}
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<LinkedIn />}
            href={siteData.linkedin}
            target="_blank"
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
            }}
          >
            {t.contact.linkedin}
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}