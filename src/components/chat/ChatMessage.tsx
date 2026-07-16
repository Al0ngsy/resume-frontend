import { Person, SmartToy } from "@mui/icons-material";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "./types";

const markdownSx = {
  "& p": { margin: 0 },
  "& p + p": { marginTop: 1 },
  "& ul, & ol": { pl: 3, margin: 0 },
  "& li + li": { marginTop: 0.5 },
  "& li > p": { margin: 0 },
  "& strong": { fontWeight: 600 },
  "& code": {
    fontSize: "0.85em",
    bgcolor: "action.hover",
    px: 0.5,
    borderRadius: 0.5,
  },
  "& pre": {
    margin: 0,
    p: 1,
    borderRadius: 1,
    bgcolor: "action.hover",
    overflowX: "auto",
  },
  "& pre code": {
    bgcolor: "transparent",
    px: 0,
  },
  "& h1, & h2, & h3, & h4, & h5, & h6": {
    margin: 0,
    fontWeight: 600,
  },
  "& h1 + p, & h2 + p, & h3 + p": { marginTop: 0.5 },
  "& a": { color: "secondary.main" },
  "& blockquote": {
    margin: 0,
    pl: 2,
    borderLeft: 2,
    borderColor: "divider",
  },
  "& hr": {
    border: 0,
    borderTop: 1,
    borderColor: "divider",
    my: 1,
  },
  "& table": {
    borderCollapse: "collapse",
    width: "100%",
    my: 1,
    "& th, & td": {
      border: 1,
      borderColor: "divider",
      px: 1,
      py: 0.5,
      textAlign: "left",
    },
    "& th": {
      fontWeight: 600,
      bgcolor: "action.hover",
    },
    "& tr:nth-of-type(even)": {
      bgcolor: "action.hover",
    },
  },
  fontSize: "0.875rem",
  lineHeight: 1.5,
} as const;

export default function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "80%",
        flexDirection: isUser ? "row-reverse" : "row",
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isUser ? "primary.main" : "secondary.main",
        }}
      >
        {isUser ? (
          <Person sx={{ fontSize: 18 }} />
        ) : (
          <SmartToy sx={{ fontSize: 18 }} />
        )}
      </Avatar>
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.5,
          borderRadius: 2,
          bgcolor: isUser ? "secondary.main" : "background.default",
          color: isUser ? "secondary.contrastText" : "text.primary",
        }}
      >
        {msg.role === "assistant" ? (
          <Box sx={markdownSx}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: "inherit" }}>
            {msg.content}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}