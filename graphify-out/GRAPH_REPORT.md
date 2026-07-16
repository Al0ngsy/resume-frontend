# Graph Report - resume-frontend  (2026-07-16)

## Corpus Check
- 44 files · ~7,419 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 226 nodes · 241 edges · 32 communities (21 shown, 11 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e391a586`
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
- Resume Page
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
1. `compilerOptions` - 16 edges
2. `siteData` - 11 edges
3. `Resume Frontend` - 11 edges
4. `scripts` - 7 edges
5. `include` - 7 edges
6. `Cloudflare Pages Deployment` - 7 edges
7. `lib` - 4 edges
8. `ChatInput()` - 3 edges
9. `Message` - 3 edges
10. `Next.js Agent Rules (Breaking Changes Warning)` - 3 edges

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

## Communities (32 total, 11 thin omitted)

### Community 0 - "Home Page"
Cohesion: 0.18
Nodes (7): metadata, fadeIn, ProjectsClient(), Experience, Project, SiteData, Skill

### Community 1 - "UI Dependencies"
Cohesion: 0.09
Nodes (23): @emotion/cache, @emotion/react, @emotion/styled, framer-motion, @mui/icons-material, @mui/material, @mui/material-nextjs, next (+15 more)

### Community 2 - "Dev Dependencies & Config"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, @opennextjs/cloudflare, devDependencies, eslint, eslint-config-next, @opennextjs/cloudflare, tailwindcss (+13 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "Root Layout & Footer"
Cohesion: 0.15
Nodes (8): geistMono, geistSans, beTechStack, feTechStack, navLinks, ThemeRegistry(), darkTheme, lightTheme

### Community 5 - "Package Scripts"
Cohesion: 0.17
Nodes (11): name, packageManager, private, scripts, build, deploy, dev, lint (+3 more)

### Community 6 - "TS Path Aliases"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 7 - "Project Docs & Guides"
Cohesion: 0.09
Nodes (21): Next.js Agent Rules (Breaking Changes Warning), CLAUDE.md Reference to AGENTS.md, Cloudflare Pages Deployment Guide, Cloudflare Pages Deployment, Custom Domain, Environment Variables, Option 1: Automatic Deployment from GitHub (Preferred), Option 2: Manual Deployment via Wrangler CLI (+13 more)

### Community 8 - "About Page"
Cohesion: 0.40
Nodes (3): AboutClient(), fadeIn, metadata

### Community 9 - "Contact Page"
Cohesion: 0.40
Nodes (3): ContactClient(), fadeIn, metadata

### Community 10 - "Resume Page"
Cohesion: 0.40
Nodes (3): metadata, fadeIn, ResumeClient()

### Community 11 - "Deployment Config"
Cohesion: 0.50
Nodes (4): Automatic GitHub Deployment (Preferred), NEXT_PUBLIC_API_URL Env Var (Deployment Doc), Wrangler CLI Manual Deployment, NEXT_PUBLIC_API_URL Env Var (README)

### Community 12 - "CV PDFs"
Cohesion: 1.00
Nodes (3): Le Quoc Anh Tran CV (German), Le Quoc Anh Tran CV (English), Le Quoc Anh Tran (Backend Software Engineer)

### Community 28 - "RecruiterChat.tsx"
Cohesion: 0.10
Nodes (11): fadeIn, metadata, ChatInput(), ChatInputProps, markdownSx, ChatWakingUpProps, LoadingBubble(), Message (+3 more)

### Community 29 - "SuggestedQuestions.tsx"
Cohesion: 0.67
Nodes (3): shuffle(), SuggestedQuestions(), SuggestedQuestionsProps

## Knowledge Gaps
- **104 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+99 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `UI Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies & Config` to `Package Scripts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `siteData` connect `RecruiterChat.tsx` to `About Page`, `Contact Page`, `Resume Page`, `Home Page`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Resume Frontend` (e.g. with `Next.js Agent Rules (Breaking Changes Warning)` and `Yarn Node Linker: node-modules`) actually correct?**
  _`Resume Frontend` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _104 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies & Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._