# Dashboard revenue (order facts + RPCs)

This note matches the migration in **utap-vendors** (`supabase/migrations/20260515100000_order_revenue_facts_and_dashboard_rpcs.sql`).

## What we measure

- **Gross (order)**: `COALESCE(total_amount, total_price, 0)` on the order row.
- **Vendor net**: signed `payable_amount` (paid adds, refunded nets out per row semantics in the view).
- **uTap (platform) net**: gross net minus vendor net for included rows.
- **Included rows**: revenue logic only counts orders that are **paid** and not pending/failed/cancelled in the way defined in the view (see SQL comments in the migration).

## View: `public.order_revenue_facts`

One row per order with signed `vendor_net`, `utap_net`, `gross_net`, plus store/university joins used for admin breakdowns.

## RPC (Remote Procedure Call): `get_vendor_dashboard_stats(p_date_from, p_date_to)`

- **Auth**: caller must be a row in `public.vendors` with `id = auth.uid()`.
- **Scope**: that vendor’s orders (by `vendor_id` or stores owned by the vendor).
- **Returns**: JSONB (JSON Binary) with `period`, `kpis`, `mom`, `daily_series`, `top_products`, `recent_activity`, `low_stock_products`, `finance_snapshot`, `product_count`.

## RPC: `get_platform_dashboard_stats(p_date_from, p_date_to)`

- **Auth**: `auth.uid()` must be an **active** row in `public.admin_users`.
- **Returns**: JSONB with `period`, `totals` (all-time vendor/student/order counts), `period_kpis`, `mom`, `daily_series`, `by_university`, `top_vendors`, `revenue_composition`.
- **Students total**: uses `public.students` only if that table exists (`to_regclass` guard).

## Clients

- **Vendor app**: `supabase.rpc('get_vendor_dashboard_stats', { p_date_from, p_date_to })` via `src/lib/vendorDashboard.ts`.
- **Admin app**: `supabase.rpc('get_platform_dashboard_stats', { p_date_from, p_date_to })` via `src/lib/analytics.ts`.

Apply the migration to your Supabase project before relying on these endpoints (`supabase db push` or run the SQL in the dashboard).
