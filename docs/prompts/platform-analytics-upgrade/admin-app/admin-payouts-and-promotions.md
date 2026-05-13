# Prompt 4 of 4 — Admin: Payouts & Promotions (financial intelligence layer)
> Run last — builds on vendor performance data from Prompt 3.

---

Enhance the admin/payouts and admin/promotions pages in utap-admin with financial intelligence and operational oversight features.

1. PAYOUTS PAGE — FINANCIAL INTELLIGENCE
At the top of admin/payouts, add a financial KPI row:
- Total pending payout amount (ZAR) across all vendors
- Total paid out this month
- Number of vendors with pending payout requests
- Largest single pending payout (vendor name + amount)

PAYOUT REQUESTS TABLE enhancements (add to existing table, do not replace):
- Vendor performance quadrant badge next to vendor name — gives admin immediate context (paying out a "Zombie" vendor is different from a "Star")
- Revenue trend indicator: a tiny sparkline (last 4 weeks) next to the payout amount — use recharts or a simple inline SVG bar if recharts sparkline is heavy
- Flag icon if vendor has a refund_or_cancel_rate >= 15% — tooltip explaining why it's flagged

BULK ACTIONS:
- Checkbox selection on payout rows
- "Approve selected" and "Export selected to CSV" bulk actions
- CSV export should include: vendor name, bank account (last 4 digits masked), amount, request date, performance quadrant

2. PAYOUTS ANALYTICS SECTION
Add a collapsible "Payout analytics" section below the table:
- Recharts bar chart: total payouts disbursed per month for the last 6 months
- Breakdown by university: which campus generates the most payout volume
- "Velocity of money" stat: average days between an order completing and a payout being requested for that vendor

3. PROMOTIONS PAGE — EFFECTIVENESS TRACKING
The admin/promotions page currently manages vouchers and app discounts. Add an effectiveness layer:

PROMOTIONS TABLE enhancements:
- Redemption count (how many times used)
- Total discount value given out (ZAR)
- Revenue influenced (total order value from orders where this promotion was applied)
- ROI indicator: if revenue_influenced > (total_discount_given * 3), show "High ROI" badge in green; if below 1x, show "Review" badge in amber
- Active/expired status with clear visual distinction

PROMOTION DETAIL (on click/view):
- Which stores it was redeemed at most
- Redemption trend: daily redemptions over the promotion's active window (simple recharts line chart)
- Student segment breakdown: what RFM segments redeemed this promo most (join with student_analytics) — helps admin understand if promos are reaching the right students

4. ADMIN DASHBOARD — PLATFORM KPI SNAPSHOT
On the main admin dashboard, add or enhance the overview section using the `platform_kpi_snapshot` view created in the DB migration:
- Surface all 7 KPIs from the view as metric cards
- Add a "Flight risk" alert card: "X students haven't purchased in 30+ days" with a link to the filtered student profiles page
- Add a "Zombie vendors" alert card: "X vendors have low sales and low retention" with a link to the filtered vendors page
- Range toggle (7 / 14 / 30 days) on the main revenue and orders charts — this already exists in the codebase, ensure the platform KPI cards respect the same range if applicable

Be proactive: the CSV export, bulk checkbox selection, and sparklines are the most effort-intensive pieces — implement them properly using existing patterns in the codebase. If a recharts sparkline is too heavy for inline use, a simple 4-bar inline SVG is acceptable. Prioritise the payout flags and promotion ROI badges as the highest-value additions.
