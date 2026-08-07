# Graph Report - resume-frontend  (2026-08-07)

## Corpus Check
- 54 files · ~19,500 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 313 nodes · 446 edges · 31 communities (20 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9fb2425a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Home Page
- UI Dependencies
- Dev Dependencies & Config
- TypeScript Config
- Root Layout & Footer
- Package Scripts
- TS Path Aliases
- Project Docs & Guides
- About Page
- Contact Page
- Deployment Config
- CV PDFs
- ESLint Config
- Next.js Config
- PostCSS Config
- File Icon SVG
- Globe Icon SVG
- Window Icon SVG
- Framer Motion
- MUI v9 Styling
- TypeScript Strict Mode
- Yarn Config
- RecruiterChat.tsx
- SuggestedQuestions.tsx
- This is NOT the Next.js you know

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 37 edges
2. `useSiteData()` - 23 edges
3. `compilerOptions` - 16 edges
4. `Resume Frontend` - 11 edges
5. `scripts` - 7 edges
6. `CyberpunkScene()` - 7 edges
7. `Locale` - 7 edges
8. `include` - 7 edges
9. `Cloudflare Pages Deployment` - 7 edges
10. `SiteData` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Le Quoc Anh Tran (Backend Software Engineer)` --references--> `Le Quoc Anh Tran CV (German)`  [INFERRED]
  README.md → public/lequocanh_tran_cv_de.pdf
- `Le Quoc Anh Tran (Backend Software Engineer)` --references--> `Le Quoc Anh Tran CV (English)`  [INFERRED]
  README.md → public/lequocanh_tran_cv_en.pdf
- `Cloudflare Pages Deployment (README)` --semantically_similar_to--> `Cloudflare Pages Deployment Guide`  [INFERRED] [semantically similar]
  README.md → docs/deployment/cloudflare.md
- `Yarn Node Linker: node-modules` --shares_data_with--> `Resume Frontend`  [INFERRED]
  .yarnrc.yml → README.md
- `Next.js Agent Rules (Breaking Changes Warning)` --rationale_for--> `Resume Frontend`  [INFERRED]
  AGENTS.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cloudflare Pages Deployment Flow** — readme_cloudflare_pages, docs_deployment_cloudflare_cloudflare_pages_deploy, docs_deployment_cloudflare_github_auto_deploy, docs_deployment_cloudflare_wrangler_cli, readme_next_public_api_url, docs_deployment_cloudflare_next_public_api_url [INFERRED 0.85]
- **Resume Frontend Tech Stack** — readme_nextjs16, readme_typescript, readme_mui_v9, readme_framer_motion, readme_cloudflare_pages [EXTRACTED 1.00]
- **Le Quoc Anh Tran Portfolio Assets** — readme_le_quoc_anh_tran, public_lequocanh_tran_cv_en_cv, public_lequocanh_tran_cv_de_cv, readme_pages_routes [INFERRED 0.85]

## Communities (31 total, 11 thin omitted)

### Community 0 - "Home Page"
Cohesion: 0.24
Nodes (9): ProjectCard(), siteDataDe, siteDataEn, siteDataByLocale, siteDataVi, Experience, Project, SiteData (+1 more)

### Community 1 - "UI Dependencies"
Cohesion: 0.06
Nodes (33): @emotion/cache, @emotion/react, @emotion/styled, framer-motion, @mui/icons-material, @mui/material, @mui/material-nextjs, next (+25 more)

### Community 2 - "Dev Dependencies & Config"
Cohesion: 0.06
Nodes (30): eslint, eslint-config-next, @opennextjs/cloudflare, devDependencies, eslint, eslint-config-next, @opennextjs/cloudflare, @types/node (+22 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 4 - "Root Layout & Footer"
Cohesion: 0.06
Nodes (31): Building, Car, _color, COLOR_HEX, CyberpunkScene(), _dirTable, _euler, generateBuildings() (+23 more)

### Community 5 - "Package Scripts"
Cohesion: 0.19
Nodes (9): geistMono, geistSans, Footer(), techGroups, getReducedMotionSnapshot(), subscribeReducedMotion(), ThemeRegistry(), darkTheme (+1 more)

### Community 6 - "TS Path Aliases"
Cohesion: 0.17
Nodes (18): Navbar(), getStoredLocale(), Locale, localeNames, locales, localeShortNames, setStoredLocale(), getLocaleSnapshot() (+10 more)

### Community 7 - "Project Docs & Guides"
Cohesion: 0.09
Nodes (21): Next.js Agent Rules (Breaking Changes Warning), CLAUDE.md Reference to AGENTS.md, Cloudflare Pages Deployment Guide, Cloudflare Pages Deployment, Custom Domain, Environment Variables, Option 1: Automatic Deployment from GitHub (Preferred), Option 2: Manual Deployment via Wrangler CLI (+13 more)

### Community 8 - "About Page"
Cohesion: 0.21
Nodes (7): markdownSx, STEP_ICONS, STEP_ORDER, StepProgressPanelProps, Message, StepInfo, suggestedQuestionsByLocale

### Community 9 - "Contact Page"
Cohesion: 0.40
Nodes (3): metadata, fadeIn, ProjectsClient()

### Community 11 - "Deployment Config"
Cohesion: 0.50
Nodes (4): Automatic GitHub Deployment (Preferred), NEXT_PUBLIC_API_URL Env Var (Deployment Doc), Wrangler CLI Manual Deployment, NEXT_PUBLIC_API_URL Env Var (README)

### Community 12 - "CV PDFs"
Cohesion: 1.00
Nodes (3): Le Quoc Anh Tran CV (German), Le Quoc Anh Tran CV (English), Le Quoc Anh Tran (Backend Software Engineer)

### Community 15 - "PostCSS Config"
Cohesion: 0.67
Nodes (3): shuffle(), SuggestedQuestions(), SuggestedQuestionsProps

### Community 28 - "RecruiterChat.tsx"
Cohesion: 0.10
Nodes (27): AboutClient(), fadeIn, metadata, ContactClient(), fadeIn, metadata, fadeIn, HomeClient() (+19 more)

## Knowledge Gaps
- **137 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+132 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLanguage()` connect `RecruiterChat.tsx` to `Home Page`, `Package Scripts`, `TS Path Aliases`, `Contact Page`, `PostCSS Config`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `dependencies` connect `UI Dependencies` to `Dev Dependencies & Config`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Resume Frontend` (e.g. with `Next.js Agent Rules (Breaking Changes Warning)` and `Yarn Node Linker: node-modules`) actually correct?**
  _`Resume Frontend` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _137 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies & Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._