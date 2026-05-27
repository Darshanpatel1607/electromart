# CreatorOS MVP

A beginner-friendly CreatorOS MVP with:
- Next.js admin app (`/dashboard`, `/crm`, `/follow-ups`, `/tasks`, `/calendar`)
- Public portfolio pages (`/`, `/about`, `/services`, `/work`, `/contact`)
- Supabase-backed CRUD APIs
- OpenAI follow-up generator endpoint

---

## 0) Before you start

Assumptions for this setup:
- Your **Supabase project is already created**.
- You will add your **OpenAI key later**.
- You are running on a normal local environment (not this restricted CI sandbox).

Security rules:
- Never commit `.env.local`.
- Never commit real API keys.
- Use `src/config/env.example` as the safe template.

---

## 1) Local setup (step-by-step)

### Step 1: Open the project
```bash
git clone <your-repo-url>
cd electromart
```

Expected output:
- You should see project files like `package.json`, `app/`, `sql/`.

### Step 2: Install dependencies
```bash
npm install
```

Expected output:
- Installation completes and creates `node_modules/`.
- You should **not** see `403 Forbidden` in a normal environment.

If install fails, run:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Step 3: Create `.env.local`
In the project root (same folder as `package.json`), create `.env.local`:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=sb_publishable_your_key_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=4000
```

Expected result:
- File saved as `.env.local`.
- Do **not** add `/rest/v1/` to the Supabase URL.

### Step 4: Create database tables in Supabase
1. Go to [supabase.com](https://supabase.com) and open your project.
2. In left sidebar, click **SQL Editor**.
3. Click **New query**.
4. Open this local file and copy all SQL:
   - `sql/supabase_schema.sql`
5. Paste into Supabase SQL Editor.
6. Click **Run**.

Expected output:
- Query succeeds.
- Tables created: `collaborations`, `content_calendar`, `tasks`, `brands`, `portfolio_inquiries`.

### Step 5 (optional): Seed demo data
1. In Supabase SQL Editor, click **New query**.
2. Copy and paste SQL from:
   - `src/demo-data/seed_demo_data.sql`
3. Click **Run**.

Expected output:
- Sample rows inserted so admin pages show data immediately.

### Step 6: Start the app
```bash
npm run dev
```

Expected output:
- Next.js starts successfully.
- You should see a local URL, usually `http://localhost:3000`.

---

## 2) First run: what to open

### Admin pages
- `http://localhost:3000/admin-login`
- `http://localhost:3000/dashboard`
- `http://localhost:3000/crm`
- `http://localhost:3000/follow-ups`
- `http://localhost:3000/tasks`
- `http://localhost:3000/calendar`

### Public pages
- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/services`
- `http://localhost:3000/work`
- `http://localhost:3000/contact`

Expected behavior:
- Admin routes redirect to `/admin-login` if not authenticated.
- CRM/Tasks/Calendar forms persist data to Supabase.
- Contact form inserts into `portfolio_inquiries` and creates a CRM lead.

---

## 3) API routes available

- `GET/POST /api/collaborations`
- `PATCH/DELETE /api/collaborations/:id`
- `GET/POST /api/tasks`
- `PATCH/DELETE /api/tasks/:id`
- `GET/POST /api/content-calendar`
- `PATCH/DELETE /api/content-calendar/:id`
- `GET/POST /api/brands`
- `PATCH/DELETE /api/brands/:id`
- `GET/POST /api/portfolio-inquiries`
- `POST /api/follow-up-generator`
- `POST /api/admin-login`
- `POST /api/admin-logout`

---

## 4) Vercel deployment (beginner click-by-click)

### Step 1: Push code to GitHub
```bash
git add .
git commit -m "prepare deploy"
git push
```

### Step 2: Import project in Vercel
1. Go to [vercel.com](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Select your GitHub repo.
4. Click **Import**.

Expected output:
- Vercel detects **Next.js** automatically.

### Step 3: Add environment variables in Vercel
In the project setup screen (or later in **Project Settings → Environment Variables**), add:
- `SUPABASE_URL` = `https://your-project-id.supabase.co`
- `SUPABASE_ANON_KEY` = `sb_publishable_your_key_here`
- `OPENAI_API_KEY` = `your_openai_api_key_here`

Then click **Deploy**.

Expected output:
- Build finishes and Vercel gives you a URL like `https://your-app.vercel.app`.

### Step 4: Verify deployment
Open deployed URL and test:
- `/admin-login`
- `/crm` create a collaboration
- `/follow-ups` generate follow-up draft
- `/contact` submit inquiry

Expected behavior:
- New records appear in Supabase Table Editor.

---

## 5) Common issues and exact fixes

### Issue: `Missing Supabase environment variables`
Fix:
- Check `.env.local` exists in project root.
- Ensure exact names: `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
- Restart dev server after edits.

### Issue: OpenAI route says key missing
Fix:
- Add `OPENAI_API_KEY` in `.env.local` (local) or Vercel env vars (cloud).
- Restart/redeploy.

### Issue: Admin pages keep redirecting to login
Fix:
- Login at `/admin-login` first.
- Ensure browser accepts cookies.

### Issue: CRUD shows errors from Supabase
Fix:
- Re-run `sql/supabase_schema.sql`.
- Confirm table/column names unchanged.

---

## 6) Helpful files

- Env template: `src/config/env.example`
- Supabase schema: `sql/supabase_schema.sql`
- Seed data: `src/demo-data/seed_demo_data.sql`
- Supabase client: `lib/supabase.ts`
- Follow-up logic: `lib/followups.ts`
- Middleware auth: `middleware.ts`

