"use client";

import siteData from "@/lib/data";
import { Box, Container, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import ChatDisclaimer from "./chat/ChatDisclaimer";
import ChatError from "./chat/ChatError";
import ChatHeader from "./chat/ChatHeader";
import ChatInput from "./chat/ChatInput";
import ChatMessage from "./chat/ChatMessage";
import ChatPlaceholder from "./chat/ChatPlaceholder";
import ChatWakingUp from "./chat/ChatWakingUp";
import LoadingBubble from "./chat/LoadingBubble";
import SuggestedQuestions from "./chat/SuggestedQuestions";
import { Message, STORAGE_KEY, suggestedQuestions } from "./chat/types";

export default function RecruiterChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [initError, setInitError] = useState(false);
  const [wakingUp, setWakingUp] = useState(true);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [suggestionsExpanded, setSuggestionsExpanded] = useState(true);

  // Avoid hydration mismatch: useSyncExternalStore returns "placeholder" on SSR
  // and the real env value on the client after hydration.
  const chatMode = useSyncExternalStore(
    () => () => {},
    () =>
      (process.env.NEXT_PUBLIC_CHAT_MODE as
        | "hidden"
        | "placeholder"
        | "live") || "placeholder",
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
              const restored: Message[] = data.messages.map(
                (m: { role: string; content: string }) => ({
                  role: m.role as "user" | "assistant",
                  content: m.content,
                }),
              );
              setMessages(restored);
              // Mark any suggested questions that were already asked
              const askedSuggestions = restored
                .filter((m: Message) => m.role === "user")
                .map((m: Message) => m.content)
                .filter((c: string) => suggestedQuestions.includes(c));
              setUsedQuestions(new Set(askedSuggestions));
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

      // Track if this was a suggested question
      setUsedQuestions((prev) => {
        if (suggestedQuestions.includes(text)) {
          return new Set(prev).add(text);
        }
        return prev;
      });

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

  const remainingQuestions = suggestedQuestions.filter(
    (q) => !usedQuestions.has(q),
  );

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
        <ChatPlaceholder />
      ) : isLive && wakingUp ? (
        <ChatWakingUp
          input={input}
          onInputChange={setInput}
          onSend={() => sendMessage(input)}
          onKeyDown={handleKeyDown}
          loading={loading}
          conversationId={conversationId}
        />
      ) : isLive && initError ? (
        <ChatError />
      ) : (
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
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", py: 2 }}
              >
                Ask a question to get started:
              </Typography>
            )}

            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}

            {loading && <LoadingBubble />}

            <SuggestedQuestions
              questions={remainingQuestions}
              expanded={suggestionsExpanded}
              onToggle={() => setSuggestionsExpanded((p) => !p)}
              onSelect={(q) => sendMessage(q)}
              disabled={loading}
              hasMessages={messages.length > 0}
            />
          </Box>

          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => sendMessage(input)}
            onKeyDown={handleKeyDown}
            disabled={loading || !conversationId}
            sendDisabled={!input.trim() || loading || !conversationId}
          />

          <ChatDisclaimer />
        </Paper>
      )}
    </Container>
  );
}