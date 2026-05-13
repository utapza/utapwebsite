# Feature policy execution checklist

## Manual test matrix (mobile)

| Scenario | EXPO_PUBLIC / DB | Expected |
|----------|------------------|----------|
| Default app | unset env, no overrides | All tabs visible, NFC works |
| Pilot profile build | `eas build --profile pilot-ushop` | Cards + uGig hidden; Ushop + Orders + Profile visible; no scan FAB |
| University NFC off | `universities.feature_policy_overrides = {"nfcScan":false}` | Scan blocked; RLS blocks card insert |
| User override | profile override `{"ushopTab":false}` | Ushop tab hidden even if uni allows |

## Commands

- Policy merge unit test: `npm run test:feature-policy`
- Apply DB migration: from **`utap-admin`** (Supabase CLI project), run Supabase CLI against the **student** project: `supabase db push` (or paste `utap-admin/supabase/migrations/20260512120000_feature_policy_overrides.sql`).

## Env (build-time)

Set in `.env.local` or EAS env:

`EXPO_PUBLIC_UTAP_FEATURE_DEFAULTS` — JSON object with optional keys: `cardsTab`, `nfcScan`, `nfcWrite`, `ushopTab`, `ugigTab`, `ordersTab`, `profileTab` (booleans). Omitted keys default to enabled in the app merge layer.
