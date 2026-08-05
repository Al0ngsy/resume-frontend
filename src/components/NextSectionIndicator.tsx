"use client";

import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useCallback } from "react";

/**
 * Fixed "scroll-down" cue that jumps to the next full-page snap section.
 * Fades out on the last section. Clicking scrolls to the next `.snap-section`
 * sibling (via scrollIntoView so it respects CSS scroll-snap alignment).
 */
export default function NextSectionIndicator() {
  const goToNext = useCallback(() => {
    const current: Element | null =
      document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2,
      )?.closest(".snap-section") ?? null;

    const sections = Array.from(document.querySelectorAll(".snap-section"));
    if (sections.length === 0) return;

    const idx = current ? sections.indexOf(current) : -1;
    const next = sections[Math.min(idx + 1, sections.length - 1)];
    next.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        bottom: 12,
        transform: "translateX(-50%)",
        zIndex: 10,
      }}
    >
      <Tooltip title="Next section" arrow>
        <IconButton
          onClick={goToNext}
          aria-label="Go to next section"
          sx={{
            color: "#00F0FF",
            opacity: 0.8,
            border: "1px solid rgba(0, 240, 255, 0.3)",
            bgcolor: "rgba(24, 24, 27, 0.5)",
            backdropFilter: "blur(8px)",
            "&:hover": {
              opacity: 1,
              bgcolor: "rgba(24, 24, 27, 0.8)",
              boxShadow: "0 0 16px rgba(0, 240, 255, 0.3)",
            },
          }}
        >
          <KeyboardArrowDown />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
