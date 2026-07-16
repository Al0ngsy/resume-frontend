import { SmartToy } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import siteData from "@/lib/data";

export default function ChatHeader() {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Avatar sx={{ bgcolor: "secondary.main", width: 36, height: 36 }}>
        <SmartToy sx={{ fontSize: 20 }} />
      </Avatar>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {siteData.name}&apos;s AI Agent
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Ask questions about experience, skills, and projects of{" "}
          {siteData.name}.
        </Typography>
      </Box>
    </Box>
  );
}