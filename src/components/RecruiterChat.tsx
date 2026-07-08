"use client";

import siteData from "@/lib/data";
import { Person, Send, SmartToy } from "@mui/icons-material";
import Construction from "@mui/icons-material/Construction";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const IS_LOCAL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_LOCAL === "true";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What technologies does Le Quoc Anh work with?",
  "Tell me about his experience with NestJS",
  "What projects has he worked on?",
  "Describe his backend architecture experience.",
];

export default function RecruiterChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId] = useState(() =>
    crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
  );
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Conversation-ID": conversationId,
        },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting to the backend. Please make sure the resume-backend server is running locally.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" sx={{ mb: 1, textAlign: "center" }}>
          Ask the AI Agent
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 5, textAlign: "center", maxWidth: 600, mx: "auto" }}
        >
          {IS_LOCAL
            ? `Chat with an AI assistant that knows everything about ${siteData.name}'s experience, skills, and projects.`
            : `An AI-powered chatbot is being built so recruiters can ask questions about ${siteData.name} directly.`}
        </Typography>
      </motion.div>

      {!IS_LOCAL ? (
        /* ── Production: under-progress notice ── */
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
            AI Agent of {siteData.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 480, mx: "auto", mb: 3 }}
          >
            This feature is currently under development. Soon you&apos;ll be
            able to ask questions about {siteData.name}&apos;s experience,
            skills, and projects — powered by an AI assistant trained on his
            resume and portfolio.
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
            Under Progress
          </Box>
        </Paper>
      ) : (
        /* ── Dev: live chat interface ── */
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
          {/* Chat header */}
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
                Local Development Mode
              </Typography>
            </Box>
            <Chip
              label="DEV"
              size="small"
              color="warning"
              variant="outlined"
              sx={{ ml: "auto", fontWeight: 600 }}
            />
          </Box>

          {/* Messages */}
          <Box
            sx={{
              height: 400,
              overflowY: "auto",
              px: 3,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {messages.length === 0 && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Ask a question to get started:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    maxWidth: 400,
                    mx: "auto",
                  }}
                >
                  {suggestedQuestions.map((q) => (
                    <Chip
                      key={q}
                      label={q}
                      onClick={() => sendMessage(q)}
                      variant="outlined"
                      clickable
                      sx={{
                        justifyContent: "flex-start",
                        height: "auto",
                        py: 1,
                        px: 1.5,
                        "& .MuiChip-label": {
                          whiteSpace: "normal",
                          textAlign: "left",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor:
                      msg.role === "user" ? "primary.main" : "secondary.main",
                  }}
                >
                  {msg.role === "user" ? (
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
                    bgcolor:
                      msg.role === "user"
                        ? "secondary.main"
                        : "background.default",
                    color:
                      msg.role === "user"
                        ? "secondary.contrastText"
                        : "text.primary",
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                </Paper>
              </Box>
            ))}

            {loading && (
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
            )}

            <div ref={chatEndRef} />
          </Box>

          {/* Input */}
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
              placeholder="Ask about experience, skills, projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
            <IconButton
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
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
        </Paper>
      )}
    </Container>
  );
}
