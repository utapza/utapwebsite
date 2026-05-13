# Supabase and data overview

**Purpose:** Give contributors a **mental model** of how Supabase is used across uTap. Exact columns and policies live in the **Supabase dashboard** and migrations—not only in this Git workspace.

---

## What Supabase provides here

- **Auth** — Email/password (and any providers you enable in the dashboard).
- **Postgres** — Primary data store for students, cards, commerce, orders, etc.
- **RLS** — Row Level Security: the main **authorization** layer for client apps using the **anon key**.

---

## Clients in this ecosystem

| App | Client location (typical) |
|-----|---------------------------|
| utap-apps | `src/services/supabaseService.js` |
| utap-admin | `src/lib/supabase.ts` |
| utap-vendors | `src/lib/supabase.ts` |

All use `@supabase/supabase-js` with **project URL + anon key**.

---

## Trusted server writes (Netlify + service role)

**Yoco** checkout creation, **webhooks**, **monthly payouts**, **transactional email**, and related automation run as **Netlify Functions** in **`utap-vendors`**, using the **Supabase service role** client where Postgres must be updated **without** relying on end-user **RLS** alone. Treat those functions, their env vars, and **Supabase Auth** redirect settings as part of the same operational boundary as SQL migrations.

## Domain areas (inferred from application code)

These **names** appear in queries; treat as a checklist when exploring the schema:

| Area | Likely tables / concepts |
|------|---------------------------|
| Identity | `auth.users`, `students`, profile-like rows linked to `auth.users.id` |
| Cards | `cards` — logical card JSON, raw NFC payload fields, ownership by user |
| Geography | `universities`, `campuses` |
| Commerce | `stores`, `products`, `store_categories`, `product_categories`, vendor linkage |
| Orders | `orders` — totals, status, payment fields, pickup codes |

**Note:** Column names have evolved (e.g. `total_price` vs older naming); follow **live schema** and TypeScript types if present in each repo.

---

## Row Level Security (RLS)

**Rule of thumb:** If a query runs in the browser or mobile app with the anon key, **RLS must allow or deny** that row. There is no “private” anon key in the client.

Recommendations:

1. **Per-user data** (`cards`, orders as buyer): policies tied to `auth.uid()`.
2. **Vendor role**: policies that restrict writes to rows owned by that vendor’s account (often via a `vendor_id` or membership table).
3. **Admin**: either **service role** only on a trusted server, or a dedicated **admin role** with strict policies—avoid “select all” policies on sensitive tables for anon users.

**Verify** policies in the Supabase UI after any schema change.

---

## Migrations and environments

- Prefer **one staging project** and **one production project** (or branches if you use Supabase branching).
- Document migration commands in your team’s internal wiki if not committed here.

---

## Related docs

- [`../architecture/domain-level-knowledge.md`](../architecture/domain-level-knowledge.md) — full architecture picture  
- [`../risk-and-compliance/pitfalls-and-risks.md`](../risk-and-compliance/pitfalls-and-risks.md) — RLS and payment risks  
- [`../operations/environment-variables.md`](../operations/environment-variables.md) — env var names  
