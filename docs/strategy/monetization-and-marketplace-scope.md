# uTap — Marketplace scope, monetization, and positioning

**What this document is**  
A concise snapshot of what the mobile app does today, how money flows in code, the new **paid university switch** (ZAR (South African Rand) R100 per change via **Yoco**), how **Ushop** and **uGig** are scoped to the student’s profile university, and how this compares to adjacent student products. Use it for product, pricing, and **GTM (Go-to-Market)** discussions.

---

## 1. Product snapshot (from codebase)

- **Core:** React Native / Expo app — digital student card wallet, **NFC (Near Field Communication)** scanning, **Supabase** auth and data ([utap-apps](https://github.com/utapza/utap-apps) layout per `CLAUDE.md`).
- **Marketplace:** **Ushop** (general campus stores) and **uGig** (sports-category stores) load stores via `ushopService.getStores`, filtered by `university_id` and optional `campus_id`.
- **Payments (orders):** **Yoco** hosted checkout from Netlify `create-yoco-checkout`, completed in-app via `YocoCheckoutWebView`. There is also legacy **Stripe** code paths in the repo; primary student checkout for orders is Yoco in the paths we touched for this work.

---

## 2. Marketplace scope (implemented behaviour)

| Surface | Rule |
|--------|------|
| **Ushop** | Only stores for `profiles.university_id`. Student can still filter **campus** within that university (or “all campuses” for that university). No browsing other universities from this tab. If `university_id` is missing, the screen prompts the user to set university from **Profile**. |
| **uGig** | Same university scope; no store list until `university_id` is set. |

**Why:** Keeps catalogue, fulfilment, and promos aligned to the institution the account is tied to, while still allowing multi-campus universities.

---

## 3. Paid university change (R100, every time)

**Product rule:** Changing `profiles.university_id` costs **R100** each time, paid with **Yoco**, before the new university applies.

**Technical enforcement (high level):**

- Table `public.university_change_requests` holds pending → paid → applied flow and **Yoco** checkout ids.
- **RPC (Remote Procedure Call)** `request_university_change(p_to_university_id)` (authenticated) creates a row; app then calls Netlify `create-university-change-checkout` with the user’s **JWT (JSON Web Token)**.
- **Yoco** webhook branch applies `profiles.university_id` using the **service role** client so it bypasses normal user **RLS (Row Level Security)** but still passes a **trigger** that blocks arbitrary `university_id` edits by end users.
- **App** strips `university_id` from generic `updateUserProfile` updates so the client cannot bypass the fee.

**Pricing note:** R100 is a **psychological anchor** and abuse control (prevents hopping universities to arbitrage local deals). It is **not** justified as “cost recovery” alone; revisit if conversion or support tickets show friction.

---

## 4. Current monetization in code

| Stream | Status |
|--------|--------|
| **Order checkout (Yoco)** | Live pattern: order total → Netlify → Yoco → webhook updates order payment state. |
| **University switch (Yoco)** | New parallel checkout + webhook path; fixed ZAR amount (10000 cents) on the change-request row. |
| **App Store subscriptions / IAP (In-App Purchase)** | Not present in the paths we searched; treat as **future** if you want recurring student revenue. |

---

## 5. Additional monetization ideas (prioritised)

**Medium confidence (fits uTap’s model):**

- **Campus / vendor promos:** sponsored placement in Ushop lists (CPC (Cost Per Click) or fixed weekly slot) — you already merge promotion highlights in `ushopService`.
- **Delivery / convenience fee:** small platform fee on orders where you coordinate logistics (if/when you own delivery).
- **Verified student badge** for gigs or second-hand (trust) — small annual fee or bundled with transfers.

**Lower confidence (needs validation):**

- **Premium NFC features** (e.g. backup / extra card slots) — only if students perceive tangible value beyond free tier.
- **B2B (Business-to-Business) university licences** — admin dashboard + policy (`feature_policy_overrides`) already hints at per-university toggles; pricing per enrolled student or flat campus licence.

---

## 6. Competitors and analogues (desktop research)

| Analogue | How they monetize | Relevance to uTap |
|----------|--------------------|-------------------|
| **UNiDAYS** / **Student Beans** (student discount / verification platforms) | **B2B** brand deals, **affiliate** revenue, verification **SaaS (Software as a Service)** | Different core product (discount discovery vs campus commerce), but useful for **partnerships** and “verified student” positioning—not a template for per-switch student fees. |
| **Campus card / closed-loop wallet** programmes | Often **interchange** or **university contract** | uTap’s open marketplace + **Yoco** is closer to **e-commerce** than closed-loop campus cards; pricing should follow marketplace trust and repeat usage, not only card fees. |

**Takeaway:** uTap’s differentiated monetization is **marketplace + payments + optional platform fees**, not generic student-discount affiliate models—unless you deliberately expand into brand offers.

---

## 7. GTM (Go-to-Market) notes

- **Empty states:** When `university_id` is missing, Ushop/uGig should clearly say *why* stores are hidden and point to Profile (implemented).
- **Transfers / postgrad moves:** Messaging should normalise paying to switch—“moved universities? One-time fee to unlock your new campus stores.”
- **Support:** Store `university_change_requests` ids for refund or webhook mismatch investigation.

---

## 8. Implementation map (for engineers)

| Area | Location |
|------|----------|
| Ushop scope | `utap-apps/src/screens/UshopScreen.js` |
| uGig scope | `utap-apps/src/screens/UGigScreen.js` |
| Profile + change UI | `utap-apps/src/screens/ProfileScreen.js` |
| Change payment client | `utap-apps/src/services/universityChangePaymentService.js` |
| Block client uni updates | `utap-apps/src/services/supabaseService.js` (`updateUserProfile`) |
| DB migration | `utap-apps/supabase/migrations/20260512140000_university_change_requests.sql` |
| Yoco checkout (uni) | `utap-vendors/netlify/functions/create-university-change-checkout.ts` |
| Yoco webhook branch | `utap-vendors/netlify/functions/yoco-webhook.ts` |
| Return pages | `utap-vendors/src/App.tsx`, `PaymentResultPage.tsx` |
| WebView return URL parsing | `utap-apps/src/utils/yocoCheckoutUrls.js`, `YocoCheckoutWebView.js` |

---

## 9. Next validation steps

1. Run the new **SQL (Structured Query Language)** migration on the Supabase project used by production.
2. Deploy **utap-vendors** Netlify functions (`create-university-change-checkout`, updated `yoco-webhook`).
3. End-to-end test: create request → pay on **Yoco** test card → confirm `profiles.university_id` and Ushop catalogue update after `refreshUserProfile`.

---

*Last updated: aligned with implementation in utap-apps, utap-vendors, and this doc path (`utap-docs/docs/strategy/`).*
