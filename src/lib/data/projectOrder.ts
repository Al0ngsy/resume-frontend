/**
 * PROJECT ORDER — the ONLY place to edit when rearranging projects.
 *
 * To reorder: move a line up or down. That's it — no need to touch the
 * big language files (src/lib/data/{en,de,vi}.ts).
 *
 * - The home page "Featured Projects" section shows the FIRST 3 entries.
 * - The /projects page lists all entries in this order.
 * - Unknown ids (typos, or projects not yet listed) sort to the end.
 */
export const PROJECT_ORDER: readonly string[] = [
  "vexarium",
  "vod-platform",
  "flexgold",
  "ai-microservice",
  "postgresql-migration-framework",
  "options-trading-prototype",
];
