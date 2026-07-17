import { Paper, Typography } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ChatError() {
  const { t } = useLanguage();

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
        {t.chat.errorTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t.chat.errorMessage}
      </Typography>
    </Paper>
  );
}