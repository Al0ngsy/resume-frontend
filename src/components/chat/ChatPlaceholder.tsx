import Construction from "@mui/icons-material/Construction";
import SmartToy from "@mui/icons-material/SmartToy";
import { Box, Paper, Typography } from "@mui/material";
import siteData from "@/lib/data";

export default function ChatPlaceholder() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        p: 6,
        textAlign: "center",
        bgcolor: "background.paper",
      }}
    >
      <SmartToy
        sx={{ fontSize: 64, color: "text.secondary", mb: 2, opacity: 0.5 }}
      />
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        AI Agent of {siteData.name}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 480, mx: "auto", mb: 3 }}
      >
        This feature is currently under development. Soon you&apos;ll be able to
        ask questions about {siteData.name}&apos;s experience, skills, and
        projects — powered by an AI assistant trained on his resume and
        portfolio.
      </Typography>
      <Box
        sx={{
          display: "inline-flex",
          gap: 1,
          px: 3,
          py: 1.5,
          borderRadius: 2,
          bgcolor: "warning.main",
          color: "warning.contrastText",
          fontWeight: 600,
          fontSize: "0.875rem",
        }}
      >
        <Construction color="inherit" />
        Under Progress
      </Box>
    </Paper>
  );
}