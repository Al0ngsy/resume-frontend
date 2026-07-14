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
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import ReactMarkdown from "react-markdown";

// All requests go through same-origin Next.js route handlers (server-side proxy)
// which inject the API key server-side. The backend URL is never exposed to the browser.

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

const STORAGE_KEY = "recruiter-chat-conversation-id";

export default function RecruiterChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [initError, setInitError] = useState(false);
  const [wakingUp, setWakingUp] = useState(true);
  // Avoid hydration mismatch: useSyncExternalStore returns "placeholder" on SSR
  // and the real env value on the client after hydration.
  const chatMode = useSyncExternalStore(
    () => () => {},
    () => (process.env.NEXT_PUBLIC_CHAT_MODE as "hidden" | "placeholder" | "live") || "placeholder",
    () => "placeholder" as const,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore or create a conversation on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Wake-up ping (Render free tier cold start)
        await fetch("/api/health");

        // Check if we have a saved conversation ID
        const savedId = localStorage.getItem(STORAGE_KEY);

        if (savedId) {
          // Try to restore the existing conversation
          const res = await fetch(`/api/conversations/${savedId}`);
          if (res.ok) {
            const data = await res.json();
            if (!cancelled && data.messages?.length > 0) {
              setConversationId(savedId);
              setMessages(
                data.messages.map((m: { role: string; content: string }) => ({
                  role: m.role as "user" | "assistant",
                  content: m.content,
                })),
              );
              setWakingUp(false);
              return;
            }
          }
          // Conversation not found (server restarted) — clear stale ID
          localStorage.removeItem(STORAGE_KEY);
        }

        // No saved conversation — create a new one
        const res = await fetch("/api/conversations", {
          method: "POST",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setConversationId(data.conversation_id);
          localStorage.setItem(STORAGE_KEY, data.conversation_id);
          setWakingUp(false);
        }
      } catch {
        if (!cancelled) {
          setInitError(true);
          setWakingUp(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-scroll to bottom only when user is already near the bottom.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distFromBottom < 100) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading || !conversationId) return;

      const userMsg: Message = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Conversation-ID": conversationId,
          },
          body: JSON.stringify({ message: text }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.message || `Server error (HTTP ${res.status})`,
          );
        }

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Sorry, I'm having trouble connecting. Please try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
      } finally {
        setLoading(false);
      }
    },
    [conversationId, loading],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isLive = chatMode === "live";
  const isPlaceholder = chatMode === "placeholder";
  const isHidden = chatMode === "hidden";

  if (isHidden) return null;

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
          {isLive
            ? `Chat with an AI assistant that knows everything about ${siteData.name}'s experience, skills, and projects.`
            : `An AI-powered chatbot is being built so recruiters can ask questions about ${siteData.name} directly.`}
        </Typography>
      </motion.div>

      {isPlaceholder ? (
        /* ── Placeholder: under-progress notice ── */
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
            This feature is currently under development. Soon you'll be able to
            ask questions about {siteData.name}'s experience, skills, and
            projects — powered by an AI assistant trained on his resume and
            portfolio.
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
      ) : isLive && wakingUp ? (
        /* ── Backend warming up (Render free tier cold start) ── */
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
                {siteData.name}'s AI Agent
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ask questions about experience, skills, and projects of{" "}
                {siteData.name}.
              </Typography>
            </Box>
          </Box>
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
              Starting up the AI agent — this can take up to 30 seconds on a
              free-tier server.
            </Typography>
          </Box>
          {/* Input — enabled so users can type their question while waiting */}
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
              placeholder="Type your question while the agent starts up..."
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
              disabled={!input.trim() || loading || !conversationId}
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
      ) : isLive && initError ? (
        /* ── Backend unreachable (only shown in live mode) ── */
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
      ) : (
        /* ── Live: full chat interface ── */
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
                {siteData.name}'s AI Agent
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ask questions about experience, skills, and projects of{" "}
                {siteData.name}.
              </Typography>
            </Box>
          </Box>

          {/* Messages */}
          <Box
            ref={scrollRef}
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
                  {msg.role === "assistant" ? (
                    <Box
                      sx={{
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
                        fontSize: "0.875rem",
                        lineHeight: 1.5,
                      }}
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: "inherit" }}>
                      {msg.content}
                    </Typography>
                  )}
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
              disabled={loading || !conversationId}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
            <IconButton
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading || !conversationId}
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

          {/* AI disclaimer */}
          <Box
            sx={{
              px: 3,
              py: 1.5,
              borderTop: 1,
              borderColor: "divider",
              textAlign: "center",
              bgcolor: "grey.50",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              AI can make mistakes — better{" "}
              <Box
                component="a"
                href={`mailto:${siteData.email}`}
                sx={{ color: "secondary.main", textDecoration: "underline" }}
              >
                contact {siteData.name} directly
              </Box>{" "}
              for important matters.
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
}
