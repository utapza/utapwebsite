# Admin entity analytics RPC (Remote Procedure Call) contract

This document describes JSON payloads returned by admin-only Supabase RPCs used by `utap-admin` entity hubs (stores, universities, campuses, products, categories). All functions require an active admin session (`is_active_admin()`).

## Shared conventions

- **Period:** `period` is always present. `all_time: true` means a rolling chart window (typically 365 days) and **no** `prior_period` block (JSON `null` for that key from Postgres `jsonb_build_object`).
- **Bounded range:** When `all_time` is false, `from` and `to` are ISO timestamps (UTC) for `[from, to)`.
- **Prior period (Prior Period):** When not `all_time`, `prior_period` is the **same-length** window immediately **before** the current range: `[from - (to-from), from)`. The `summary` inside `prior_period` uses the **same field names** as the current `summary` for that entity.
- **Money:** Amounts in ZAR (South African Rand) unless noted. `*_signed` / `net_*` fields come from `order_revenue_facts` where stated.
- **UTC:** Server uses UTC for day boundaries and prior-window math.

## `get_admin_store_analytics`

Defined in `utap-admin/supabase/migrations/20260513143000_admin_store_analytics_prior_period.sql` (replaces earlier definition).

- **`summary`:** Store order counts, payment breakdowns, `net_gross_revenue`, `net_vendor_revenue`, `net_utap_revenue`, AOV (Average Order Value) for completed+paid, sum of line amounts.
- **`prior_period`:** `{ from, to, summary }` with same `summary` shape, or omitted/`null` semantics per client parser when `all_time`.
- **`daily_series`:** Per-day `orders`, `vendor_net`, `utap_net`, `gross_net`.
- **`top_products` / `top_customers` / `orders_by_hour_utc` / `peer_benchmarks` / `customer_summary`:** As implemented in that migration.

## `get_admin_university_analytics` & `get_admin_campus_analytics`

Updated in `utap-admin/supabase/migrations/20260513144500_admin_uni_campus_product_prior_period.sql`.

**University `summary`:** `active_stores`, `active_students`, `total_orders`, `net_gross_revenue`, `net_vendor_revenue`, `net_utap_revenue`.

**Campus `summary`:** `stores_with_orders`, `active_students`, `total_orders`, `net_gross_revenue`, `net_vendor_revenue`, `net_utap_revenue`.

**`prior_period`:** Same shapes as above for the prior window; null when `all_time`.

**`daily_series`:** `date`, `label`, `orders`, `gross_net`.

**University extras:** `campus_breakdown`, `top_stores`, `top_products`.

**Campus extras:** `top_stores`, `top_products`.

## `get_admin_product_analytics`

Updated in `20260513144500_admin_uni_campus_product_prior_period.sql`.

- **`product`:** `id`, `name`, `vendor_id`, `store_id`.
- **`summary`:** `distinct_orders`, `units_sold`, `line_revenue`, `orders_gross_net_signed`, `orders_vendor_net_signed`, `orders_utap_net_signed`.
  - **Line revenue (Line Revenue):** Sum of `order_items` for this product only.
  - **Orders * (facts):** Full-order aggregates from `order_revenue_facts` for any order that contains the product (not allocated to the product line).
- **`prior_period`:** Same `summary` keys for the prior window; null when `all_time`.
- **`daily_series`:** `orders`, `line_revenue`, `gross_net` per day.
- **`reconciliation_note`:** Human-readable explanation of line vs order-level metrics.

## Category RPCs (unchanged shapes)

- **`get_admin_product_category_analytics`:** `summary`: `catalog_products`, `distinct_orders`, `line_revenue`, `orders_gross_net_signed`; `daily_series`; `top_products`.
- **`get_admin_store_category_analytics`:** `summary`: `catalog_stores`, `stores_with_orders`, `total_orders`, `net_gross_revenue`, `net_vendor_revenue`, `net_utap_revenue`; `daily_series`; `top_stores`.

Category RPCs do **not** yet expose `prior_period` (optional follow-up).

## Client parsers

TypeScript types live in `utap-admin/src/types/adminEntityAnalytics.ts`. Parsing is centralized in `utap-admin/src/lib/database.ts` (`parseAdmin*` functions).

When adding columns or RPCs, update this file and the parsers in the same change set.
