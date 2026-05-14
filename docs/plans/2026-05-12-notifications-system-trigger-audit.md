# uTap — Notifications trigger audit (pre-implementation)

**Date:** 2026-05-12  
**Scope:** Map every place a **notification** (informing a student, vendor, or admin) *should* fire, based on current code paths. No implementation in this document.

**Context read:** `docs/fibery/architecture/domain-level-knowledge.md`, `docs/fibery/platform/platform-map.md`.  
*(Note: `docs/system/architecture/domain-level-knowledge.md` and `platform-map.md` are not present in this repo; Fibery paths above are the equivalents.)*

---

## Executive summary

- **Email today:** Order payment success uses **Resend** from `utap-vendors/netlify/functions/lib/resolveCustomerEmail.ts`. Scheduled payout **creation** emails vendors from `create-monthly-payouts.ts`. Vendor marketing **contact** uses **`send-transactional-email`**. **NEW:** Lead magnet delivery uses **`send-cheat-sheet`** function in `utapwebsiite` to trigger an automated **5-email nurture sequence**.
- **`send-transactional-email` Netlify function:** Only **`contact_form`** ingress (plus CORS / bearer). **`utap-apps`** `transactionalEmailService.js` and **`utap-admin`** `emailApi.ts` exist but have **no in-repo callers** yet.
- **`send-cheat-sheet` Netlify function:** New marketing ingress in **`utapwebsiite`**. Delivers PDF immediately and starts the drip sequence in Resend.
- **In-app live:** Vendor orders list uses **Supabase Realtime** (`postgres_changes` on `orders`). Mobile uses Realtime on **`profiles`** for **feature policy** refresh only. Student **orders** screen is **poll-on-focus**, not realtime.
- **Push:** No **Expo Push Notifications** integration found in **`utap-apps`** (settings may mention it; no implementation audit hit).

---

## Audit table

| Trigger event | Audience | Repo + file (primary) | Current handling | Notification channel recommendation | Priority |
| --- | --- | --- | --- | --- | --- |
| Order created (`create_order_with_items` RPC success) | Student | `utap-apps` `orderService.js`, `ProductOrderScreen.js` | In-app only (then opens Yoco **WebView**); no server email at create | In-app (order placed) + optional email receipt when **pending** payment | Med |
| Yoco checkout session created (`create-yoco-checkout`) | Student | `utap-vendors` `netlify/functions/create-yoco-checkout.ts`; `utap-apps` `yocoPaymentService.js` | Returns `redirectUrl`; blocked cases return `reason_code` → **`ProductOrderScreen`** `Alert` | In-app (checkout opened / blocked reason) — already partial | Med |
| Checkout return URL: success / cancelled / failed | Student | `utap-apps` `YocoCheckoutWebView.js`, `yocoCheckoutUrls.js`, `ProductOrderScreen.js` | **`Alert`** (“Payment complete” / failed / cancelled); success copy notes webhook may lag | In-app + optional push when payment **confirmed** server-side | High |
| Payment **succeeded** (authoritative) | Student | `utap-vendors` `netlify/functions/yoco-webhook.ts` → `maybeSendOrderPaidEmail` (`lib/resolveCustomerEmail.ts`) | **Email** via **Resend** (`sendResendEmail`) if `RESEND_API_KEY` + resolvable email; idempotent key | Email (keep) + in-app/push “payment confirmed” (avoid duplicate copy with return-URL alert) | High |
| Payment **failed** or **refunded** (webhook) | Student | `utap-vendors` `yoco-webhook.ts` (`reverse_order_earning`) | DB update + logs; **no** customer email | In-app + email for failed/refunded | Med |
| Late payment after order window (`LATE_PAYMENT_AFTER_CUTOFF`, auto refund) | Student | `utap-vendors` `yoco-webhook.ts` | Order cancelled + `order_resolution_events` + Yoco refund API; **no** customer email | Email + in-app (explain refund) | High |
| Order status advanced by vendor (e.g. confirmed → preparing → **ready**) | Student | `utap-vendors` `src/components/orders/OrdersPage.tsx` (`handleStatusUpdate` → `orders` update) | **No** student notification; vendor UI updates list via Realtime | Push + in-app (pickup ready is high value) | High |
| Student cancels order (pending) | Student, vendor | `utap-apps` `OrdersScreen.js`, `orderService.js` | **`Alert`** + Supabase update; vendor sees on refresh / Realtime if subscribed | In-app both sides | Med |
| New order row visible to vendor | Vendor | `utap-vendors` `OrdersPage.tsx` | **Supabase Realtime** `postgres_changes` on `orders` for `vendor_id`; empty state copy says “We will notify you” but **no** push/email | Push/email when offline + keep Realtime when dashboard open | High |
| Ticket PDF generated after paid order with ticket SKU | Student | `utap-vendors` `yoco-webhook.ts` → `generate-ticket.ts` | PDF to storage + `tickets` row; **no** email with link | Email with PDF link + in-app ticket tab | Med |
| University change **request** created (RPC) | Student | `utap-apps` `universityChangePaymentService.js` | DB only | In-app (“request created, complete payment”) | Low |
| University change checkout created | Student | `utap-vendors` `create-university-change-checkout.ts` | Returns Yoco URL | In-app (same as order checkout) | Med |
| University change payment **paid** → profile `university_id` applied | Student | `utap-vendors` `yoco-webhook.ts` (university branch); `utap-apps` `ProfileScreen.js` `onCheckoutSuccess` | **Webhook:** DB truth. **Mobile:** **`Alert`** after return URL success + `refreshUserProfile` | Email receipt optional; in-app already | Med |
| University change payment **failed** | Student | `yoco-webhook.ts` (status `failed`) | DB status update; **no** email | In-app + email | Med |
| Store not accepting orders (RPC / availability) | Student | `utap-apps` `storeAvailabilityService.js`, `ProductOrderScreen.js`, `UshopScreen.js` (indirect) | **`Alert`** / banners from `reason_code` (`CUTOFF_EXCEEDED`, `STORE_PAUSE_NEW_ORDERS`, etc.) | In-app (already) + optional “cutoff reminder” push | Med |
| Vendor edits **hours / cutoff / operational mode** | Student | `utap-vendors` `components/stores/StoreOrderingHoursSection.tsx` (and related store UI) | Persists to Supabase; **no** student broadcast | Realtime or push “store updated” for favourited stores | Low |
| NFC scan read success / failure | Student | `utap-apps` `ScanNFCScreen.js`, `nfcService.js` | **`Alert`** (ready to scan, read errors, success) | In-app sufficient; optional push only for background scans (N/A today) | Low |
| Card saved / duplicate / Supabase errors | Student | `ScanNFCScreen.js` | **`Alert`** | In-app | Med |
| Card cloud **sync** (push/pull) | Student | `utap-apps` `CardContext.js`, `supabaseService.js` | `syncStatus` state + **`Alert`** on auth errors for pull/push | In-app + optional subtle banner (no email) | Low |
| Password **reset requested** | Student / admin user | `utap-apps` `supabaseService.js` + `ForgotPasswordScreen.js`; `utap-admin` `ForgotPasswordPage.tsx` | **Supabase Auth** `resetPasswordForEmail` (platform email — not Netlify `send-transactional-email`) | Email via **Supabase** (keep); optional in-app toast | High |
| Password **reset completed** (new password set) | Student / admin | Supabase hosted flow / `ResetPasswordPage.tsx` (admin) | Depends on Supabase project templates; **no** custom Netlify mail | Email (Supabase) | Med |
| Student registration | Student | `utap-apps` `RegisterScreen.js` / `AuthContext` | **Supabase Auth** confirmation if enabled | Email (Supabase) | Med |
| Vendor self **signup** | Vendor | `utap-vendors` `SignupForm.tsx`, `useAuth.ts` | **Supabase Auth**; **no** “new vendor” admin alert in code | Email to vendor (Supabase) + admin in-app/email “new registration” | Med |
| Vendor **contact form** submitted | Ops / support | `utap-vendors` `ContactPage.tsx` → `emailApi.ts` → **`send-transactional-email`** | **Resend** via Netlify function | Email (keep) | Med |
| Scheduled **monthly payout request** created (cron 28th) | Vendor | `utap-vendors` `create-monthly-payouts.ts` | **Email** via **`sendResendEmail`** (not `send-transactional-email` HTTP) | Email + in-app vendor notification | High |
| Admin **approves / rejects / completes** payout | Vendor | `utap-admin` `Payouts.tsx` | **Toast** for admin only; DB update; **no** vendor email in handler | Email + in-app vendor | High |
| Admin runs “Generate 28th payouts” manually | Admin | `utap-admin` `Payouts.tsx` | Toast with count | In-app admin only | Low |
| Admin updates **university** or **student** feature policy | Student | `utap-admin` `UniversityFeaturePolicyModal.tsx`, `StudentFeaturePolicyModal.tsx`, `database.ts` | DB update; mobile **`FeaturePolicyContext.js`** subscribes to **`profiles`** Realtime → `refreshUserProfile` | In-app banner “Campus features updated” (optional) + keep Realtime | Med |
| Admin dashboard **analytics** load failure | Admin | `utap-admin` `Dashboard.tsx`, `lib/analytics.ts` | Error message / UI | In-app admin | Low |
| Admin **product** approve/reject (catalog) | Vendor | `utap-admin` `Products.tsx` | Status update; **no** automated vendor email in flow | Email + in-app vendor | Med |
| “Flagged activity” / fraud | Admin | *Not implemented as a dedicated flow in audited repos* | — | Define product scope first | Low |
| Order item issue / substitution | Student / vendor | *No dedicated “item issue” workflow found* | — | Future feature | Low |
| `transactionalEmailService` (mobile) | — | `utap-apps` `src/services/transactionalEmailService.js` | **Unused** (no imports) | Wire to `send-transactional-email` only for **new** templates; do not duplicate Resend paths used in webhook/payouts | — |
| Lead magnet request | Student | `utapwebsiite` `send-cheat-sheet.ts` | **Email** via **Resend**; delivers PDF immediately | **Email sequence (5-part)**: Day 0 (Immediate), 3, 7, 14, 21. | High |

---

## `send-transactional-email` vs other Resend paths (avoid duplication)

| Mechanism | Used for |
| --- | --- |
| **`/.netlify/functions/send-transactional-email`** | Vendor site **contact form** only (`template: 'contact_form'`). Bearer + CORS. |
| **`/.netlify/functions/send-cheat-sheet`** | Marketing site **lead magnet** delivery + drip sequence start. |
| **`lib/resendSend.ts` → `sendResendEmail`** | **Order paid** customer receipt (`resolveCustomerEmail.ts`), **scheduled payout** vendor email (`create-monthly-payouts.ts`). |
| **Supabase Auth** | Password reset / confirm for mobile and admin (SMTP / Resend on Supabase side per ops docs). |

**Recommendation:** Extend **`send-transactional-email`** (or a small set of Zod templates) for **new** cross-app emails (vendor new order, admin alerts) so ingress, CORS, and validation stay centralized — but **do not** re-route existing `sendResendEmail` payment flows through that HTTP layer unless there is a clear benefit; instead share **`lib/resendSend`** patterns from a single package later if needed.

---

## Notification infrastructure recommendation

1. **Supabase Realtime (PostgreSQL changes)**  
   - Already used for **vendor orders** and **student feature policy**.  
   - **Extend** to student **`orders`** (and optionally `order_status_history`) for in-app order lifecycle without polling.  
   - Low latency, matches existing BaaS (Backend as a Service) model.

2. **Expo Push Notifications (EPN)**  
   - Use for **high-value async** events: payment confirmed, order ready, payout status, university change final state when the app is backgrounded.  
   - Requires device tokens table, server-side send (Edge Function, Netlify scheduled job, or trusted worker), and user opt-in. Not present today.

3. **Resend**  
   - Keep for **durable** notices: receipts, payout statements, refund explanations, vendor product decisions.  
   - Continue using **`sendResendEmail`** for payment-adjacent idempotency in **`yoco-webhook`** / cron; add templates to **`send-transactional-email`** for new cross-origin cases (admin → vendor, etc.) if you want one HTTP ingress pattern.

**Practical combo:** **Realtime** (in-app live) + **Resend** (email for money + legal-ish) + **EPN** (mobile urgency) + **Supabase Auth** mail unchanged for auth.

---

## Gaps vs your prompt checklist

- **Order lifecycle (vendor-driven statuses):** No student-facing notification.  
- **University admin approve/reject:** Current flow is **paid self-serve** via webhook; no separate admin moderation path in audited code.  
- **NFC:** Strong in-app **`Alert`** coverage; no server-side “scan from another device” notification (not applicable).  
- **Admin “new vendor”:** List UI only; no proactive alert.

---

## Next actions (optional)

- [ ] Decide **notification** row schema (or reuse `notifications` + RLS) and idempotency keys per channel.  
- [ ] Add student **orders** Realtime subscription mirroring vendor pattern.  
- [ ] Spec **EPN** payload mapping for webhook-driven events only after DB commit (same as email today).

---

*End of audit.*
