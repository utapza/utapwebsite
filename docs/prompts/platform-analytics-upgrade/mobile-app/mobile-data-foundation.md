# Prompt 1 of 3 — Student App: Data Foundation (gamification & discovery tables)
> Run first. Prompts 2 and 3 read from these tables.

---

We need a gamification and discovery data layer for the utap-apps React Native student app. All data lives in Supabase/PostgreSQL. The goal is to power a rich, personalised Profile tab with stats, badges, leaderboards, and campus discovery features.

1. STUDENT GAMIFICATION TABLE
Create a migration adding a `student_gamification` table:
- id, student_id (uuid, FK), university_id
- total_orders (integer), total_spent (numeric ZAR)
- current_streak_days (integer) — consecutive days with at least 1 order
- longest_streak_days (integer)
- last_order_date (date)
- favourite_store_id (uuid, nullable), favourite_store_name (text, nullable)
- favourite_product_id (uuid, nullable), favourite_product_name (text, nullable)
- favourite_category (text, nullable)
- total_savings_from_promotions (numeric ZAR) — sum of discount amounts applied to their orders
- campus_rank (integer, nullable) — rank by total_orders among students at same university
- campus_percentile (numeric) — e.g. 94.5 means "top 5.5% on campus"
- monthly_spend (numeric ZAR) — current calendar month
- last_month_spend (numeric ZAR)
- badge_ids (text[]) — array of earned badge slugs
- updated_at (timestamp)

2. BADGES DEFINITION TABLE
Create a `badges` table:
- id, slug (text, unique), name (text), description (text)
- icon_name (text) — maps to an icon in the app's icon set
- colour (text) — hex colour for the badge UI
- criteria_type (text) — e.g. "total_orders", "streak_days", "total_spent", "category_loyalty", "first_order"
- criteria_threshold (numeric) — the value that unlocks it

Seed this table with at least 15 badges:
- first_order: "First Bite" — place your first order
- orders_10: "Regular" — 10 total orders
- orders_50: "Campus Legend" — 50 orders
- orders_100: "uTap OG" — 100 orders
- streak_3: "On a Roll" — 3-day streak
- streak_7: "Week Warrior" — 7-day streak
- streak_30: "Unstoppable" — 30-day streak
- spent_500: "Big Spender" — R500 total spent
- spent_2000: "VIP" — R2000 total spent
- savings_100: "Deal Hunter" — saved R100 via promotions
- category_coffee: "Coffee Addict" — 10+ orders in coffee/drinks category
- category_food: "Foodie" — 20+ food orders
- new_store_3: "Explorer" — ordered from 3 different stores
- new_store_10: "Campus Connoisseur" — ordered from 10 different stores
- top_10_campus: "Campus Elite" — in top 10% on campus by total orders

3. CAMPUS DISCOVERY VIEWS
Create Postgres views (or materialised views if performance requires it) for:

`trending_stores_by_campus` — for each university_id, top 5 stores by order count in the last 7 days. Columns: university_id, store_id, store_name, order_count_7d, rank.

`popular_stores_by_campus` — top 5 stores by total unique customers per university. Columns: university_id, store_id, store_name, unique_customers, rank.

`cheapest_stores_by_category` — for each category + university combo, the store with the lowest average order value. Columns: university_id, category, store_id, store_name, avg_order_value.

`top_products_campus_wide` — top 10 products by order count in last 30 days per university. Columns: university_id, product_id, product_name, store_name, order_count_30d, rank.

4. LIVE SYNC TRIGGERS
Create trigger functions on the orders table (AFTER INSERT OR UPDATE) that fire when an order status becomes "completed":
- Upsert `student_gamification` for the student: increment totals, recalculate streak, update favourite store/product/category, recalculate monthly_spend
- Check badge criteria and append newly earned badge slugs to badge_ids if thresholds are crossed
- Recompute campus_rank and campus_percentile for the affected student (can be a periodic job if real-time is too expensive — flag this with a comment and implement whichever is more practical)

5. BACKFILL
Write a one-time migration script to populate `student_gamification` and award historical badges from existing completed orders data.

Apply RLS: students can only read their own row in student_gamification. The discovery views are readable by any authenticated student. Be proactive with indexing on student_id, university_id, and badge_ids (GIN index for the array column).
