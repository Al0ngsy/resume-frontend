"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";
import { ArrowDownward, Email, GitHub, LinkedIn } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const { t } = useLanguage();
  const { data: siteData } = useSiteData();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Name + title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.75rem" },
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            {siteData.name}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              fontWeight: 600,
              mb: 4,
              color: "text.secondary",
            }}
          >
            {siteData.title}
          </Typography>

          {/* Tagline */}
          <Box sx={{ maxWidth: 480, mx: "auto", mb: 5 }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, mb: 0.5 }}
            >
              {siteData.introduction}
            </Typography>
          </Box>

          {/* CTA buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              mb: 5,
            }}
          >
            <Button
              component={Link}
              href="/contact"
              size="large"
              startIcon={<Email />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                bgcolor: "#FCEE0A",
                color: "#18181b",
                boxShadow: "0 0 20px rgba(252, 238, 10, 0.3)",
                "&:hover": {
                  bgcolor: "#FFD700",
                  boxShadow: "0 0 28px rgba(252, 238, 10, 0.5)",
                },
              }}
            >
              {t.hero.getInTouch}
            </Button>
            <Button
              component={Link}
              href="/projects"
              variant="outlined"
              size="large"
              endIcon={<ArrowDownward />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                borderWidth: 1,
                borderColor: "divider",
                color: "text.primary",
                backdropFilter: "blur(8px)",
                bgcolor: "rgba(24, 24, 27, 0.4)",
                "&:hover": {
                  borderWidth: 1,
                  borderColor: "text.primary",
                  bgcolor: "rgba(24, 24, 27, 0.6)",
                },
              }}
            >
              {t.hero.viewProjects}
            </Button>
          </Box>

          {/* Circular social icons */}
          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
            <IconButton
              href={siteData.github}
              target="_blank"
              aria-label="GitHub"
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "rgba(24, 24, 27, 0.6)",
                border: "1px solid",
                borderColor: "rgba(252, 238, 10, 0.3)",
                color: "#FCEE0A",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "rgba(24, 24, 27, 0.8)",
                  borderColor: "#FCEE0A",
                  boxShadow: "0 0 16px rgba(252, 238, 10, 0.3)",
                },
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href={siteData.linkedin}
              target="_blank"
              aria-label="LinkedIn"
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "rgba(24, 24, 27, 0.6)",
                border: "1px solid",
                borderColor: "rgba(0, 240, 255, 0.3)",
                color: "#00F0FF",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "rgba(24, 24, 27, 0.8)",
                  borderColor: "#00F0FF",
                  boxShadow: "0 0 16px rgba(0, 240, 255, 0.3)",
                },
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href={`mailto:${siteData.email}`}
              aria-label="Email"
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "rgba(24, 24, 27, 0.6)",
                border: "1px solid",
                borderColor: "rgba(252, 238, 10, 0.3)",
                color: "#FCEE0A",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "rgba(24, 24, 27, 0.8)",
                  borderColor: "#FCEE0A",
                  boxShadow: "0 0 16px rgba(252, 238, 10, 0.3)",
                },
              }}
            >
              <Email />
            </IconButton>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}
