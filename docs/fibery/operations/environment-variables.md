# Environment variables contract

**Purpose:** List **names** and **where** they are read. Never commit real keys or paste them into docs.

---

## utap-apps (sibling repo — React Native / Expo)

Loaded via **babel-plugin-inline-dotenv** from **`.env.local`** at the project root of **`utap-apps`** (see that repo’s `babel.config.js`).

| Variable | Used for | Required for local dev |
|----------|----------|------------------------|
| `SUPABASE_URL` | Supabase project URL | Yes (real features) |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes (real features) |
| `EXPO_PUBLIC_UTAP_FEATURE_BUILD_OVERRIDES` | Set to `1` to honour feature env overrides | No |
| `EXPO_PUBLIC_UTAP_FEATURE_DISABLED` | Comma list of feature keys to force off | No |
| `EXPO_PUBLIC_VENDOR_FUNCTIONS_BASE_URL` | Base URL for **`/.netlify/functions`** (defaults to **`utap-vendors`** production) | No |

If Supabase vars are missing, `supabaseService.js` may fall back to a **placeholder** client—features will not work; do not ship production builds in that state.

**Yoco / payments:** No **Yoco** secrets in the app—only public URLs returned from **`create-yoco-checkout`** / **`create-university-change-checkout`**. **`EXPO_PUBLIC_VENDOR_FUNCTIONS_BASE_URL`** points at the deployed **`utap-vendors`** site if you need staging.

**Sentry:** DSN and release naming can come from Expo / env depending on your setup—check `src/config/sentry.js` and `app.json` plugins.

---

## utap-admin (sibling repo — Vite)

Vite exposes variables prefixed with **`VITE_`**.

| Variable | Used for |
|----------|----------|
| `VITE_SUPABASE_URL` | `src/lib/supabase.ts` |
| `VITE_SUPABASE_ANON_KEY` | `src/lib/supabase.ts` |

Create a **`.env`** or **`.env.local`** in the admin repo root (follow that repo’s `.gitignore`).

---

## utap-vendors (sibling repo — Vite + Netlify Functions)

| Variable | Used for |
|----------|----------|
| `VITE_SUPABASE_URL` | `src/lib/supabase.ts` |
| `VITE_SUPABASE_ANON_KEY` | `src/lib/supabase.ts` |

**Netlify (dashboard only — do not commit values):** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `YOCO_SECRET_KEY`, `RESEND_API_KEY`, `PUBLIC_SITE_URL`, and other keys read by `netlify/functions/*`. See that repo’s `docs/deployment/` and [`../architecture/domain-level-knowledge.md`](../architecture/domain-level-knowledge.md) §4.

---

## utapwebsiite (sibling repo)

Uses Supabase package in `package.json`; confirm env naming in that repo’s `src/` if you add server-side or client queries. Many marketing-only builds may not need Supabase until you wire forms or dynamic content.

---

## expo-mifare-scanner (sibling repo)

Mostly **no app secrets**; module is consumed as an npm dependency. Publishing uses npm tokens on the developer machine or CI—do not commit `.npmrc` with tokens.

---

## Shared rules

1. **Never commit** `.env` files that contain real keys; use `.env.example` with placeholder names only if you want templates.
2. **Anon keys** are public in client apps by design; **protection is RLS**, not hiding the anon key.
3. **Yoco secret keys**, **Resend API keys**, and **Supabase service role keys** belong only on **servers** (**Netlify** for **`utap-vendors`** functions, future **Supabase Edge Functions**, etc.)—not in mobile or Vite bundles.

See also [`../risk-and-compliance/security-and-secrets.md`](../risk-and-compliance/security-and-secrets.md).
