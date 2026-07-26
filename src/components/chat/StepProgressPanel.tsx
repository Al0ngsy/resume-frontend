"use client";

import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";

import type { StepInfo } from "./types";

const STEP_EMOJI: Record<string, string> = {
  checking_safety: "🛡️",
  searching_kb: "🔍",
  building_prompt: "🧠",
  generating: "✨",
  saving: "💾",
};

interface StepProgressPanelProps {
  steps: StepInfo[];
  visible: boolean;
}

export default function StepProgressPanel({
  steps,
  visible,
}: StepProgressPanelProps) {
  if (!visible || steps.length === 0) return null;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ overflow: "hidden" }}
      >
        <Box
          sx={{
            px: 3,
            py: 1.5,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              fontSize: "0.65rem",
              letterSpacing: 1.2,
              lineHeight: 1,
              display: "block",
              mb: 1,
            }}
          >
            Processing
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {steps.map((s, i) => {
              const isRunning = s.status === "running";
              const isDone = s.status === "done";
              const emoji = STEP_EMOJI[s.step] ?? "⚙️";

              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 0.5,
                      borderRadius: 1,
                      px: isRunning ? 1 : 0,
                      mx: isRunning ? -1 : 0,
                      transition: "background-color 0.2s ease",
                      bgcolor: isRunning
                        ? "rgba(144, 202, 249, 0.08)"
                        : "transparent",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        width: 20,
                        height: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isDone ? (
                        <motion.span
                          initial={{ scale: 0.4 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          style={{ display: "inline-flex" }}
                        >
                          <CheckCircle
                            size={20}
                            color="#16a34a"
                            strokeWidth={2.5}
                          />
                        </motion.span>
                      ) : (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 1.1,
                          }}
                          style={{ display: "inline-flex" }}
                        >
                          <Loader2
                            size={20}
                            color="#2563eb"
                            strokeWidth={2.5}
                          />
                        </motion.span>
                      )}
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: isDone ? "text.secondary" : "text.primary",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.75,
                      }}
                    >
                      <span aria-hidden>{emoji}</span>
                      <span>{s.label}</span>
                    </Typography>
                  </Box>
                </motion.div>
              );
            })}
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}