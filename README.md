# Resume Frontend

Professional portfolio website for Le Quoc Anh Tran, Backend Software Engineer.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** MUI v9
- **Animations:** Framer Motion
- **Deployment:** Cloudflare Pages

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
yarn build
yarn start
```

## Pages

- `/` — Home (Hero, featured projects, skills)
- `/about` — About (career summary, philosophy, experience)
- `/projects` — Projects (case studies with problem/solution)
- `/resume` — Resume (experience, skills, PDF download)
- `/contact` — Contact (email, GitHub, LinkedIn)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL (Phase 2) |

## Deployment

See [docs/deployment/cloudflare.md](docs/deployment/cloudflare.md).