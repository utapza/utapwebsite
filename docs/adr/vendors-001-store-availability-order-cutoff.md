# ADR 001: Store availability and order cutoff

## Context

Students create orders from the mobile app; vendors configure stores in the web dashboard. We need a single server-side definition of when ordering stops so clients cannot bypass rules.

## Decision

1. **Postgres is the source of truth** for “can we accept an order now?” via `store_availability_eval(store_id, at)` and transactional `create_order_with_items(...)`.
2. Each order stores **`order_window_closes_at`** at creation (frozen). Last moment to pay is enforced again in **`assert_order_checkout_allowed(order_id)`** (called from Netlify before Yoco checkout).
3. **Weekly hours** live in `store_weekly_hours` (per DOW, local open/close times). **Exceptions** in `store_schedule_exceptions`. **Store** carries IANA `timezone`, `operational_mode`, optional buffer override, optional pause window.
4. **Cutoff formula** (implemented in SQL, comments in migration):

   - Local “now” in `stores.timezone`.
   - If `operational_mode` is `closed`, or `pause_new_orders` while pause window applies → reject.
   - If exception `is_closed` for local date → reject.
   - If no weekly row for that DOW → `order_window_closes_at = infinity` (no schedule-bound close).
   - Else require local clock inside `[open_local, close_local)`; build close timestamp in store TZ; subtract `COALESCE(store.order_cutoff_buffer_minutes, platform.default_cutoff_buffer_minutes)` minutes → `order_window_closes_at`.
   - Reject new orders when `now() > order_window_closes_at`.

5. **Late Yoco payment**: if `payment.succeeded` arrives after `order_window_closes_at`, webhook marks order cancelled, sets `availability_reason_code = LATE_PAYMENT_AFTER_CUTOFF`, logs `order_resolution_events`, and **POST**s Yoco checkout refund with an idempotency key.

## Consequences

- Migrations must be applied to Supabase before mobile or Netlify changes work.
- `create_promotion_redemptions_for_order` must exist (promotions migration) or RPC creation will fail.
- Refund success is finalized by Yoco webhooks (`refund.succeeded`); existing handler updates `payment_status`.

## Order / payment matrix (summary)

| Payment | Order status | Cutoff / store close | Default action |
|---------|--------------|----------------------|----------------|
| pending | pending | cutoff / pause / close | Reject new order at RPC; unpaid orders may be deleted by existing flows |
| paid | pending / confirmed | late webhook | Auto-cancel + request refund (implemented for late webhook path) |
| paid | preparing+ | close | Vendor / product policy; not auto-refunded in this ADR |

Reason codes include: `CUTOFF_EXCEEDED`, `STORE_CLOSED`, `STORE_PAUSE_NEW_ORDERS`, `OUTSIDE_OPEN_HOURS`, `SCHEDULE_EXCEPTION_CLOSED`, `ORDER_CUTOFF_PASSED`, `LATE_PAYMENT_AFTER_CUTOFF`.
