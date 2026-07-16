import { Paper, Typography } from "@mui/material";

export default function ChatError() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "error.main",
        borderRadius: 3,
        p: 4,
        textAlign: "center",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h6" color="error.main" sx={{ mb: 1 }}>
        Backend Unreachable
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Could not connect to the resume-backend. Make sure the server is
        running.
      </Typography>
    </Paper>
  );
}