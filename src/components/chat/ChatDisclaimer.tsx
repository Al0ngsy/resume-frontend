import { Box, Typography } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";

export default function ChatDisclaimer() {
  const { t } = useLanguage();
  const { data: siteData } = useSiteData();

  return (
    <Box
      sx={{
        px: 3,
        py: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
        bgcolor: "rgba(9, 9, 11, 0.4)",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {t.chat.disclaimer}
        <Box
          component="a"
          href={`mailto:${siteData.email}`}
          sx={{ color: "#00F0FF", textDecoration: "underline", "&:hover": { color: "#7CECFF" } }}
        >
          {t.chat.disclaimerContactPrefix}
          {siteData.name}
          {t.chat.disclaimerContactSuffix}
        </Box>
      </Typography>
    </Box>
  );
}