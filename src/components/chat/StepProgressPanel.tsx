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

// CP2077 palette
const NEON_YELLOW = "#FCEE0A";
const NEON_CYAN = "#00F0FF";

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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
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
            // Dark translucent glass — matches the rest of the chat UI.
            bgcolor: "rgba(9, 9, 11, 0.78)",
            backdropFilter: "blur(10px)",
            borderTop: `1px solid ${NEON_CYAN}55`,
            position: "relative",
            overflow: "hidden",
            // CP2077 angular corner — clipped top-right notch.
            clipPath:
              "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
          }}
        >
          {/* Progress bar fill — neon gradient sweep left to right behind steps */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              background: `linear-gradient(90deg, ${NEON_CYAN}1f, ${NEON_YELLOW}14)`,
              zIndex: 0,
            }}
          />
          {/* Thin neon track along the top edge of the fill */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 2,
              background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_YELLOW})`,
              boxShadow: `0 0 8px ${NEON_CYAN}aa`,
              zIndex: 2,
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
                  {/* Step indicator: angular neon token */}
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 18,
                      height: 18,
                      // CP2077 angular shape instead of circle
                      clipPath:
                        "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                      flexShrink: 0,
                      bgcolor: isDone
                        ? NEON_YELLOW
                        : isRunning
                        ? NEON_CYAN
                        : "rgba(255,255,255,0.12)",
                      boxShadow: isRunning
                        ? `0 0 10px ${NEON_CYAN}cc`
                        : isDone
                        ? `0 0 6px ${NEON_YELLOW}88`
                        : "none",
                      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {isDone ? (
                      <Check size={12} color="#09090b" strokeWidth={3} />
                    ) : isRunning ? (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          ease: "easeInOut",
                        }}
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          clipPath:
                            "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                          background: "#09090b",
                        }}
                      />
                    ) : (
                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",
                          width: 6,
                          height: 6,
                          clipPath:
                            "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
                          bgcolor: "rgba(255,255,255,0.35)",
                        }}
                      />
                    )}
                  </Box>

                  {/* Emoji + label — uppercase, tracked, neon-tinted */}
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: isDone
                        ? "rgba(252, 238, 10, 0.7)"
                        : isRunning
                        ? NEON_CYAN
                        : "text.disabled",
                      fontWeight: isRunning ? 700 : 500,
                      transition: "color 0.3s ease, opacity 0.3s ease, text-shadow 0.3s ease",
                      opacity: isDone ? 0.8 : 1,
                      textShadow: isRunning
                        ? `0 0 8px ${NEON_CYAN}88`
                        : isDone
                        ? `0 0 4px ${NEON_YELLOW}55`
                        : "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.25,
                    }}
                  >
                    <span aria-hidden>{emoji}</span>
                    <span>{s.label}</span>
                  </Typography>

                  {/* Connector — angular neon dash between steps */}
                  {i < steps.length - 1 && (
                    <Box
                      sx={{
                        width: 14,
                        height: 2,
                        clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
                        bgcolor: isDone ? `${NEON_YELLOW}88` : "rgba(255,255,255,0.1)",
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