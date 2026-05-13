# Onboarding: utap-admin

**Location:** sibling repository **`utap-admin`** (not inside `utap-apps`). This guide is stored here so all onboarding lives in one Fibery folder.

---

## What this app is

Internal **admin SPA** (Vite + React + TypeScript) for operating the platform:

- Universities, vendors, stores, products  
- Product and store **categories**

It shares **Supabase** with mobile and vendor apps.

---

## Prerequisites

- Node.js + npm  
- Access to the same **Supabase project** as other apps (URL + anon key for development)

---

## First-time setup

```bash
cd utap-admin
npm install
```

Create **`.env`** (or `.env.local` if you prefer) in the **utap-admin** root:

```bash
VITE_SUPABASE_URL=<your-project-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

Vite only exposes variables prefixed with **`VITE_`**. Source: `src/lib/supabase.ts`.

---

## Run locally

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview   # optional local preview of dist/
```

---

## Where things live

| Area | Path |
|------|------|
| Supabase client | `src/lib/supabase.ts` |
| Auth context | `src/contexts/` |
| Routes / pages | `src/App.tsx`, `src/pages/` |
| Components | `src/components/` |

Protected routes sit under `/admin/*` (see `App.tsx`).

---

## Contributing

1. **RLS:** Admin operations often need elevated access—confirm policies allow your admin users without opening student data to anonymous clients.  
2. **Schema:** Coordinate migrations with **utap-apps** and **utap-vendors** if you rename columns.  
3. **Lint:** `npm run lint`

---

## Related docs

- [`../platform/platform-map.md`](../platform/platform-map.md)  
- [`../backend/supabase-and-data-overview.md`](../backend/supabase-and-data-overview.md)  
- [`../operations/environment-variables.md`](../operations/environment-variables.md)  
