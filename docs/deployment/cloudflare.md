# Cloudflare Pages Deployment

## Prerequisites

- Node.js 18+
- A Cloudflare account
- Git repository pushed to GitHub

## Option 1: Automatic Deployment from GitHub (Preferred)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<your-username>/resume-frontend.git
   git push -u origin main
   ```

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Workers & Pages > Create > Pages > Connect to Git

3. Select your repository and configure:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
   - **Environment variables:**
     - `NEXT_PUBLIC_API_URL` = your backend API URL (or leave blank for now)

4. Click **Save and Deploy**

## Option 2: Manual Deployment via Wrangler CLI

1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy:
   ```bash
   npx wrangler pages deploy .next --project-name=resume-frontend
   ```

5. Set environment variables:
   ```bash
   echo "NEXT_PUBLIC_API_URL=https://your-api.vercel.app" | wrangler pages secret put NEXT_PUBLIC_API_URL --project-name=resume-frontend
   ```

## Custom Domain

1. In Cloudflare Pages dashboard, go to your project > Custom domains
2. Add your domain and follow the DNS instructions
3. Ensure the domain's DNS is managed by Cloudflare

## Redeployment

- **Automatic:** Push to GitHub — Cloudflare rebuilds automatically
- **Manual:** Run `npm run build && npx wrangler pages deploy .next`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL (Phase 2) | No |