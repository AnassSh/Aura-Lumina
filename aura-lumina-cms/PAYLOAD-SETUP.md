# Payload CMS – What’s next to run Aura Lumina CMS

This folder is the **Payload CMS** app (admin + API). The `src/app/(payload)/` route group was taken from the [Payload GitHub template](https://github.com/payloadcms/payload). Follow these steps to run it correctly.

---

## 1. Install dependencies

From this folder (`aura-lumina-cms`):

```bash
cd aura-lumina-cms
pnpm install
```

If you don’t use pnpm:

```bash
npm install
```

---

## 2. Environment variables

Copy the example env and set required values:

```bash
cp .env.example .env
```

Edit `.env` and set at least:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string. Use a free DB from [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Vercel Postgres](https://vercel.com/storage/postgres). Format: `postgresql://user:pass@host:5432/db?sslmode=require` |
| `PAYLOAD_SECRET` | Yes | Random string used to sign JWTs. Generate one, e.g. `openssl rand -hex 32`. |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Full URL of this app (no trailing slash). Local: `http://localhost:3000`. |

Optional:

- `CRON_SECRET` – for cron/auth if you use scheduled jobs.
- `PREVIEW_SECRET` – for draft preview URLs.

---

## 3. Run the CMS

Development:

```bash
pnpm dev
# or: npm run dev
```

Then open:

- **Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **GraphQL:** [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

Create the first user when prompted in the admin.

---

## 4. (Optional) Generate types

After changing collections or globals in `src/payload.config.ts`:

```bash
pnpm payload generate:types
# or: npm run payload generate:types
```

This updates `src/payload-types.ts`.

---

## 5. Using this CMS from the main Aura-Lumina site

The **main site** (parent folder `Aura-Lumina`) is a separate Next.js app. To use this CMS as the backend:

1. Run this CMS on a URL (e.g. `http://localhost:3000` or your deployed URL).
2. In the main site’s `.env.local`, set:
   - `PAYLOAD_API_URL=http://localhost:3000/api` (or your CMS URL + `/api`)
   - `PAYLOAD_API_KEY=<api-key>` if you use API key auth.
3. In the main site or in n8n, call Payload’s REST or GraphQL API to fetch products, pages, posts, etc.

You can also keep them separate: use this app only as the admin/API for content, and have n8n or the main site call its API.

---

## Project layout (quick reference)

- `src/app/(payload)/` – Payload admin UI and API routes (from Payload repo).
- `src/payload.config.ts` – Payload config (collections, db, plugins).
- `src/collections/` – Pages, Posts, Media, Categories, Users, **Orders**, **Partners** (Orders & Partners from contact form).
- `src/globals/` – Header, Footer (in this template).
- `src/plugins/` – Redirects, SEO, search, form builder, nested docs.

The config was adjusted so the admin no longer references `BeforeLogin` / `BeforeDashboard` components that are not in this repo; you can add them later if you want.
