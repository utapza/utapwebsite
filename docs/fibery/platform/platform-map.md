# Platform map

**Purpose:** One page to answer “which repo do I open?” and “how do the pieces connect?”

**History:** [§6](#6-recent-commit-themes-all-git-repos) summarises recent **`git log`** themes per repository. **Cross-repo product themes** (availability, email, promos, **CI/CD (Continuous Integration / Continuous Deployment)**) live in [`../architecture/domain-level-knowledge.md`](../architecture/domain-level-knowledge.md#9-product-and-operations-initiatives-cross-repo)—refresh both after a sprint.

---

## 1. Repositories (workspace)

| Repository / folder | Role | Who uses it |
| --- | --- | --- |
| **utap-apps** | React Native / Expo student app: NFC, Ushop, uGig, **Yoco** checkout (**WebView**), profile-university scope, **feature policy** | Students; most engineering time |
| **utap-admin** | Vite + React **SPA (Single Page Application)** on **Netlify**; Supabase; analytics; **feature policy** UI | Internal ops |
| **utap-vendors** | Vite + React vendor portal on **Netlify**; **`netlify/functions`** (**Yoco**, webhooks, payouts, email, tickets); Supabase | Vendors; **platform serverless** owner |
| **utapwebsiite** | Vite + React marketing & content engine: blog, SEO comparison pages, lead magnets, internal launch hub | Public visitors; growth engine |
| **expo-mifare-scanner** | **`@utapza/expo-mifare-scanner`** native module | Consumed by **utap-apps** |
| **utap-docs** | Handbook (`docs/fibery/`), **SSOT (single source of truth)** copy (`docs/system/market/`), topic guides, **`adr/`** | Everyone (may be **non-git** in some clones) |
| **utapchats-export** (optional) | Research / exports | Internal |
| **utap-shared** | Workspace placeholder for future shared packages | Until published: ignore for runtime |

---

## 2. Shared backend

One **Supabase** project: **Postgres**, **Auth**, **RLS (Row Level Security)**. Clients use the anon key; **Netlify Functions** in **`utap-vendors`** use the **service role** for **Yoco** checkout creation, **webhooks**, payouts, and other privileged writes.

---

## 3. Payments and serverless (**Yoco** + **Netlify**)

- **Student checkout:** **`utap-apps`** → **`POST .../create-yoco-checkout`** → **Yoco** hosted URL → in-app **`YocoCheckoutWebView`** → **`yoco-webhook`** confirms → Supabase order / payment fields update.
- **Paid university change:** RPC in Supabase → **`create-university-change-checkout`** (Bearer session) → same **Yoco** + **webhook** pattern for the change-request row.
- **Legacy Stripe:** Fully removed. Do not describe the platform as Stripe-capable. All payments flow through **Yoco**.

Secrets (**Yoco** secret, **Supabase** service role, **Resend**) live in **Netlify** environment config for **`utap-vendors`** (and any site that invokes the email function).

Monetisation narrative + file pointers: [`../../strategy/monetization-and-marketplace-scope.md`](../../strategy/monetization-and-marketplace-scope.md).

---

## 4. Netlify Functions inventory (`utap-vendors/netlify/functions/`)

| Function | Purpose |
| --- | --- |
| `create-yoco-checkout.ts` | Order totals → **Yoco** checkout `redirectUrl`. |
| `create-university-change-checkout.ts` | Fee checkout for **`university_change_requests`**. |
| `yoco-webhook.ts` | Verify **Yoco** events; update Supabase; trigger ticket/email follow-ups as implemented. |
| `create-monthly-payouts.ts` | Scheduled vendor payouts (`export const config` cron). |
| `generate-ticket.ts` | PDF / ticket generation (invoked from paid flows). |
| `send-transactional-email.ts` | **Resend**-backed mail (contact, receipts, etc.); **CORS** allowlists in helpers. |

**Admin** and **mobile** call **`/.netlify/functions/send-transactional-email`** against the **vendors** Netlify base URL where configured.

---

## 5. Deploy surfaces

| App | Hosting (observed from repo config) |
| --- | --- |
| **utap-vendors** | **Netlify** (`netlify.toml`, `dist` publish, functions dir) |
| **utap-admin** | **Netlify** (workflow: `docs/deployment/netlify-github-actions.md`) |
| **utap-apps** | **EAS (Expo Application Services)** binaries; dev via Expo |

---

## 6. Recent commit themes (all **git** repos)

Snapshot from `git log --oneline` (newest first, abbreviated):

| Repo | What changed lately (themes) |
| --- | --- |
| **utap-apps** | Paid **university change** + marketplace scoped to profile uni; **Yoco** **WebView** + `reason_code`; **feature policy** migration + `BUILD_OVERRIDES` / `DISABLED`; orders/promo UX; auth recovery + transactional email client; NFC copy; iOS project cleanup touching Stripe pods. |
| **utap-vendors** | **University change** **Yoco** checkout + webhook; **Resend** email function + landing contact; **payouts** + webhook behaviour; store **hours** / **cutoff**; **Netlify** **CI** docs; vendor auth/store/customers. |
| **utap-admin** | **Feature policy** UI; forgot/reset password; **Netlify** deploy; analytics dashboard; **orders** **RLS** + RPC alignment. |
| **expo-mifare-scanner** | **2.0.11** release line; iOS emulation / availability messaging; native Sentry removed from module. |
| **utapwebsiite** | **Full blog engine** (11+ posts); **SEO comparison pages** (Mr D, Varsity Vibe, Eezipay); **Lead magnet** + `send-cheat-sheet` Netlify function; **Internal Launch Hub** (NMU strategy). |
| **utap-docs** / **utap-shared** | Contains **NMU Launch Strategy** and **30-day Social Bank**. |

---

## 7. Observability

**Sentry:** **`utap-apps`** (`app.json` plugin). **expo-mifare-scanner** no longer embeds Sentry in the native module (see module commit history).

---

## 8. Documentation layout

| Where | Contents |
| --- | --- |
| **`utap-docs/docs/`** | Index [`../../README.md`](../../README.md): **Fibery**, **system/market**, NFC, build, debugging, iOS |
| **`utap-apps/docs/`** | Pointer `development/feature-policy.md` → canonical [`../../development/feature-policy.md`](../../development/feature-policy.md) in this handbook |

---

## 9. Quick navigation

1. Architecture (including **§9 initiatives**) → [`../architecture/domain-level-knowledge.md`](../architecture/domain-level-knowledge.md)  
2. Mobile → [`../onboarding/utap-mobile.md`](../onboarding/utap-mobile.md)  
3. **Netlify** deploy (admin) → **`utap-admin`** `docs/deployment/netlify-github-actions.md`  
4. **Netlify** + functions (vendors) → **`utap-vendors`** `docs/deployment/` and `netlify/functions/`  
5. Money / marketplace scope → [`../../strategy/monetization-and-marketplace-scope.md`](../../strategy/monetization-and-marketplace-scope.md)  
7. Vendor / admin **dashboard UX** plans → **`utap-docs`** [`docs/plans/`](../../plans/) (e.g. vendor profile + repeat customers)  
8. NFC module → [`../nfc/nfc-module-playbook.md`](../nfc/nfc-module-playbook.md) + **`expo-mifare-scanner`** repo
