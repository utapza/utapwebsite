## Context

Read these files before writing anything:

- `utapwebsite/docs/fibery/architecture/domain-level-knowledge.md`
- `utapwebsite/docs/fibery/platform/platform-map.md`
- `utapwebsite/docs/plans/2026-05-12-notifications-system-trigger-audit.md`

The audit document is your source of truth for what to build. Do not invent triggers or channels not listed there.

---

## Goal

Implement the uTap notifications system in phases. Start with **Phase 1** only. Do not scaffold Phase 2 or 3 yet.

---

## Phase 1 — In-app realtime + email (no new dependencies)

### 1A. Student orders — Supabase Realtime subscription

File: `utap-apps/src/services/orderService.js` (and wherever the orders screen subscribes)

The vendor orders list already uses `postgres_changes` on `orders` filtered by `vendor_id`. Mirror that pattern for students:

- Subscribe to `postgres_changes` on `orders` filtered by `student_id` (or `profile_id` — check the actual column name in the orders table)
- On any `UPDATE` to `status`, fire an in-app notification banner (not an `Alert`) showing the new status
- Unsubscribe on screen unmount
- Do NOT replace the existing poll-on-focus; add the realtime subscription alongside it for now

### 1B. Notification banner component

Create `utap-apps/src/components/notifications/NotificationBanner.js`

- Sits at the top of the screen (below the safe area, above content)
- Auto-dismisses after 4 seconds
- Accepts: `{ message: string, type: 'success' | 'info' | 'warning' | 'error' }`
- Use existing theme/colours from the app (check `utap-apps/src/theme` or equivalent)
- Wire it into the root navigator so it can be triggered from anywhere (a simple Context or an event emitter is fine — match whatever pattern the app already uses for global state)

### 1C. Email — new Resend templates (server side only)

In `utap-vendors/netlify/functions/yoco-webhook.ts`:

- After `reverse_order_earning` (late payment after cutoff / auto refund path): call `sendResendEmail` with a new template `order_refunded` explaining the refund. Mirror the existing `maybeSendOrderPaidEmail` pattern in `lib/resolveCustomerEmail.ts` for how to resolve the customer email.
- After a failed payment webhook event: call `sendResendEmail` with template `order_payment_failed`. Same email resolution pattern.
- Do NOT touch the existing `maybeSendOrderPaidEmail` call — it already handles the success case.

In `utap-vendors/netlify/functions/create-monthly-payouts.ts`:

- After admin approves/completes a payout (check `utap-admin/src/components/Payouts.tsx` for the DB update call): add a `sendResendEmail` call with template `payout_completed` to the vendor. Check whether the approval handler is in the admin repo or triggers a DB change that the payout function can react to — if it's a direct Supabase update in the admin SPA, add the email send to the admin-side `emailApi.ts` instead.

### 1D. Vendor portal — new order push (in-app, vendor dashboard)

File: `utap-vendors/src/components/orders/OrdersPage.tsx`

- The Realtime subscription already exists. When a new order arrives via the subscription, show a toast/banner ("New order received") rather than silently updating the list.
- Use whatever toast library is already in `utap-vendors` (check `package.json`). If none, use a simple fixed-position div — do not add a new library.

---

## Phase 2 (do not implement yet — notes only)

Expo Push Notifications for background events:

- `push_tokens` table in Supabase (columns: `profile_id`, `token`, `platform`, `created_at`)
- New Netlify function `send-push-notification.ts` wrapping the Expo Push API
- Wire into `yoco-webhook.ts` after payment confirmed and order ready events
- Requires opt-in flow in `utap-apps` settings screen

## Phase 3 (do not implement yet — notes only)

- Admin → vendor product approval email
- "New vendor registered" admin alert
- In-app notification history screen (requires `notifications` table + RLS)

---

## Constraints

- Match the existing code style in each repo (check neighbouring files before writing)
- No new npm packages unless absolutely necessary — note it clearly if you need one
- All Supabase channel names must be unique strings (follow the pattern in the existing vendor orders subscription)
- All `sendResendEmail` calls must be wrapped in try/catch and must not throw — failed email must never break the webhook response
- Do not add RLS policies without showing the SQL and flagging it for review
- After each file change, state which file was changed and why

Start with 1B (the banner component) since everything else depends on having a way to display notifications. Then 1A, then 1C, then 1D.

```

```
