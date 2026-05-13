# Prompt 3 of 4 — Admin: Vendors & Stores Oversight (performance quadrant + health dashboard)
> Run after Prompt 2 is working.

---

Enhance the admin/vendors and admin/stores pages in utap-admin using the `vendor_performance_stats` table. The goal is to give the platform operator a clear view of ecosystem health — which vendors are thriving, which need intervention.

1. VENDORS PAGE — PERFORMANCE OVERVIEW
At the top of the admin/vendors page, add a KPI summary row (reuse existing dashboard card component):
- Total active vendors
- Platform total revenue (from platform_kpi_snapshot view)
- Average repeat customer rate across all vendors
- Count of "Zombie" vendors (performance_quadrant = 'Zombie') — highlight in red if > 0

Below the KPIs, add a PERFORMANCE QUADRANT CHART:
- Use a Recharts ScatterChart with 4 labelled quadrants
- X-axis: repeat_customer_rate (0–100%)
- Y-axis: total_revenue (ZAR)
- Each dot = one vendor, coloured by quadrant (Star=green, Underdog=blue, Warning=amber, Zombie=gray)
- Hovering a dot shows vendor name + key stats in a tooltip
- Clicking a dot navigates to that vendor's detail page or opens a vendor summary panel

2. VENDORS TABLE ENHANCEMENTS
Add to the existing vendors table (do not replace it):
- Performance quadrant badge (Star / Underdog / Warning / Zombie) with colour coding
- Repeat customer rate (%)
- Total revenue (ZAR)
- Last order date (relative)

Add a filter: "Show only: All / Stars / Underdogs / Warnings / Zombies"

3. VENDOR DETAIL PAGE
When the admin views a vendor, add an Analytics section with:
- Revenue trend: Recharts line chart, monthly revenue for last 6 months
- Top 5 products by revenue for this vendor
- Customer retention rate over time (if derivable from order data)
- Recent order activity: last 10 orders with student name, store, total, status
- A "flag for review" action button — this can be a simple boolean field toggle on the vendor record for now (implement the UI + DB column, backend logic can come later)

4. STORES PAGE ENHANCEMENTS
On admin/stores, add two new columns to the existing table:
- Total orders (from vendor_product_stats or orders count)
- Status health: "Active" (orders in last 7 days), "Quiet" (8–30 days), "Inactive" (30+ days or no orders)

Add a filter for status health. Inactive stores should be visually de-emphasised (muted row style).

Be proactive: the ScatterChart quadrant is the most complex piece — if recharts ScatterChart requires significant custom work for the quadrant labels/regions, implement it cleanly and add brief inline comments. Prioritise the quadrant chart and the vendor table badges as the highest-value additions.
