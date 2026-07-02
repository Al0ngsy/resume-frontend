"use client";

import { Container, Typography, Button, Box } from "@mui/material";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { motion } from "framer-motion";
import siteData from "@/lib/data";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function ContactClient() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 } }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h1" sx={{ mb: 1 }}>
          Contact
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 500 }}>
          I&apos;m always open to discussing new opportunities, collaborations, or
          interesting backend engineering challenges.
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
            GitHub
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
            LinkedIn
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}