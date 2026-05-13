# Prompt 1 of 4 — Admin: Data Foundation (admin-scoped analytics tables & triggers)
> Run first. All other admin prompts depend on this.

---

We need a dedicated analytics data layer for the utap-admin app. The admin sees the whole ecosystem — all universities, all vendors, all students — so we cannot reuse the vendor-scoped tables from utap-vendors. We need admin-grade tables built for cross-platform aggregation.

1. STUDENT ANALYTICS TABLE
Create a migration adding a `student_analytics` table:
- id, student_id (uuid, FK to profiles/students)
- university_id, faculty (text, nullable)
- total_orders_all_vendors (integer)
- total_spent_all_vendors (numeric, ZAR)
- average_order_value (numeric)
- first_purchase_date, last_purchase_date (timestamp)
- days_since_last_purchase (integer — recomputed on each upsert)
- top_category (text, nullable) — category they spend most in
- top_vendor_id (uuid, nullable)
- rfm_recency_score (integer 1–5)
- rfm_frequency_score (integer 1–5)
- rfm_monetary_score (integer 1–5)
- rfm_segment (text) — computed label: "Champions", "Loyal", "At Risk", "Dormant", "New", "Lost"
- is_flight_risk (boolean) — true if days_since_last_purchase > 30 and had prior activity
- updated_at (timestamp)

RFM scoring rules to implement:
- Recency: 5 = purchased in last 7 days, 4 = 8–14 days, 3 = 15–30 days, 2 = 31–60 days, 1 = 60+ days
- Frequency: score 1–5 based on quintile of total_orders_all_vendors across all students
- Monetary: score 1–5 based on quintile of total_spent_all_vendors across all students
- Segment label: Champions (R≥4, F≥4, M≥4), Loyal (F≥4), At Risk (R≤2, was previously active), Dormant (R=1, F≤2), New (total_orders = 1), Lost (R=1, F=1, M=1), else "Regular"

2. VENDOR PERFORMANCE TABLE
Create a `vendor_performance_stats` table:
- id, vendor_id, university_id
- total_revenue (numeric), total_orders (integer)
- unique_customers (integer)
- repeat_customer_rate (numeric, %) — customers with 2+ orders / total customers
- average_order_value (numeric)
- refund_or_cancel_rate (numeric, %) — cancelled or refunded orders / total orders
- satisfaction_score (numeric, nullable — placeholder for future rating system)
- performance_quadrant (text) — "Star", "Underdog", "Warning", "Zombie" (see rules below)
- last_order_at (timestamp)
- updated_at (timestamp)

Quadrant rules:
- Star: total_revenue in top 50% AND repeat_customer_rate >= 40%
- Underdog: total_revenue in bottom 50% AND repeat_customer_rate >= 40%
- Warning: total_revenue in top 50% AND refund_or_cancel_rate >= 15%
- Zombie: total_revenue in bottom 50% AND repeat_customer_rate < 40%

3. BACKFILL SCRIPTS
Write one-time SQL migration scripts to populate both tables from existing completed orders data.

4. LIVE SYNC TRIGGERS
Create PostgreSQL trigger functions on the orders table (AFTER INSERT OR UPDATE) to upsert both tables when order status changes to "completed" or "cancelled". Recompute RFM scores and quadrant on each upsert for the affected student/vendor.

5. PLATFORM KPI VIEW
Create a Postgres VIEW called `platform_kpi_snapshot` that returns a single row with:
- total_students (count of distinct students with at least 1 order)
- total_vendors (count of distinct active vendors)
- total_revenue_platform (sum of all completed order totals)
- avg_order_value_platform
- flight_risk_count (students where is_flight_risk = true)
- dead_vendor_count (vendors where performance_quadrant = 'Zombie')
- orders_last_30_days

Apply RLS so only admin-role users can read these tables and the view. Be proactive with indexing on student_id, vendor_id, university_id, and rfm_segment.
