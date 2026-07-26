"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";
import { accentGradient } from "@/lib/theme";

export default function Hero() {
  const { t } = useLanguage();
  const { data: siteData } = useSiteData();

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Animated background blob */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: { xs: -80, md: -120 },
          left: { xs: -80, md: -120 },
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: "50%",
          background: accentGradient,
          opacity: 0.2,
          filter: "blur(80px)",
          animation: "pulseSlow 6s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: { xs: 8, md: 14 },
        }}
      >
        {/* Avatar with glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              position: "relative",
              mb: 3,
              width: 128,
              height: 128,
            }}
          >
            {/* Glow ring behind avatar */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: accentGradient,
                opacity: 0.6,
                filter: "blur(20px)",
                animation: "glow 3s ease-in-out infinite",
              }}
            />
            {/* Avatar */}
            <Box
              component="img"
              src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Anh"
              alt="avatar"
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "4px solid",
                borderColor: "divider",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                zIndex: 1,
                bgcolor: "background.paper",
              }}
            />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.75rem" },
              fontWeight: 800,
              mb: 2,
              lineHeight: 1.1,
            }}
          >
            {siteData.name}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              fontWeight: 600,
              mb: 3,
              background: accentGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {siteData.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 540,
              mx: "auto",
              mb: 5,
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            {siteData.introduction}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              href="/projects"
              size="large"
              endIcon={<ArrowForward />}
              disableElevation
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#fff",
                background: accentGradient,
                boxShadow: "0 8px 24px rgba(236, 72, 153, 0.35)",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 32px rgba(236, 72, 153, 0.45)",
                  background: accentGradient,
                },
              }}
            >
              {t.hero.viewProjects}
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                borderWidth: 2,
                borderColor: "divider",
                "&:hover": {
                  borderWidth: 2,
                  borderColor: "primary.main",
                  background: "rgba(236, 72, 153, 0.08)",
                },
              }}
            >
              {t.hero.getInTouch}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}