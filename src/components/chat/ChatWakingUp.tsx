import { CircularProgress, Box, Paper, Typography } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

interface ChatWakingUpProps {
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  loading: boolean;
  conversationId: string | null;
}

export default function ChatWakingUp({
  input,
  onInputChange,
  onSend,
  onKeyDown,
  loading,
  conversationId,
}: ChatWakingUpProps) {
  const { t } = useLanguage();

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <ChatHeader />
      <Box
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          px: 3,
        }}
      >
        <CircularProgress size={32} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          {t.chat.wakingUp}
        </Typography>
      </Box>
      <ChatInput
        value={input}
        onChange={onInputChange}
        onSend={onSend}
        onKeyDown={onKeyDown}
        disabled={loading}
        sendDisabled={!input.trim() || loading || !conversationId}
        placeholder={t.chat.wakingUpPlaceholder}
      />
    </Paper>
  );
}