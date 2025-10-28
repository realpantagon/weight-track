# Pantagon Weight Tracker

Pantagon Weight Tracker is a modern full-stack application built with React, TypeScript, and Cloudflare Workers for tracking weight progress.

## Prerequisites
- Node.js 18 or newer
- pnpm 8 or newer
- Supabase account

## Fork and Clone
1. Fork the repository on GitHub.
2. Clone your fork to your local machine:
   ```bash
   git clone https://github.com/<your-username>/weight-track.git
   cd weight-track
   ```

## Install Dependencies
```bash
pnpm install
```

## Install Wrangler CLI
```bash
pnpm add -D wrangler@latest
npx wrangler -v
```
(verify the installed version prints correctly)

## Supabase Setup
1. Sign in to Supabase and create a new project.
2. Open the SQL Editor and run a command that includes your name so your tables are unique. Example:
   ```sql
   create table weights_<yourname> (
     id uuid primary key default gen_random_uuid(),
     weighed_at timestamptz not null,
     weight_kg numeric not null
   );
   ```
   Replace `<yourname>` with your own name or handle.

## Local Project Setup
1. Create `.env` files as needed (for example `apps/frontend/.env`) and configure local environment values.
2. Make sure `VITE_API_BASE_URL` in the frontend points to your local or deployed backend.

## Backend Secrets and Deployment
Add Cloudflare Worker secrets one command at a time from the project root:
```bash
cd apps/backend
pnpm wrangler secret put SUPABASE_URL
#Copy from Supabase Project Setting -> Data API

pnpm wrangler secret put SUPABASE_SERVICE_ROLE_KEY
#Copy from Supabase Project Setting -> API Key service_role 

pnpm wrangler secret put SUPABASE_TABLE
#Your Supabase table name weights_<yourname> from your created table

```
After the secrets are set, deploy the backend:
```bash
cd apps/backend
pnpm wrangler deploy
```

## Useful Scripts
- `pnpm dev` – run backend and frontend locally
- `pnpm build:frontend` – build the frontend for production


## 📁 Project Structure

```
pantagon-weight-tracking/
├── apps/
│   ├── frontend/          # React frontend application
│   │   ├── src/
│   │   │   ├── Components/    # Reusable UI components
│   │   │   ├── api.ts        # API client functions
│   │   │   ├── types.ts      # TypeScript type definitions
│   │   │   └── App.tsx       # Main application component
│   │   └── package.json
│   └── backend/           # Cloudflare Worker backend
│       ├── src/
│       │   ├── index.ts      # Main worker entry point
│       │   └── types.ts      # Backend type definitions
│       ├── wrangler.toml     # Cloudflare Worker configuration
│       └── package.json
├── package.json           # Root package.json with workspace scripts
├── pnpm-workspace.yaml    # PNPM workspace configuration
└── README.md
```

## 🎯 Usage

1. **Add Weight Entry**: Click the "+" button to add a new weight entry
2. **View Progress**: Check the chart to see your weight trends over time
3. **Track Statistics**: Monitor your min, max, and average weight
4. **Browse History**: Scroll through your weight entry history

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the database and backend services
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) for edge computing
- [TailwindCSS](https://tailwindcss.com) for styling

---

Made with ❤️ by [Pantagon](https://github.com/realpantagon)
