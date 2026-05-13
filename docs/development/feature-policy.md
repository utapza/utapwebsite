# Mobile feature policy

**What this is**  
A single system that decides which parts of the uTap app are on: bottom tabs, NFC (Near Field Communication) flows, and related screens. Values come from the **build** (env), then **university**, then **user** in **Supabase** (hosted **PostgreSQL** database).

**Why it exists**  
Ship pilot binaries (for example Ushop-only) without a separate app fork. Admins can tighten or relax flags per university or per student later.

---

## Feature keys

Each key is a boolean in the merged policy. If a key is missing, the app treats it as **on** (safe default).

| Key | Typical use |
|-----|-------------|
| `cardsTab` | Cards bottom tab |
| `ushopTab` | Ushop bottom tab |
| `ugigTab` | uGig bottom tab |
| `ordersTab` | Orders bottom tab |
| `profileTab` | Profile bottom tab |
| `nfcScan` | Scanning / NFC entry flows |
| `nfcWrite` | NFC write flows |

**Code:** `FEATURE_POLICY_KEYS` in `src/config/featurePolicy.js`.

---

## Merge order (who wins)

A → B → C → D:

1. **Product default** — all `true`.
2. **Build-time env** — only if **`EXPO_PUBLIC_UTAP_FEATURE_BUILD_OVERRIDES`** is truthy (see below).
3. **University** — `universities.feature_policy_overrides` (**JSONB (JavaScript Object Notation Binary)** partial object).
4. **Profile (user)** — `profiles.feature_policy_overrides` (**JSONB** partial object).

Later steps override earlier ones **only for keys they set**. `null` or missing overrides are ignored (no Zod noise).

**Code:** `mergeFeaturePolicies` / `mergeFeaturePoliciesWithAudit` in `src/config/featurePolicy.js`; data from `getUserProfile` in `src/services/supabaseService.js` (nested `universities`).

---

## Build-time flags (`EXPO_PUBLIC_*`)

These are baked in when **Metro** bundles the app (local dev or **EAS (Expo Application Services)** build). They are **not** secure secrets; they only hide UI / client flows.

### Opt-in gate (important for local dev)

**`EXPO_PUBLIC_UTAP_FEATURE_BUILD_OVERRIDES`**

- Accepts: `1`, `true`, `yes`, `on` (case-insensitive, trimmed).
- If **not** set: **`EXPO_PUBLIC_UTAP_FEATURE_DEFAULTS`** and **`EXPO_PUBLIC_UTAP_FEATURE_DISABLED`** are **ignored**. You get full product defaults at build layer, so stray shell variables do not strip tabs.
- **Supabase** overrides still apply when the user is signed in.

### When the gate is on

| Variable | Purpose |
|----------|---------|
| `EXPO_PUBLIC_UTAP_FEATURE_BUILD_OVERRIDES` | Must be truthy for any of the rows below to apply. |
| `EXPO_PUBLIC_UTAP_FEATURE_DISABLED` | Comma-separated keys forced to **false**. No JSON. Example: `cardsTab,nfcScan,nfcWrite,ugigTab`. |
| `EXPO_PUBLIC_UTAP_FEATURE_DEFAULTS` | Optional legacy **JSON** object string (partial flags). Applied first; **`DISABLED`** still forces listed keys off. |

**EAS:** Profile `pilot-ushop` in `eas.json` sets `BUILD_OVERRIDES=1` and `DISABLED=...` for store-style pilots.

**Local:** Add the vars to `.env.local` (loaded by `babel-plugin-inline-dotenv` in `babel.config.js`). Restart Metro after changes; use `npx expo start --clear` if values look stuck.

---

## Supabase (server-side)

**Migration:** `supabase/migrations/20260512120000_feature_policy_overrides.sql` (and related history on hosted projects).

Roughly includes:

- `profiles` + `universities`: column `feature_policy_overrides` (**JSONB**).
- **RPC (Remote Procedure Call)** `effective_feature_flag(user_id, flag)` for **RLS (Row Level Security)** on `cards` (insert/update gated when `nfcScan` is off).
- Triggers so non-admins cannot self-edit `profiles.feature_policy_overrides`; admins via `admin_users` where applicable.

**Admin UI:** `utap-admin` can edit university (and related) overrides; per-user overrides follow the same **JSONB** shape.

Patch shape (same keys as the table above), only booleans, extra keys rejected by **Zod** validation in the app.

---

## App wiring

| Piece | Role |
|-------|------|
| `FeaturePolicyProvider` | `src/context/FeaturePolicyContext.js` — merges build + profile + university; subscribes to `profiles` updates for the signed-in user. |
| `useFeaturePolicy()` | Returns `{ isFeatureEnabled, effectivePolicy, buildDefaults }`. |
| `AppNavigator` | Filters main tabs by `isFeatureEnabled(featureKey)`. |
| `useFeatureScreenGuard` | `src/hooks/useFeatureScreenGuard.js` — redirects away from a stack screen when a flag is off. |
| Screens | `HomeScreen`, `CardDetailsScreen`, `ProfileScreen`, etc. gate NFC with `isFeatureEnabled('nfcScan')` (and related keys). |

---

## Dev-only logging

When **`__DEV__`** is true, the provider logs two spaced blocks via `logFeaturePolicyDev`:

1. **Build-time feature policy** — trace from `resolveBuildDefaultFeaturePolicy()` (source, raw env hints).
2. **Effective feature policy** — merge audit: raw university/profile **JSONB**, `afterUniversity`, final policy, `disabledKeysSummary`.

Search Metro output for `[featurePolicy]`.

---

## Troubleshooting

1. **Tabs missing locally but `.env.local` has no feature vars**  
   - Ensure **`EXPO_PUBLIC_UTAP_FEATURE_BUILD_OVERRIDES`** is **unset** unless you want build overrides.  
   - `unset EXPO_PUBLIC_UTAP_FEATURE_DEFAULTS EXPO_PUBLIC_UTAP_FEATURE_DISABLED EXPO_PUBLIC_UTAP_FEATURE_BUILD_OVERRIDES` in the same shell you use for `expo start`.  
   - Restart Metro with `--clear`.

2. **Tabs missing when signed in**  
   - Check logs for `universityOverridesRaw` / `profileOverridesRaw`.  
   - In **Supabase** SQL editor, inspect `profiles.feature_policy_overrides` and `universities.feature_policy_overrides` for that user’s university.

3. **Pilot build does not restrict tabs**  
   - Confirm the **EAS** profile sets **`EXPO_PUBLIC_UTAP_FEATURE_BUILD_OVERRIDES=1`** and **`DISABLED`** (or **DEFAULTS**) for that profile. Rebuild; **OTA (Over-The-Air)** updates cannot change `EXPO_PUBLIC_*` without a new binary if your pipeline bakes them at build time.

4. **Unit script**  
   - `npm run test:feature-policy` runs `scripts/run-feature-policy-tests.mjs`.

---

## Related files

- `src/config/featurePolicy.js` — parse, merge, audit helpers.  
- `src/context/FeaturePolicyContext.js` — **React** context + logging.  
- `eas.json` — `pilot-ushop` env example.  
- `CLAUDE.md` — short env summary for agents.  
- `supabase/migrations/20260512120000_feature_policy_overrides.sql` — database side.
