import { Box, Typography } from "@mui/material";
import siteData from "@/lib/data";

export default function ChatDisclaimer() {
  return (
    <Box
      sx={{
        px: 3,
        py: 1.5,
        borderTop: 1,
        borderColor: "divider",
        textAlign: "center",
        bgcolor: "grey.50",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        AI can make mistakes — better{" "}
        <Box
          component="a"
          href={`mailto:${siteData.email}`}
          sx={{ color: "secondary.main", textDecoration: "underline" }}
        >
          contact {siteData.name} directly
        </Box>{" "}
        for important matters.
      </Typography>
    </Box>
  );
}