**Context (paste full uTap AI context + architecture docs first)**

---

**Task: Database Cleanup + Realistic 240-Order Seed Data Generation**

**Goal**  
Completely wipe all transactional and derived stats data, then generate **healthy, realistic seed data** focused on **two specific students** creating **240 successful orders** at university `1f1d1067-2156-43be-871b-a830f9714c74`.

**Students to use:**
- `272c9d2d-2817-4713-a6fb-be77758c8faf` — Ayabonga Qwabi (abqwabi@gmail.com)
- `b21e15e0-f7cc-4107-9ba9-0701a6c115bf` — Sango Qwabi (qwabi@gmail.com)

**Requirements**
- Each student must end up with **> 80 orders** (e.g. 120 each).
- Orders must come from **existing stores/products** belonging to vendors at the above university (any campus that has stores).
- Simulate **realistic order patterns** (different quantities, times of day, occasional promos, mix of order sizes).
- Spread the 240 orders across time:
  - ~40% in last 7 days
  - ~25% in days 8–14
  - ~20% in days 15–30
  - ~15% older (30–90 days ago)
- All orders should be **successful paid orders** (Yoco-style webhook confirmed).

---

**Step 1 — Full Discovery of Order + Payment Flow**

Before writing any script, map **exactly** what happens when a student places an order:

1. In `utap-apps`: What code runs when user clicks **"Order & Pay"**? (Which service? Which RPC?)
2. Which Supabase RPC is called (`create_order_with_items` or similar)? What parameters does it take? What does it insert?
3. What tables are created/updated on order creation (`orders`, `order_items`, etc.)?
4. What does `create-yoco-checkout` Netlify function do?
5. What does the **Yoco webhook** do on success? Which tables/fields/statuses are updated? Does it create `payments`, `order_revenue_facts`, tickets, etc.?
6. Are there triggers, functions, or side effects that populate stats tables?

**List every table touched** during a full successful paid order lifecycle.

Also inspect these stats tables and note how they are populated:
- `cheapest_stores_by_category`
- `platform_kpi_snapshot`
- `platform_order_settings`
- `promotion_effectiveness_snapshot`
- `promotion_redemptions`
- `refund_attempts`
- `student_analytics`
- `student_badge_awards`
- `student_gamification`
- `top_products_campus_wide`
- `trending_stores_by_campus`
- `vendor_finance_balances`
- `vendor_performance_stats`
- `vendor_product_stats`
- `vendor_customer_stats`

---

**Step 2 — Aggressive but Safe Cleanup**

Create a **single SQL script** that:
- Deletes **all** records from transactional tables (`orders`, `order_items`, `payments`, etc.).
- Deletes **all** records from the stats/snapshot tables listed above.
- Preserves core entities: `vendors`, `stores`, `products`, `profiles` (especially the two students), `universities`, `campuses`, `admins`, categories, etc.
- Handles foreign key order correctly.
- Prints row counts before/after for verification.
- Runs inside a transaction with rollback option for safety.

---

**Step 3 — Realistic Seeding (240 Orders)**

Create a **seeding script** (SQL + optional TS helper) that:

- Finds existing stores/products for university `1f1d1067-2156-43be-871b-a830f9714c74`.
- For each of the two students, creates realistic orders by either:
  - Calling the real `create_order_with_items` RPC (preferred), **or**
  - Manually inserting with the exact same structure the real flow uses.
- Then simulates successful payment by performing the same updates the Yoco webhook would do (status changes, payment records, revenue facts, etc.).
- Vary:
  - Quantities (1–5 items per order)
  - Order values
  - Creation dates across the requested time buckets
  - Occasional promo usage
- After seeding raw orders, **re-run any stats population logic** (triggers, functions, or manual refresh) so that `vendor_performance_stats`, `student_analytics`, `top_products_campus_wide`, etc. are correctly populated.

---

**Output Format (Analytics Improvement Agent Style)**

1. **Problem Summary**
2. **Discovery Summary** — Complete order + webhook data flow + affected tables
3. **Cleanup Script** — Full SQL
4. **Seeding Script** — Full SQL/TS with comments explaining each part
5. **Validation Strategy** — How to verify 240 orders, financials, and stats tables
6. **Risk Assessment & Safeguards**

---

**Priority**: Accuracy and realism first. The resulting dataset must make vendor dashboards, admin analytics, and financial reconciliation look healthy and consistent.

Start with **Step 1 — Discovery**. Inspect relevant RPCs (`create_order_with_items`, etc.), Netlify functions, webhook handler, and triggers. Then proceed to cleanup + seeding.