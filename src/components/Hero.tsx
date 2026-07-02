"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import siteData from "@/lib/data";

export default function Hero() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 10, md: 16 }, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 2 }}
          >
            {siteData.name}
          </Typography>
          <Typography
            variant="h3"
            color="secondary"
            sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 500, mb: 3 }}
          >
            {siteData.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 5, fontSize: { xs: "1rem", md: "1.1rem" } }}
          >
            {siteData.introduction}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
            <Button
              component={Link}
              href="/projects"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              View Projects
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Get in Touch
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}