Good question to resolve before touching anything. Let me break it down plainly.

## What "revenue definition" actually means here

In your `orders` table, a single order row probably has several money-related columns — something like:

- `total_amount` — what the student was charged (gross)
- `payable_amount` — what the vendor actually receives after uTap takes a cut
- `payment_status` — e.g. `pending`, `paid`, `refunded`, `failed`
- `status` — e.g. `placed`, `confirmed`, `ready`, `cancelled`

The question is: **when you show "Revenue: R4,200 this month" on a dashboard, which number from which rows do you count?**

There are several defensible answers and they give wildly different numbers:

| Definition | What you'd sum | Problem if wrong |
|---|---|---|
| **Gross revenue** | `total_amount` where `payment_status = 'paid'` | Includes uTap's cut — vendor sees inflated number |
| **Vendor payable** | `payable_amount` where `payment_status = 'paid'` | Correct for vendor earnings, wrong for platform-wide revenue |
| **Attempted** | All orders regardless of status | Includes failed payments — massively overstates real money |
| **Settled only** | Paid + payout already processed | Understates current earnings, confuses vendors |

Right now your vendor dashboard (`DashboardOverview.tsx`) and admin dashboard (`analytics.ts`) likely compute this differently because nobody pinned it down. So the same order could count as "revenue" in one place and not another.

## How this affects the DB specifically

If you build RPCs or SQL views now — like the proposed `get_vendor_dashboard_stats(vendor_id, from, to)` — you're hardcoding one of those definitions into a database function. Once that's live and dashboards are built on top of it, changing the definition means:

1. Rewriting the RPC/view
2. Migrating any cached/materialized data
3. Fixing every chart and KPI card that consumed it
4. Explaining to vendors why their "revenue" number changed

Cursor is basically saying: *build the aggregation layer now and you'll probably build it twice.*

## What you need to decide (short product call)

Three questions, quick answers:

**1. What statuses count as "paid" for revenue?**
Probably `payment_status = 'paid'` only — but confirm whether a `refunded` order should subtract from the total or just be excluded.

**2. Gross or payable?**
For the **vendor dashboard**: `payable_amount` (what they earn).
For the **admin dashboard**: probably `total_amount` (platform gross) — but confirm if uTap wants to see its own cut as a separate metric.

**3. Which order statuses are excluded?**
`cancelled` and `failed` almost certainly yes. What about `pending` (payment opened but webhook not confirmed yet)? Showing pending as revenue is dangerous.

---

Once you answer those three, the Cursor prompt for the dashboard implementation becomes safe to run because the RPC and views will be built on agreed ground. Want me to write that Cursor prompt now with placeholder slots for those answers, so you can fill them in and go?