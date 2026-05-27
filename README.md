# CreatorOS MVP (Scaffold-first, install-later friendly)

This project now includes a complete **file-level MVP scaffold** for:
- Admin Dashboard
- Collaborations CRM
- Follow-Ups
- Tasks
- Content Calendar
- Public Portfolio pages
- Supabase SQL schema
- OpenAI follow-up generation API route
- Demo seed data

## Important note about this environment

`npm install` is blocked in this execution environment by external package policy/network restrictions (`403 Forbidden`), **not by project code syntax**.

You can run the exact same code on:
- Local machine
- GitHub Codespaces
- Replit
- Vercel dev environment
- Cursor local environment

## Environment variables

> Security: Never commit `.env.local` or real API keys. Use placeholders in repo files and set real values only in local environment variables or deployment secrets.

Create `.env.local` in project root:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=sb_publishable_your_key_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=4000
```

- Use Supabase URL **without** `/rest/v1/`
- `OPENAI_API_KEY` is required for `/api/ai/follow-up-generator`

## Files created for MVP UI

### Admin UI
- `public/admin/dashboard.html`
- `public/admin/collaborations.html`
- `public/admin/followups.html`
- `public/admin/tasks.html`
- `public/admin/calendar.html`
- `public/styles.css`

### Public Portfolio UI
- `public/portfolio/index.html`
- `public/portfolio/about.html`
- `public/portfolio/services.html`
- `public/portfolio/work.html`
- `public/portfolio/contact.html`

### Backend/API + integrations
- `server.js`
- `routes/creatorosRoutes.js`
- `services/supabaseClient.js`
- `lib/supabase.ts`
- `src/utils/followUpPriority.js`
- `src/types/creatoros.ts`

### Database + demo data
- `sql/supabase_schema.sql`
- `src/demo-data/seed_demo_data.sql`

## Local run instructions

### 1) Install dependencies
```bash
npm config set registry https://registry.npmjs.org/
npm install
```

### 2) Create Supabase tables
- Open Supabase SQL Editor
- Run `sql/supabase_schema.sql`

### 3) Seed demo data (optional)
- Run `src/demo-data/seed_demo_data.sql` in Supabase SQL Editor

### 4) Start app
```bash
npm run dev
```

### 5) Open pages
- Admin Dashboard: `http://localhost:4000/admin/dashboard.html`
- CRM: `http://localhost:4000/admin/collaborations.html`
- Follow-Ups: `http://localhost:4000/admin/followups.html`
- Tasks: `http://localhost:4000/admin/tasks.html`
- Calendar: `http://localhost:4000/admin/calendar.html`
- Portfolio Home: `http://localhost:4000/portfolio/index.html`

## API endpoints

- `GET /api/health/supabase`
- `GET /api/dashboard`
- `GET /api/collaborations`
- `POST /api/collaborations`
- `GET /api/follow-ups`
- `GET /api/content-calendar`
- `POST /api/content-calendar`
- `POST /api/ai/follow-up-generator`

## Full demo flow

1. Configure `.env.local` (Supabase + OpenAI keys)
2. Run schema SQL
3. Optionally run seed SQL
4. Start server and open admin dashboard
5. Create a collaboration in CRM with old `last_conversation_date`
6. Open Follow-Ups page and verify priority appears
7. Add content in Calendar page and verify it lists
8. Call `/api/ai/follow-up-generator` with JSON payload:

```json
{
  "brandName": "Roast Republic",
  "contactName": "Maya",
  "lastDiscussion": "Pricing and deliverables shared",
  "deliverables": "1 Reel + 3 Stories",
  "tone": "professional"
}
```

## If install still fails in your machine

Try:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```


## Next.js runnable MVP (new)

This repo now includes a Next.js App Router MVP with Tailwind + ShadCN config:

- Admin pages: `/dashboard`, `/crm`, `/follow-ups`, `/tasks`, `/calendar`
- Public pages: `/`, `/about`, `/services`, `/work`, `/contact`
- AI route: `POST /api/follow-up-generator`

### Run in unrestricted environment

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
npm run start
```

### Environment variables

Set in `.env.local`:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=sb_publishable_your_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

For Vercel: add the same keys in Project Settings → Environment Variables.
