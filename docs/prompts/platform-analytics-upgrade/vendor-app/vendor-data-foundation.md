# Prompt 1 of 3 — Vendor: Data Foundation (DB tables, backfill & triggers)
> Run this first. Prompts 2 and 3 depend on it.

---

We need to add a smart analytics data layer to the utap-vendors app. Right now, customer and product stats are being computed by querying the orders table directly — this is expensive and won't scale.

Here is what I need you to build:

1. VENDOR CUSTOMER STATS TABLE
Create a new Supabase migration that adds a `vendor_customer_stats` table with these columns:
- id, vendor_id, student_id, store_id
- total_orders (integer)
- total_spent (numeric, in ZAR)
- average_order_value (numeric)
- first_purchase_date (timestamp)
- last_purchase_date (timestamp)
- most_purchased_product_id (uuid, nullable)
- most_purchased_category (text, nullable)
- loyalty_tier (text) — compute as: "New" (1 order), "Regular" (2–5 orders), "Loyal" (6–15 orders), "VIP" (16+ orders)
- updated_at (timestamp)

Apply Row Level Security so vendors can only read rows where vendor_id matches their own profile.

2. BACKFILL SCRIPT
Write a one-time SQL migration script that populates `vendor_customer_stats` by iterating through all existing completed orders, grouped by vendor_id + student_id + store_id. Calculate all columns from historical order data.

3. LIVE SYNC TRIGGER
Create a PostgreSQL trigger function that fires AFTER INSERT OR UPDATE on the orders table. When an order's status changes to "completed", it should upsert the relevant row in `vendor_customer_stats`, incrementing totals and recalculating loyalty_tier. Keep this efficient — only update the specific vendor-student-store combination affected.

4. PRODUCT PERFORMANCE TABLE
Create a second table called `vendor_product_stats` with:
- id, vendor_id, product_id, store_id
- total_units_sold (integer)
- total_revenue (numeric)
- last_sold_at (timestamp)
- days_since_last_sale (integer, computed or updated by trigger)
- is_dead_stock (boolean) — true if no sales in last 30 days but stock > 0
- updated_at (timestamp)

Apply the same trigger pattern to keep this in sync on completed orders.

Be proactive: if you see a better or more idiomatic way to structure this in Supabase/PostgreSQL, implement it and leave a short comment explaining why. Use best practices for index creation on vendor_id, student_id, and store_id foreign keys.
