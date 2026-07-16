import { SmartToy } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Paper } from "@mui/material";

export default function LoadingBubble() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        alignSelf: "flex-start",
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: "secondary.main",
        }}
      >
        <SmartToy sx={{ fontSize: 18 }} />
      </Avatar>
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.5,
          borderRadius: 2,
          bgcolor: "background.default",
        }}
      >
        <CircularProgress size={16} thickness={6} />
      </Paper>
    </Box>
  );
}