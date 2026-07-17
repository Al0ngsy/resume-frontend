import { SmartToy } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSiteData } from "@/lib/useSiteData";

export default function ChatHeader() {
  const { t } = useLanguage();
  const { data: siteData } = useSiteData();

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
          {siteData.name}
          {t.chat.aiAgentSuffix}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {t.chat.aiAgentSubtitle}
          {siteData.name}.
        </Typography>
      </Box>
    </Box>
  );
}