# Admin vendor detail — analytics and reconciliation contract

**Scope:** Remote Procedure Calls (RPCs) and JSON shapes used by the **utap-admin** vendor detail hub (`VendorDetail` and related components).  
**DB owner:** `utap-admin/supabase/migrations/` (notably `20260528120000_admin_vendor_detail_reconciliation_rpcs.sql`).  
**UI owner:** `utap-admin/src/pages/VendorDetail.tsx`, `utap-admin/src/components/vendor-detail/*`, `utap-admin/src/types/adminVendorDetail.ts`, parsers in `utap-admin/src/lib/database.ts`.

**Related:** Vendor customer/product qualifying orders and money semantics for the **vendor app** remain in [`vendor-analytics-db-contract.md`](./vendor-analytics-db-contract.md). Admin RPCs reuse the same **vendor scope** and **`order_revenue_facts`** rules as `get_admin_vendor_period_analytics`.

---

## 1. Vendor scope (all admin vendor RPCs)

An order row is in scope when:

- `orders.vendor_id = p_vendor_id`, **or**
- `orders.store_id` belongs to a store where `stores.vendor_id = p_vendor_id`.

Date filtering uses **`orders.created_at`** (and matching `order_revenue_facts.created_at`, which is derived from the order in the view) unless noted otherwise.

When `p_all_time = true`, date predicates are skipped for facts/orders aggregates (payout “completed in period” still follows the rules in §4).

---

## 2. `get_admin_vendor_financial_reconciliation`

**Purpose:** One JSON payload for the **Financials** tab: facts rollups, ledger rollups, payout period totals, lifetime `vendor_finance_balances` snapshot, reconciliation flags, and a fixed **last 6 calendar months** gross_net series from `order_revenue_facts` (UTC month buckets).

### 2.1 `facts_summary` (from `order_revenue_facts` in window)

| Field | Meaning |
|--------|--------|
| `net_gross_revenue` | `SUM(gross_net)` — signed; paid adds, refunded subtracts. |
| `net_vendor_revenue` | `SUM(vendor_net)` — payable-based vendor share per view definition. |
| `net_utap_revenue` | `SUM(utap_net)` — gross − payable per row, signed. |
| `paid_like_rows` | Count where `payment_status = 'paid'` and status ≠ cancelled. |
| `refunded_rows` | Count where `payment_status = 'refunded'`. |
| `failed_payment_rows` | Count where `payment_status = 'failed'`. |
| `total_discount_amount` | `SUM(orders.discount_amount)` over **`orders_in_scope`** (all statuses in the window). |

### 2.2 `ledger_summary` (from `vendor_earnings`)

Joined to **`orders_in_scope`** on `vendor_earnings.order_id = orders.id`. Only rows with **`status = 'available'`** contribute to sums.

| Field | Meaning |
|--------|--------|
| `gross_amount` | Sum of ledger gross at earning time. |
| `yoco_transaction_fees` | Sum `yoco_transaction_fee_amount`. |
| `platform_commission` | Sum `platform_fee_amount`. |
| `vendor_net_amount` | Sum `vendor_net_amount` (gross − Yoco online fee − platform fee at earning time). |
| `system_net_earning_amount` | Sum `system_net_earning_amount`. |
| `reversed_earning_rows` | Count of earnings joined to scoped orders with `status = 'reversed'`. |

**Why facts vs ledger can differ:** Promotions change `payable_amount` / customer totals while `record_order_earning` historically used pre-promo gross for fee decomposition in some paths — treat drift as a signal, not a bug to hide.

### 2.3 `payouts_summary` (from `vendor_payout_requests`)

| Field | Meaning |
|--------|--------|
| `completed_net_to_vendor_in_period` | Sum `net_vendor_payment_amount` for `status = 'completed'` with `completed_at` in `[p_date_from, p_date_to)`; if `p_all_time`, all completed payouts for the vendor. |
| `yoco_payout_fees_in_period` | Same window filter on `yoco_payout_fee_amount`. |
| `completed_payout_count_in_period` | Count of completed payouts in that window definition. |
| `pending_requested_amount` | Sum `requested_amount` where status ∈ `pending`, `approved`, `processing` (**not** date-filtered — pipeline snapshot). |
| `pending_count` | Count of those rows. |

### 2.4 `balance_snapshot` (from `vendor_finance_balances`)

Single-row lifetime view: `lifetime_earned_amount`, `available_balance`, `paid_out_amount`, `pending_payout_amount`, `lifetime_system_net_earning`, `lifetime_yoco_transaction_fees`, `lifetime_yoco_payout_fees`. **`not_range_filtered: true`** in JSON — UI must label as lifetime.

### 2.5 `reconciliation`

| Field | Meaning |
|--------|--------|
| `vendor_net_delta_facts_minus_ledger` | `facts_summary.net_vendor_revenue − ledger_summary.vendor_net_amount` (rounded). |
| `vendor_net_match` | `true` when absolute delta &lt; 0.02 ZAR. |
| `orders_paid_no_available_earning` | Count of scoped orders with `payment_status = 'paid'`, status ≠ cancelled, and **no** `vendor_earnings` row in `available`. |

### 2.6 `last_6_months_gross_net`

Six UTC month buckets ending at the current month: each point is `SUM(gross_net)` from `order_revenue_facts` for the vendor scope. **Not** controlled by `p_date_from` / `p_to` (always trailing six months for trend continuity).

---

## 3. `get_admin_vendor_orders_financial_page`

**Purpose:** Filterable, **server-paginated** order list with both **facts** and **ledger** columns for reconciliation.

**Parameters:** `p_vendor_id`, `p_date_from`, `p_date_to`, `p_all_time`, `p_page` (1-based), `p_page_size` (1–100), `p_sort` (reserved; server uses `created_at DESC` for stable paging), optional filters `p_status`, `p_payment_status`, `p_store_id`, `p_search` (matches order id text, `customer_display_name`, `order_number`, or profile `display_name` / `email`).

**Response:**

- `total` — matching rows before limit.
- `summary` — sums over **all** matching rows (same filter): `sum_fact_*`, `sum_discount_amount`, `sum_ledger_*`.
- `rows` — page slice; ledger columns are **zeroed** when `vendor_earnings.status` is not `available` (reversed rows still show `earning_status`).

**CSV (UI):** Exports the **current page** only (`downloadCsv`); “export all pages” would require looping RPC calls client-side or a future dedicated export RPC.

---

## 4. `get_admin_vendor_product_performance`

**Purpose:** Product rollup for **qualifying** orders only (aligned with vendor customer/product analytics spirit):

- `payment_status = 'paid'`
- `status = 'completed'`
- `user_id IS NOT NULL`
- `store_id IS NOT NULL`
- Order in vendor scope and date window (or all time).

**Row fields:** `revenue` (sum line `total_price`), `units_sold`, `order_count`, `avg_revenue_per_unit`, `promo_line_savings` = sum of `GREATEST(0, unit_price × quantity − line total)` per line.

---

## 5. Security

All three functions are **`SECURITY DEFINER`**, `SET search_path = public`, and require an **`admin_users`** row for `auth.uid()` with `is_active = true`. Grants: `REVOKE ALL FROM PUBLIC`; `GRANT EXECUTE` to `authenticated` and `service_role`.

---

## 6. When to update this document

Update this file in the same change set when you:

- Change JSON keys, filters, or aggregation rules for any of the three RPCs.
- Change vendor scope or date semantics.
- Add columns to the admin orders or financials UI that depend on new RPC fields.
