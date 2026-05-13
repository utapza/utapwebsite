# Onboarding: utap-vendors

**Location:** sibling repository **`utap-vendors`**. This guide is stored under **`utap-docs`** `docs/fibery/onboarding/` next to the rest of the handbook.

---

## What this app is

**Vendor portal:** Vite + React for campus vendors—landing pages, auth, vendor onboarding (`VendorSetup`), dashboard, payment result screens (`/payment/:status`).

Uses **Supabase** for auth and business data. Ships **Netlify Functions** under `netlify/functions/` (**Yoco** checkout + **webhook**, **Resend** mail, payouts, tickets)—see [`../architecture/domain-level-knowledge.md`](../architecture/domain-level-knowledge.md) §4.

---

## Prerequisites

- Node.js + npm  
- Supabase **URL** and **anon key** for your environment

---

## First-time setup

```bash
cd utap-vendors
npm install
```

Create **`.env`** in the **utap-vendors** root:

```bash
VITE_SUPABASE_URL=<your-project-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

Confirmed in `src/lib/supabase.ts`.

---

## Run locally

```bash
npm run dev
npm run build    # production bundle
```

---

## Where things live

| Area | Path |
|------|------|
| Routes | `src/App.tsx` |
| Auth / vendor hooks | `src/hooks/useAuth.ts`, `useVendor.ts` |
| Dashboard UI | `src/components/layout/Dashboard.tsx` |
| Public layout | `src/components/layout/PublicLayout.tsx` |

---

## Contributing

1. **Vendor vs student data:** RLS should scope vendors to **their** stores and orders—test with a non-privileged vendor account.  
2. **Payments:** Order and fee checkout are driven by **Yoco** + **`utap-apps`**; **`yoco-webhook`** on Netlify is the **authoritative** writer for paid state in Postgres—keep vendor UI and reports aligned with those fields (not client-simulated success).
3. **Lint:** `npm run lint`

---

## Related docs

- [`../platform/platform-map.md`](../platform/platform-map.md)  
- [`../operations/environment-variables.md`](../operations/environment-variables.md)  
- [`../risk-and-compliance/pitfalls-and-risks.md`](../risk-and-compliance/pitfalls-and-risks.md) (payments section)  
