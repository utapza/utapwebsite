# Prompt 3 of 3 — Student App: Ushop & uGig Discovery (trending, popular, cheapest & smart recommendations)
> Run after Prompt 2 is working. Enhances existing Ushop and uGig tabs.

---

Enhance the Ushop and uGig tabs in the utap-apps React Native app with campus-aware discovery features powered by the views created in the DB migration. The goal is to stimulate buying habits through social proof, smart recommendations, and price awareness — all scoped to the student's own campus.

1. USHOP TAB — DISCOVERY SECTIONS
Add the following horizontal scroll sections to the top of the Ushop tab, above the existing store list. Each section is a labelled row with a header and "See all" link. Keep them compact — store cards should be the same style as existing store cards in the app.

"🔥 Trending on Campus" — from `trending_stores_by_campus` view, filtered to the student's university_id. Show top 5 stores. Add a small "X orders today" or "X orders this week" caption on each card using order_count_7d.

"⭐ Most Popular" — from `popular_stores_by_campus`. Show top 5 stores. Caption: "X students buying here".

"💸 Best Value" — from `cheapest_stores_by_category`. Show the cheapest store per category as a horizontal chip-style list. Tapping a chip filters the main store list below to that category and highlights the cheapest option.

"🛍 Your Favourites" — from the student's own `student_gamification.favourite_store_id` and top 2–3 stores derived from their order history. Show as a compact row. If the student has fewer than 3 orders, show a "Start ordering to unlock your favourites" placeholder instead.

These 4 sections sit above the existing store list. The existing search bar, category filter, and campus filter must remain fully functional and unchanged — these sections are additive only.

2. USHOP STORE DETAIL — SOCIAL PROOF LAYER
On the existing store detail screen, add two small enhancements:
- Below the store name/header: a social proof line — "📍 47 students from your campus ordered here this month" — pull from a simple count query on orders filtered by university_id + store_id + current month
- On each product card: if the product is in `top_products_campus_wide` for this university, show a small "🔥 Popular" badge on the product card — no other changes to the product card layout

3. UGIG TAB — DISCOVERY SECTIONS
Apply the same "Trending on Campus" and "Most Popular" sections to the uGig tab, filtered to sports/events category stores only. Use the same view data, just filter by store category. Keep it lightweight — uGig already has a focused sports identity, so 2 sections max here.

4. SMART REORDER SHORTCUT
On the Ushop tab, just below the discovery sections and above the main store list, add a "Order again?" compact banner:
- Shows the student's most recently ordered product + store name
- A single "Reorder" button that deep-links directly to that product on that store's menu
- Only show this banner if the student has at least 1 past completed order
- Dismiss button (X) that hides it for the current session (use component state — no persistence needed)

5. PRICE LEADERBOARD SCREEN
Add a "Price Leaderboard" screen accessible from the "Best Value" section's "See all" button:
- A full screen showing common item categories with the cheapest store for each at this campus
- Data from `cheapest_stores_by_category` view
- Simple flat list: category name, store name, avg order value (ZAR), "Shop" button
- Header: "Best value stores at [University Name]"
- This is a stack screen — register it in the existing React Navigation stack, accessible from Ushop only

6. BUDGET TRACKER (lightweight, non-intrusive)
Add a small budget awareness widget to the Ushop tab, below the discovery sections:
- A single line with a subtle progress-bar style: "Monthly spend: R280 / —"
- If the student's monthly_spend exceeds last_month_spend, show: "Spending more than last month 📈"
- If under, show: "Spending less than last month 📉 Nice work"
- Keep it to 1–2 lines max — this is not a full budgeting tool, just an awareness nudge
- Pull data from student_gamification.monthly_spend and last_month_spend

Be proactive: the discovery sections will cause the Ushop tab to be taller — ensure the sections use a FlatList or SectionList pattern so the whole tab scrolls naturally without nested scroll conflicts, which is a common React Native pitfall. Follow existing scroll patterns in the Ushop tab. If the existing tab already uses a FlatList for the store list, convert the discovery sections into ListHeaderComponent to avoid nesting. Flag any scroll architecture decisions with a brief inline comment.
