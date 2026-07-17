"use client";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Chip, Collapse, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

interface SuggestedQuestionsProps {
  questions: string[];
  expanded: boolean;
  onToggle: () => void;
  onSelect: (q: string) => void;
  disabled?: boolean;
  hasMessages: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SuggestedQuestions({
  questions,
  expanded,
  onToggle,
  onSelect,
  disabled = false,
  hasMessages,
}: SuggestedQuestionsProps) {
  const { t } = useLanguage();
  const [shuffled, setShuffled] = useState(questions);

  // Shuffle once on mount so visitors see a different order each visit.
  useEffect(() => {
    setShuffled(shuffle(questions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When a question is selected and removed from the parent's remainingQuestions list,
  // keep the shuffled order but remove the used question from the displayed list.
  useEffect(() => {
    setShuffled((prev) => prev.filter((q) => questions.includes(q)));
  }, [questions]);

  if (shuffled.length === 0) return null;

  return (
    <Box sx={{ mt: hasMessages ? 1 : 0 }}>
      <Box
        onClick={onToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
          userSelect: "none",
          "&:hover": { opacity: 0.8 },
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {hasMessages
            ? t.chat.suggestedQuestionsLeft(shuffled.length)
            : t.chat.suggestedQuestions}
        </Typography>
        {expanded ? (
          <ExpandLess fontSize="small" color="action" />
        ) : (
          <ExpandMore fontSize="small" color="action" />
        )}
      </Box>
      <Collapse in={expanded}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxWidth: 400,
            mx: "auto",
            mt: 1,
          }}
        >
          {shuffled.map((q) => (
            <Chip
              key={q}
              label={q}
              onClick={() => onSelect(q)}
              variant="outlined"
              clickable
              disabled={disabled}
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
      </Collapse>
    </Box>
  );
}