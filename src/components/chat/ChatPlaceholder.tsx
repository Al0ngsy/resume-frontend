import Construction from "@mui/icons-material/Construction";
import SmartToy from "@mui/icons-material/SmartToy";
import { Box, Paper, Typography } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";

export default function ChatPlaceholder() {
  const { t } = useLanguage();
  const { data: siteData } = useSiteData();

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
        {t.chat.placeholderTitlePrefix}
        {siteData.name}
        {t.chat.placeholderTitleSuffix}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 480, mx: "auto", mb: 3 }}
      >
        {t.chat.placeholderBodyPrefix}
        {siteData.name}
        {t.chat.placeholderBodySuffix}
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
        {t.chat.underProgress}
      </Box>
    </Paper>
  );
}