import { Send } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  sendDisabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  onKeyDown,
  disabled = false,
  sendDisabled = false,
  placeholder = "Ask about experience, skills, projects...",
}: ChatInputProps) {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderTop: 1,
        borderColor: "divider",
        display: "flex",
        gap: 1,
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />
      <IconButton
        onClick={onSend}
        disabled={sendDisabled}
        color="secondary"
        sx={{
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          "&:hover": { bgcolor: "secondary.dark" },
          "&.Mui-disabled": {
            bgcolor: "action.disabledBackground",
          },
        }}
      >
        <Send />
      </IconButton>
    </Box>
  );
}