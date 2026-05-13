# Vendor store and promotion analytics — database contract

**Scope:** RPC (Remote Procedure Call) payloads and money semantics for per-store and per-promotion vendor analytics after migrations `20260529130000_vendor_store_promotion_analytics_rpcs.sql` and (for deployed DBs that already ran it) `20260530150000_fix_vendor_promotion_analytics_distinct_json_orders.sql` in `utap-admin` are applied.

**Handoff:** Complements [`vendor-analytics-db-contract.md`](./vendor-analytics-db-contract.md) (customer/product stats). **UI owner:** `utap-vendors` parsers and hooks must match this document.

**Sources of truth**

- **Order-level signed money:** [`order_revenue_facts`](./vendor-analytics-db-contract.md) (same rules as `get_vendor_dashboard_stats`: paid adds, refunded subtracts, pending/failed/cancelled excluded from nets).
- **Ledger snapshot:** `vendor_earnings` joined to `orders` for the same calendar window (order `created_at`), scoped by `store_id` where noted.

---

## 1. `get_vendor_store_analytics`

**Signature**

`get_vendor_store_analytics(p_store_id uuid, p_date_from timestamptz, p_date_to timestamptz, p_all_time boolean DEFAULT false) RETURNS jsonb`

**Security:** `SECURITY DEFINER`, `search_path = public`, caller must be `authenticated` with `auth.uid()` present in `public.vendors`. The store must satisfy `stores.vendor_id = auth.uid()`; otherwise **Forbidden**.

**Parameters**

| Param | Behaviour |
|--------|-----------|
| `p_all_time` | When `true`, `p_date_from` / `p_date_to` ignored for summary scope; **daily chart** uses trailing **365 UTC days** (same pattern as admin store analytics). |
| Else | `p_date_from` & `p_date_to` required, `[from, to)` half-open on `orders.created_at` / `facts.created_at`. |

**Top-level JSON keys**

| Key | Meaning |
|-----|---------|
| `period` | `{ all_time, chart_window_days? }` or `{ from, to, all_time: false }`. |
| `store` | `id`, `name`, `vendor_id`, `university_id`, `campus_id`. |
| `summary` | Counts from **orders** in scope; revenue from **facts_scoped** (`net_gross_revenue`, `net_vendor_revenue`, `net_utap_revenue`). `total_discount_amount`: sum of `orders.discount_amount` signed +1 for paid non-cancelled, −1 for refunded (else 0). `conversion_paid_to_orders`: `fact_paid_rows / fact_order_rows` where rows come from `order_revenue_facts` in scope (mirrors vendor dashboard intent). `cancellation_rate` / `refund_rate`: cancelled or refunded **order row counts** / `total_orders`. |
| `daily_series` | Per UTC day: `orders`, `vendor_net`, `utap_net`, `gross_net` from facts (chart window as above). |
| `top_products` | Line revenue and units with **paid +1 / refunded −1** weighting (aligned with `get_vendor_dashboard_stats` top products), top 20. |
| `orders_by_hour_utc` | Histogram of **orders** in scope by `EXTRACT(hour FROM created_at AT TIME ZONE 'UTC')`, with `gross_net` from joined facts. |
| `customer_segments` | `distinct_buyers`, `repeat_buyers` (≥2 orders in scope with non-null `user_id`). |
| `top_customers` | Up to 15 buyers by signed `gross_net` from facts. |
| `order_status_funnel` | Object map `status → count` for all orders in scope. |
| `peer_multi_store` | Empty array if vendor has one store; else per **other** store of same vendor: `gross_net`, `vendor_net`, `order_count` (fact row count) in period. |
| `finance_reconciliation` | Sums from `vendor_earnings` for `store_id = p_store_id`, joined to orders in date window: **available** rows (`gross_amount`, `platform_fee_amount`, `yoco_transaction_fee_amount`, `vendor_net_amount`) plus **reversed** row counts / `vendor_net` sum. `notes` explains possible small divergence vs `order_revenue_facts`. |
| `operational` | `busiest_hour_utc`, `busiest_dow_utc` (0=Sunday … 6=Saturday UTC) from order timestamps in scope. |

---

## 2. `get_vendor_promotion_analytics`

**Signature**

`get_vendor_promotion_analytics(p_promotion_id uuid, p_date_from timestamptz, p_date_to timestamptz, p_all_time boolean DEFAULT false) RETURNS jsonb`

**Security:** Only **`promotions.owner_type = 'vendor'`** and **`promotions.vendor_id = auth.uid()`**; else **Forbidden** or not found.

**Scope**

- Orders: vendor’s stores only (`stores.vendor_id = auth.uid()`).
- Time window: **`orders.created_at`** in `[from, to)` (or all-time chart window) for joins to facts and redemptions.
- Redemptions: `promotion_redemptions.status <> 'reversed'`.
- **SQL note:** `public.orders` includes a legacy **`downloadables json`** column (not `jsonb`). `SELECT DISTINCT o.*` on orders therefore fails (`could not identify an equality operator for type json`). The RPC dedupes promo-scoped orders with **`DISTINCT ON (o.id) … ORDER BY o.id`** instead.

**Top-level JSON keys**

| Key | Meaning |
|-----|---------|
| `promotion` | Identity and schedule fields from `promotions`. |
| `summary` | `redemption_count`; `vendor_discount_total` / `system_discount_total` from `funded_by`; `order_*_net` sums over **distinct orders** that redeemed this promo from `order_revenue_facts`; `avg_order_vendor_net_with_promo`; `observational_roi_ratio` = `order_vendor_net / vendor_discount_total` when discount > 0 (label as **observational**, not causal). |
| `daily_redemptions` | Count and discount sum per UTC day (bucketed on **order** `created_at`). |
| `daily_revenue_impact` | Per UTC day fact nets for those orders. |
| `comparison_same_vendor` | **Observational buckets:** `this_promo`; `other_vendor_promos` (redemption **row** count + fact nets for orders with any other vendor-owned promo); `orders_without_any_vendor_promo_redemption` (orders on vendor stores with no non-reversed vendor promo redemption). `caveat` string is mandatory reading. |
| `top_products` | Same paid/refunded line weighting on orders that used this promo. |
| `customer_segments` | On those orders. |
| `orders_sample` | Up to 50 most recent orders with discount + fact nets. |

---

## 3. `get_vendor_promotion_orders_export`

**Signature**

`get_vendor_promotion_orders_export(p_promotion_id uuid, p_date_from timestamptz, p_date_to timestamptz, p_all_time boolean DEFAULT false) RETURNS jsonb`

Returns `{ "rows": [ ... ], "row_count": N }` with at most **5000** rows. Same access rules as §2. Row fields: `order_id`, `order_number`, `created_at`, `store_id`, `vendor_net`, `gross_net`, `utap_net`, `discount_amount`, `funded_by`, `payment_status`, `status`.

---

## 4. Non-goals and caveats

- **Incremental revenue / lift / causal ROI** are **not** inferred from these aggregates alone. Use `comparison_same_vendor` only as directional context.
- **Average fulfillment time** is not in v1 RPCs (would require `order_status_history` rules).
- **Customer analytics** qualifying-order rules (completed + paid only) in `vendor_customer_stats` differ from **facts**-based nets here; do not expect numeric equality between those rollups and store facts for the same calendar window.
