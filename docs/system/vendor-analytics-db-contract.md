# Vendor analytics — database contract

**Scope:** Canonical shapes and rules for vendor customer/product analytics after migrations under `utap-admin/supabase/migrations` are applied (through `20260526120000_vendor_customer_stats_total_spent_align.sql`).  
**Sources:** Migrations listed below; `supabase/backup/full_dump.sql` is a **partial** snapshot (it does not include `vendor_*_stats`) and is only used where it matches migration-defined checks.

**Handoff:** This file is the single contract between **DB owner** (`utap-admin` migrations) and **UI owner** (`utap-vendors`). Update it when migrations change RPC payloads, money semantics, or qualifying-order rules so the vendor app does not drift silently.

**Admin operator hub:** For platform-side vendor reconciliation (facts vs ledger, payouts, paginated orders), see [`admin-vendor-detail-analytics-contract.md`](./admin-vendor-detail-analytics-contract.md) (`utap-admin` UI + matching RPCs).

**Store and promotion analytics (per-store / per-promo RPCs):** See [`vendor-store-promotion-analytics-contract.md`](./vendor-store-promotion-analytics-contract.md) (`get_vendor_store_analytics`, `get_vendor_promotion_analytics`, `get_vendor_promotion_orders_export`).

---

## 1. Migration authority (apply order)

| Order | File | Role |
|------:|------|------|
| 1 | `20260522143000_vendor_customer_product_stats.sql` | Creates `vendor_customer_stats`, `vendor_product_stats`, `private._recompute_*`, trigger `orders_stats_sync` → `private._orders_stats_trigger()`, helper `private._loyalty_tier_from_orders`, grants. |
| 2 | `20260523120000_vendor_customer_product_stats.sql` | Adds alternate `private.recompute_*` + duplicate trigger `vendor_stats_orders_aiud` (later removed). `CREATE TABLE IF NOT EXISTS` for stats tables is a **no-op** if (1) already ran. |
| 3 | `20260525103000_consolidate_vendor_customer_stats.sql` | Drops duplicate trigger path and `private.recompute_*`. **Replaces** `public.get_vendor_customer_stats_page` and `public.get_vendor_customer_detail`. Leaves **`private._recompute_*` + `private._orders_stats_trigger`** from (1) as the **only** stats writer path. |
| 4 | `20260525130000_vendor_analytics_promotions_contract_fix.sql` | Finance / `vendor_earnings` / `record_order_earning`; does **not** change vendor customer RPCs or stats tables. |
| 5 | `20260529130000_vendor_store_promotion_analytics_rpcs.sql` | Adds `get_vendor_store_analytics`, `get_vendor_promotion_analytics`, `get_vendor_promotion_orders_export` (vendor-scoped; see [`vendor-store-promotion-analytics-contract.md`](./vendor-store-promotion-analytics-contract.md)). |
| 6 | `20260526160000_qa_seed_order_fixture.sql` | Adds `public.qa_seed_order` (**service_role** only): inserts QA orders (`order_number` prefix `QA-FIX-`), line items, status history, optional `record_order_earning` / `reverse_order_earning`, `payment_transactions`, resolution/refund rows. Does **not** change qualifying-order rules or customer RPC shapes; uses the same semantics as production paths for analytics verification. |
| 7 | `20260530140000_validate_order_promotions_as_of_timestamp.sql` | Replaces `validate_order_promotions` with a 5-argument form: optional `p_as_of timestamptz` (default `NULL` → `now()`). Same eligibility rules as before, but promotion windows and limits are evaluated at order time — required for realistic `promotion_redemptions` in backdated seeds (`003_seed_240_orders_two_students.sql`). |
| 8 | `20260530150000_fix_vendor_promotion_analytics_distinct_json_orders.sql` | Re-applies `get_vendor_promotion_analytics`: use `DISTINCT ON (o.id)` instead of `DISTINCT o.*` on `orders` so the `downloadables json` column does not require JSON equality during dedupe. |

**Net:** Table DDL comes from **(1)**; customer spend rollup formula is **(1)** as amended by **`20260526120000_vendor_customer_stats_total_spent_align.sql`**. Vendor-facing customer RPC JSON comes from **(3)**.

---

## 1b. QA fixture RPC (`public.qa_seed_order`)

- **Execute as:** `service_role` only (Supabase service key). Not granted to `authenticated` or `anon`.
- **Purpose:** Deterministic order lifecycle fixtures for local/staging verification of revenue + `vendor_*_stats` (same qualifying rules as §2).
- **Parameters:** `p_scenario` (`pending_unpaid` | `cancelled_unpaid` | `payment_failed` | `confirmed` | `preparing` | `ready` | `completed` | `refunded`), `p_user_id`, `p_store_id`, `p_items` (json array of `{ product_id, quantity, unit_price }`), optional `p_created_at`, optional `p_customer_display_name`.
- **Returns:** `jsonb` `{ success, order_id, order_number, scenario }` or `{ success: false, error }`.
- **Node wrapper:** `@utap/order-fixtures` in repo `utap-shared` (see package `README.md`).

---

## 1c. Destructive bulk wipe + 240-order SQL seeds (operators)

These are **manual SQL files** under `utap-admin/supabase/migrations/seeds/orders/` (not applied by `supabase db push`). They do **not** change RPC payloads, qualifying-order rules (§2), or customer RPC shapes.

| File | Role |
|------|------|
| `002_wipe_transactional_and_stats.sql` | Deletes **all** `public.orders` (children CASCADE), clears `vendor_payout_requests`, and deletes rows from materialized analytics tables (`vendor_customer_stats`, `vendor_product_stats`, `student_analytics`, `vendor_performance_stats`, `student_badge_awards`, `student_gamification`). Preserves `platform_order_settings`, `finance_settings`, catalog, and identities. |
| `003_seed_240_orders_two_students.sql` | Idempotent on `order_number LIKE 'SEED-240-%'`; inserts 240 **paid** + **completed** orders for two fixed students at one university, uses `public.record_order_earning` (same finance path as the Yoco webhook), then calls admin refresh RPCs (`refresh_student_analytics_for_student`, `refresh_vendor_performance_for_vendor`, `recompute_student_rfm_scores`, `recompute_vendor_performance_quadrants`, optional `refresh_student_gamification_campus_ranks`). |

Run order: **002** then **003** on **staging or local** only. Operator notes live in `utap-admin/supabase/migrations/seeds/README.md`.

---

## 2. Qualifying orders (analytics inclusion)

These rules appear in `private._orders_stats_trigger` and in the customer RPC filters.

**A row in `public.orders` qualifies when:**

- `payment_status = 'paid'`
- `status = 'completed'`
- `user_id IS NOT NULL` (student / customer identity)
- `store_id IS NOT NULL`

**Trigger behavior (summary):** On `INSERT`, `UPDATE`, or `DELETE` on `orders`, the trigger recomputes affected `(vendor_id, user_id, store_id)` customer cells and `(vendor_id, product_id, store_id)` product cells when an order **enters**, **leaves**, or **moves** the qualifying set (including key changes on `vendor_id`, `user_id`, `store_id`).

---

## 3. Table: `public.vendor_customer_stats`

**Defined in:** `20260522143000` (first creator). `20260523120000` would only create if missing; in normal ordering the schema below is what exists.

| Column | Type | Notes |
|--------|------|--------|
| `id` | `uuid` PK, default `gen_random_uuid()` | |
| `vendor_id` | `uuid` NOT NULL → `public.vendors(id)` ON DELETE CASCADE | |
| `student_id` | `uuid` NOT NULL | Same identity as `orders.user_id` / `profiles.id` (see migration comment). |
| `store_id` | `uuid` NOT NULL → `public.stores(id)` ON DELETE CASCADE | |
| `total_orders` | `integer` NOT NULL default `0` | Count of qualifying orders. |
| `total_spent` | `numeric(14,2)` NOT NULL default `0` | Sum of **order-level** amounts per §6.1 (trigger path). |
| `average_order_value` | `numeric(14,2)` NOT NULL default `0` | `ROUND(total_spent / total_orders, 2)`. |
| `first_purchase_date` | `timestamptz` | `MIN(created_at)` over qualifying orders. |
| `last_purchase_date` | `timestamptz` | `MAX(created_at)` over qualifying orders. |
| `most_purchased_product_id` | `uuid` → `public.products(id)` ON DELETE SET NULL | Product with highest **line quantity** sum (ties: higher `product_id` ordering in subquery). |
| `most_purchased_category` | `text` | From `products.category` (free-text column) for the top product row in recompute — **not** `product_categories.name` in the trigger path. |
| `loyalty_tier` | `text` NOT NULL default `'New'` | CHECK in `20260522143000`: `'New'`, `'Regular'`, `'Loyal'`, `'VIP'`. Values from `private._loyalty_tier_from_orders(total_orders)`: ≥16 → VIP, ≥6 → Loyal, ≥2 → Regular, else New. |
| `updated_at` | `timestamptz` NOT NULL default `now()` | |

**Uniqueness:** `UNIQUE (vendor_id, student_id, store_id)` — one rollup row per vendor × student × store.

**Row Level Security (RLS):** Enabled. Policy from `20260522143000`: `vendor_customer_stats_vendor_select` — `SELECT` for `authenticated` where `vendor_id = auth.uid()`. `20260523120000` adds `vendor_customer_stats_select_own` with the same predicate (both may coexist; effect is OR across permissive policies).

**Grants:** `SELECT` to `authenticated` and `service_role` (`20260522143000`).

---

## 4. Table: `public.vendor_product_stats`

| Column | Type | Notes |
|--------|------|--------|
| `id` | `uuid` PK | |
| `vendor_id` | `uuid` NOT NULL → `vendors` | |
| `product_id` | `uuid` NOT NULL → `products` | |
| `store_id` | `uuid` NOT NULL → `stores` | |
| `total_units_sold` | `integer` NOT NULL default `0` | Sum of `order_items.quantity` on qualifying orders. |
| `total_revenue` | `numeric(14,2)` NOT NULL default `0` | Sum of line revenue per §6.2. |
| `last_sold_at` | `timestamptz` | `MAX(orders.created_at)` for qualifying lines. |
| `days_since_last_sale` | `integer` | `GREATEST(0, current_date - last_sold_at::date)` when sold; else `NULL`. |
| `is_dead_stock` | `boolean` NOT NULL default `false` | `true` when last sale exists, `last_sold_at < now() - interval '30 days'`, and `products.stock_qty > 0`. |
| `updated_at` | `timestamptz` NOT NULL default `now()` | |

**Uniqueness:** `UNIQUE (vendor_id, product_id, store_id)`.

**Zero-sales behavior (trigger path):** `private._recompute_vendor_product_stats` **deletes** the stats row when `total_units_sold = 0` after recompute (no “placeholder” row).

**RLS / grants:** Same pattern as customer stats (`vendor_product_stats_vendor_select` + possible `vendor_product_stats_select_own`; `SELECT` for `authenticated` + `service_role`).

**Maintenance note:** `public.refresh_vendor_product_dead_stock()` exists (`20260522143000`) to refresh `days_since_last_sale` / `is_dead_stock` without new orders (e.g. cron).

---

## 5. Tables: `public.orders`, `public.order_items`, `public.products`

### 5.1 `public.orders` (fields used by analytics)

| Field | Role |
|--------|--------|
| `id`, `created_at`, `vendor_id`, `store_id`, `user_id` | Identity, filtering, time series. |
| `status` | **CHECK** (`20260512180001_store_availability_order_cutoff.sql`): `'pending'`, `'confirmed'`, `'preparing'`, `'ready'`, `'completed'`, `'cancelled'`, `'new'`. Analytics qualifying value: **`completed`**. |
| `payment_status` | **CHECK** (`20260512180000` / `20260427150500`): `'pending'`, `'paid'`, `'failed'`, `'refunded'`. Analytics qualifying value: **`paid`**. |
| `total_price` | `numeric(10,2)` NOT NULL (legacy gross line). |
| `subtotal_amount` | `numeric(12,2)` nullable (`20260511133000`); backfill sets from `total_price` when added. |
| `discount_amount` | `numeric(12,2)` NOT NULL default `0`. |
| `payable_amount` | `numeric(12,2)` nullable; backfill `COALESCE(payable_amount, total_price)` on add (`20260511133000`). **Vendor net** after discounts for settled orders. |

### 5.2 `public.order_items`

**Contract used in recomputes and RPCs:**

- `order_id`, `product_id`, `quantity`
- `unit_price`, `total_price` — added as `numeric(12,2)` in `20260512140000` / `...8001` (with migration from legacy `price` if present). Some dumps show `double precision`; treat **migration** as target DDL for new environments.
- `special_instructions` — `text`, optional.

**Line revenue in `private._recompute_vendor_product_stats`:**

`COALESCE(oi.total_price::numeric, oi.quantity::numeric * COALESCE(oi.unit_price::numeric, 0))`

### 5.3 `public.products` (fields touched by analytics)

| Field | Role |
|--------|--------|
| `id`, `name` | Joins; RPC order line display uses `name`. |
| `category` | `text` — used for `most_purchased_category` in customer stats recompute. |
| `category_id` | `uuid` → `product_categories` — used in **`get_vendor_customer_detail`** for `affinity_category` (see §7.2), not in trigger category snapshot. |
| `stock_qty` | `integer` — dead-stock signal in product stats. |
| `vendor_id`, `store_id` | Catalog ownership (broader app; stats key is order path). |
| `status` | Product lifecycle **CHECK** (`20250705172520_autumn_flame.sql`): `'pending_review'`, `'approved'`, `'rejected'`, `'inactive'`. |

---

## 6. Money semantics (source of truth)

### 6.1 Order-level “customer spend” (rollup **and** detail RPC)

**Rollup writer:** `private._recompute_vendor_customer_stats` (`20260522143000`, amended `20260526120000`).

**Per qualifying order**, both **`vendor_customer_stats.total_spent`** (sum over the customer’s qualifying orders) and **`get_vendor_customer_detail`** per-order **`total`** / monthly sums use:

```sql
COALESCE(o.payable_amount, o.total_price::numeric, o.subtotal_amount::numeric, 0)
```

**Fallback policy:** prefer **`payable_amount`**, then **`total_price`**, then **`subtotal_amount`**, then **0**. **`average_order_value`** remains `ROUND(total_spent / total_orders, 2)` on the rollup row.

**Historical note:** Before `20260526120000`, the trigger summed **`COALESCE(o.payable_amount::numeric, 0)`** only, so list **`total_spent`** could diverge from detail order lines when **`payable_amount`** was null but gross columns were set.

### 6.2 Product revenue in **`vendor_product_stats.total_revenue`**

**Writer:** `private._recompute_vendor_product_stats`.

Uses **line** totals (see §5.2), not `orders.payable_amount`.

### 6.3 `get_vendor_customer_detail` JSON (`20260525103000`)

Order object **`total`** and **`monthly_spend`** use the same per-order expression as §6.1 (no separate money definition).

### 6.4 Cross-reference: `order_revenue_facts` view

**Source:** `20260515100000` defines the view; **`20260529120000_order_revenue_facts_gross_and_ledger_columns.sql`** updates gross / cut semantics and adds ledger columns.

- **`gross_amount`:** `COALESCE(subtotal_amount, total_price, 0)` — **pre-discount / list side first**, then customer-total fallback. (Legacy `20260515100000` used `total_price` first, which hid discounts whenever `total_price` was already post-discount.)
- **`vendor_gross`:** `COALESCE(payable_amount, 0)` — amount the customer pays (card total).
- **`utap_cut_amount` / `utap_net` (signed):** `gross_amount - vendor_gross` — the **order-level book vs paid spread** (promotions / list vs card). This is **not** the same number as **`vendor_earnings.platform_fee_amount`** (platform commission on subtotal, from `finance_settings`).
- **`ledger_platform_fee_amount`, `ledger_yoco_fee_amount`, `ledger_vendor_net_amount`:** optional slice from **`vendor_earnings`** where `status = 'available'` (same order). Use these for **commission / Yoco / vendor net** reconciliation; use **`utap_cut_amount`** for **discount / facts** dashboards.

That view is **not** the same as customer analytics spend; customer rollups follow §6.1.

---

## 7. RPC: `public.get_vendor_customer_stats_page`

**Signature:**  
`get_vendor_customer_stats_page(p_page int, p_page_size int, p_search text, p_tier text, p_sort text) RETURNS jsonb`

**Security:** `SECURITY DEFINER`, `search_path = public`, `auth.uid()` must be non-null and exist in `public.vendors`.

**Parameters:**

| Param | Default | Behavior |
|--------|---------|----------|
| `p_page` | `1` | Clamped ≥ 1. |
| `p_page_size` | `15` | Clamped 1–100. |
| `p_search` | `NULL` | Trims; if empty, ignored. Else `ILIKE` on `profiles.display_name` (joined from `student_id`). |
| `p_tier` | `NULL` | If null/blank, ignored. Else case-insensitive match on `vendor_customer_stats.loyalty_tier`. |
| `p_sort` | `'last_active'` | Lowercased/trimmed. Sort key: `'spent'` or `'spend'` → `total_spent DESC`; `'orders'` → `total_orders DESC`; else → `last_purchase_date` epoch **DESC**. Tie-break: `student_id`, `store_id`. |

**Return JSON (JavaScript Object Notation) top-level:**

```json
{
  "rows": [ /* see below */ ],
  "total": "<bigint as number>"
}
```

**Each row object:**

- `student_id` (uuid)
- `store_id` (uuid)
- `display_name` — `COALESCE(profiles.display_name, 'Student')`
- `loyalty_tier`, `total_orders`, `total_spent`, `last_purchase_date`, `average_order_value` — from `vendor_customer_stats`

**Grants (`20260525103000`):** `EXECUTE` for `authenticated` and `service_role`; `REVOKE ALL` from `PUBLIC`.

---

## 8. RPC: `public.get_vendor_customer_detail`

**Signature:**  
`get_vendor_customer_detail(p_student_id uuid, p_store_id uuid DEFAULT NULL) RETURNS jsonb`

**Security:** Same vendor guard as page RPC.

**Filters:** `orders` / stats scoped to `vendor_id = auth.uid()`, `user_id = p_student_id`, and optionally `store_id = p_store_id` when `p_store_id` is not null.

**Return object (keys):**

| Key | Type | Meaning |
|-----|------|---------|
| `orders` | `jsonb` array | Qualifying orders only (`paid` + `completed`). Each: `id`, `created_at`, `store_id`, `status`, `payment_status`, `total` (§6.1), `items` (array of `{ name, quantity, line_total }` from `products.name` + `order_items.quantity` + `order_items.total_price`). Ordered by `created_at DESC`. |
| `monthly_spend` | `jsonb` array | Last ~6 calendar months from `date_trunc('month', now()) - interval '5 months'` through qualifying orders: `{ "month": "YYYY-MM", "spent": <numeric> }` using §6.1 sum per month. |
| `most_purchased_category` | text | From **first** `vendor_customer_stats` row matching vendor+student+(store), `ORDER BY last_purchase_date DESC NULLS LAST LIMIT 1`. |
| `most_purchased_product_id` | uuid | Same row. |
| `most_purchased_product_name` | text | `products.name` for `most_purchased_product_id` if set. |
| `average_order_value`, `total_orders`, `total_spent` | numeric / int | Same stats row as above. |
| `affinity_category` | text | Second category by **SUM(order_items.total_price)** among qualifying orders, category label `COALESCE(product_categories.name, products.category::text, 'Other')`, excluding the `most_purchased_category` value. |

**Grants:** Same as page RPC.

---

## 9. Private functions (not callable by app clients)

| Name | Purpose |
|------|---------|
| `private._loyalty_tier_from_orders(integer)` | Tier thresholds (§3). |
| `private._recompute_vendor_customer_stats(uuid, uuid, uuid)` | Rebuild one customer stats cell from `orders` (per-order spend §6.1; body replaced in `20260526120000`). |
| `private._recompute_vendor_product_stats(uuid, uuid, uuid)` | Rebuild one product stats cell from `order_items` + `orders`. |
| `private._orders_stats_trigger()` | Trigger function on `public.orders`. |

All are `SECURITY DEFINER` with `search_path = public`; privileges `REVOKE ALL FROM PUBLIC` on these helpers (`20260522143000`).

---

## 10. Consistency notes for app developers

1. **List vs detail money:** **`total_spent`** on the stats row and per-order **`total`** / monthly sums in **`get_vendor_customer_detail`** both follow **§6.1** (single formula). Any mismatch after **`20260526120000`** is a bug, not an intentional contract split. (Pre-**`20260526120000`**, rollup used payable-only; see §6.1 historical note.)
2. **Per-store rows:** After `20260525103000`, the list RPC is **explicitly per `(student_id, store_id)`**; do not assume one row per student across stores.
3. **Category labels:** Rollup `most_purchased_category` uses **`products.category` text**; affinity uses **`product_categories.name` first** when present.

---

## 11. File reference index

- `utap-admin/supabase/migrations/20260522143000_vendor_customer_product_stats.sql` — stats tables, recompute, trigger, grants, original RPCs (superseded for list/detail JSON shape).
- `utap-admin/supabase/migrations/20260523120000_vendor_customer_product_stats.sql` — alternate recompute + duplicate trigger (dropped later); policy name variants.
- `utap-admin/supabase/migrations/20260525103000_consolidate_vendor_customer_stats.sql` — **canonical** `get_vendor_customer_stats_page` / `get_vendor_customer_detail`.
- `utap-admin/supabase/migrations/20260525130000_vendor_analytics_promotions_contract_fix.sql` — finance / `vendor_earnings` / `record_order_earning`; does not change customer stats RPCs.
- `utap-admin/supabase/migrations/20260526120000_vendor_customer_stats_total_spent_align.sql` — **`total_spent`** rollup = detail per-order amount (§6.1); targeted post-migrate recompute.
- `utap-admin/supabase/migrations/20260512180001_store_availability_order_cutoff.sql` — `orders.status` CHECK; `order_items` money columns.
- `utap-admin/supabase/migrations/20260511133000_promotions_vouchers_discounts.sql` — `payable_amount`, `subtotal_amount`, `discount_amount` on `orders`.
- `utap-admin/supabase/migrations/20260529120000_order_revenue_facts_gross_and_ledger_columns.sql` — `order_revenue_facts`: gross prefers `subtotal_amount`; optional `ledger_*` from `vendor_earnings`.
