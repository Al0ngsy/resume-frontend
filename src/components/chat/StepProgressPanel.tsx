"use client";

import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import type { StepInfo } from "./types";

const STEP_ICONS: Record<string, string> = {
  checking_safety: "🛡️",
  searching_kb: "🔍",
  building_prompt: "🧠",
  generating: "✨",
  saving: "💾",
};

// Ordered step IDs — used for the progress bar fill calculation
const STEP_ORDER = [
  "checking_safety",
  "searching_kb",
  "building_prompt",
  "generating",
  "saving",
];

interface StepProgressPanelProps {
  steps: StepInfo[];
  visible: boolean;
  hasError?: boolean;
}

export default function StepProgressPanel({
  steps,
  visible,
  hasError,
}: StepProgressPanelProps) {
  const [shouldShow, setShouldShow] = useState(false);

  // Auto-hide: 1.5s after all steps done, or 5s after error
  useEffect(() => {
    if (!visible || steps.length === 0) {
      setShouldShow(false);
      return;
    }

    setShouldShow(true);

    // Only consider "all done" when every step in STEP_ORDER has arrived
    // and is done — otherwise the panel auto-hides before later steps
    // (e.g. "saving") have even appeared.
    const allDone =
      steps.length >= STEP_ORDER.length &&
      steps.every((s) => s.status === "done");
    if (allDone) {
      const timer = setTimeout(() => setShouldShow(false), hasError ? 5000 : 1500);
      return () => clearTimeout(timer);
    }
  }, [visible, steps, hasError]);

  if (!shouldShow || steps.length === 0) return null;

  // Progress: fraction of steps that are done (0 to 1)
  const doneCount = steps.filter((s) => s.status === "done").length;
  const progress = steps.length > 0 ? doneCount / STEP_ORDER.length : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            bgcolor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(6px)",
            borderTop: 1,
            borderColor: "divider",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Progress bar fill — runs left to right behind the steps */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              background: "rgba(144, 202, 249, 0.12)",
              zIndex: 0,
            }}
          />

          {/* Steps — wrap to second line on narrow screens instead of clipping */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 1.5,
              position: "relative",
              zIndex: 1,
            }}
          >
            {steps.map((s, i) => {
              const isRunning = s.status === "running";
              const isDone = s.status === "done";
              const emoji = STEP_ICONS[s.step] ?? "⚙️";

              return (
                <Box
                  key={s.step}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    flexShrink: 0,
                  }}
                >
                  {/* Step indicator: checkmark for done, pulsing dot for running */}
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      flexShrink: 0,
                      bgcolor: isDone
                        ? "success.main"
                        : isRunning
                        ? "primary.main"
                        : "action.disabled",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {isDone ? (
                      <Check size={12} color="#fff" strokeWidth={3} />
                    ) : isRunning ? (
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "easeInOut",
                        }}
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#fff",
                        }}
                      />
                    ) : (
                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "rgba(255,255,255,0.5)",
                        }}
                      />
                    )}
                  </Box>

                  {/* Emoji + label */}
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.7rem",
                      color: isDone
                        ? "text.disabled"
                        : isRunning
                        ? "text.primary"
                        : "text.disabled",
                      fontWeight: isRunning ? 600 : 400,
                      transition: "color 0.3s ease, opacity 0.3s ease",
                      opacity: isDone ? 0.6 : 1,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.25,
                    }}
                  >
                    <span aria-hidden>{emoji}</span>
                    <span>{s.label}</span>
                  </Typography>

                  {/* Connector line between steps */}
                  {i < steps.length - 1 && (
                    <Box
                      sx={{
                        width: 16,
                        height: 2,
                        borderRadius: 1,
                        bgcolor: isDone ? "success.light" : "divider",
                        flexShrink: 0,
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}