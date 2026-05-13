# Prompt 2 of 3 — Vendor: Customers Page (paginated table + drill-down)
> Run after Prompt 1 is complete and merged.

---

We need to rebuild the Customers page in the vendor dashboard (utap-vendors) using the new `vendor_customer_stats` table created in the previous migration.

Here is what I need:

1. PAGINATED CUSTOMERS TABLE
Build a paginated table (15 rows per page) on the Customers page. Use server-side pagination — pass `page` and `pageSize` to a Supabase RPC or query, never pull the full list to the frontend.

Columns to show in the table:
- Student name (from student/profile join)
- Loyalty tier (badge with colour coding: New = gray, Regular = blue, Loyal = amber, VIP = green)
- Total orders
- Total spent (ZAR, formatted as R 1,234.00)
- Last active date (relative: "3 days ago", "2 weeks ago")
- Action: "View" button

The table must only show customers who have purchased from the currently authenticated vendor's stores — enforce this at the query level using vendor_id, not just in the UI.

2. SHALLOW → DEEP PATTERN
When the vendor clicks "View" on a customer row, open a side panel or modal (your choice — pick whichever is more natural in the existing codebase). This triggers a secondary fetch for that specific student_id + vendor_id combination, loading:
- Full order history for this vendor (date, store, items, total, status)
- Most purchased product name
- Most purchased category
- Average order value
- Spending trend: a small sparkline or bar chart showing monthly spend for the last 6 months (use recharts — it is already in the project)
- Basket affinity hint: "Also frequently bought: [category]" if available

Only fetch this detail data on demand — not on page load.

3. TABLE FEATURES
- Search bar to filter by student name (debounced, 300ms)
- Filter dropdown: loyalty tier (All / New / Regular / Loyal / VIP)
- Sort options: Total spent (desc), Last active (desc), Total orders (desc)
- Empty state with a helpful message if the vendor has no customer data yet
- Loading skeletons while data fetches

4. STATE MANAGEMENT
Use TanStack Query (React Query) for all data fetching. Use a "selected customer" state for the detail panel. Keep pagination state in URL query params so refreshing the page returns to the same page.

Be proactive: if there are existing patterns in the codebase for tables, modals, or side panels — reuse them for consistency. If recharts is already used on the dashboard overview, follow the same chart setup pattern.
