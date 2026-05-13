# Prompt 2 of 4 — Admin: Student Profiles Page (master table + full deep-dive modal)
> Run after Prompt 1 is merged.

---

Rebuild the admin/student-profiles page in utap-admin using the new `student_analytics` table. This is a master-detail pattern: a fast paginated table at the top level, full analytics loaded only on demand.

1. MASTER TABLE (paginated, 15 rows)
Server-side pagination via Supabase RPC. Columns:
- Avatar initials circle + student name
- University + faculty
- RFM segment badge (colour-coded: Champions = green, Loyal = blue, At Risk = amber, Dormant = gray, New = teal, Lost = red)
- Total spent (ZAR)
- Last active (relative time)
- Flight risk indicator (⚠ icon if is_flight_risk = true)
- "View" button

Table controls:
- Search by name or student number (debounced 300ms)
- Filter by: university, RFM segment, flight risk (toggle)
- Sort by: total spent, last active, total orders
- Pagination state stored in URL query params

2. DEEP-DIVE MODAL / SIDE PANEL (on "View" click)
Fetch a rich JSON object for that student_id on demand. Display:

HEADER SECTION
- Name, avatar, university, faculty, student number, email, phone
- RFM segment badge + scores breakdown (Recency: 4/5, Frequency: 3/5, Monetary: 5/5 — show as small score pills)
- Flight risk banner if applicable: "This student hasn't purchased in X days"

SPENDING OVERVIEW (metric cards row)
- Total spent (all vendors), Total orders, Average order value, Favourite category

SPENDING TREND CHART
- Recharts bar chart: monthly spend for last 6 months across all vendors
- Keep consistent with the chart style used elsewhere in the admin app

CATEGORY BREAKDOWN
- Recharts pie or donut chart: % of spend by category (e.g. Food 60%, Stationery 25%, Other 15%)
- Show as both chart + a small legend table with ZAR amounts

TOP VENDORS
- List of top 3 vendors this student uses most, with order count and total spent per vendor

ORDER HISTORY
- Paginated list (10 per page) of all orders: date, store name, items summary, total, status badge
- Show inside the modal with its own mini-pagination — do not load all orders at once

PEAK SPENDING TIMES
- Small recharts bar chart: orders by hour of day (0–23h) — helps admin understand student behaviour patterns

3. PERFORMANCE
All detail data fetched on modal open only. Use TanStack Query with the student_id as the query key. Show loading skeletons inside the modal while fetching. Cache the result so reopening the same student doesn't refetch.

Be proactive: reuse existing modal, badge, and card components from the codebase. Follow existing Radix UI patterns already in the project for the modal/dialog. If recharts is already configured on the admin dashboard, follow the same setup.
