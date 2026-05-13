# Vendor and admin dashboards — visualization and UX plan

**Status:** Research and proposal only (no implementation in this pass).  
**Repos:** `utap-vendors` (vendor web app), `utap-admin` (operations console), shared Supabase (PostgreSQL database).  
**Research inputs:** ThoughtSpot dashboard design guide ([Dashboard design: examples and best practices](https://www.thoughtspot.com/data-trends/dashboard-design-examples-best-practices)), WC Vendors marketplace feature list ([Vendor dashboard top features](https://www.wcvendors.com/vendor-dashboard-top-features/)), plus Exa supplementary results on KPI (Key Performance Indicator) layout and e-commerce dashboard grouping.

---

## 1. What we are aiming for

We want richer **data visualization** and **UX (User Experience)** on top of what already works: same routes, same Supabase access patterns, same business rules. The goal is clearer decisions for vendors (day-to-day operations) and admins (ecosystem health), without replacing core flows.

---

## 2. External guides — what we actually take from them

### 2.1 ThoughtSpot (design discipline)

| Principle | What it means for UTap | Why we care |
|-----------|------------------------|-------------|
| Audience-first | Vendor home = operational (orders, revenue, alerts). Admin home = tactical + light analytical (growth, concentration risk). | Stops one generic “dashboard” from serving nobody well. |
| Dashboard “types” | Vendor skews **operational** (real-time to daily). Admin skews **tactical / analytical** (weekly slices, comparisons, breakdowns). | Matches how ThoughtSpot separates operational vs executive views. |
| 5–7 KPIs (Key Performance Indicators) per view | Keep primary scorecard small; push detail behind tabs, filters, or drill-down. | ThoughtSpot’s FAQ explicitly warns against metric overload. |
| Visual hierarchy | Top: KPIs + alerts; middle: main charts; bottom: tables and secondary metrics; filters in sidebar or toolbar. | Aligns with their grid and “above the fold” guidance. |
| Rule of ~6 visuals per group | Use **tabs or sections** (e.g. Overview | Orders | Revenue | Catalog) instead of one endless scroll of charts. | Maps to their “groups and tabs” pattern without needing their product. |
| Chart choice | Trends over time → line or area. Category comparison → bar. Part-of-whole → limited pie/donut or stacked bar when counts are small. | We already use Recharts (React charting library) well on admin; vendor side can catch up without new chart philosophy. |
| Performance | Progressive loading, skeletons, avoid loading entire tables when only aggregates are needed. | Admin `fetchDashboardAnalytics` already pulls **all** orders for some aggregations — called out below as a scaling risk. |
| Interactivity | Date range, status filters, segment toggles, export where safe. | ThoughtSpot stresses filters and exploration; we can implement incrementally with Supabase queries. |

### 2.2 WC Vendors (marketplace vendor needs)

Their checklist is WooCommerce-centric but maps cleanly to UTap:

| WC Vendors theme | UTap today | Build-on direction |
|------------------|------------|----------------------|
| Product management | `ProductsPage` — search/filter client-side; loads all products. | Add **server-side** pagination and optional table view for large catalogs; keep card grid as default. |
| Order management | `OrdersPage` — **already** uses `.range()` pagination and status filters. | Extend with date range, CSV export, saved filter presets; unify KPI strip with dashboard. |
| Sales reports and analytics | `AnalyticsPage` + charts; dashboard overview is month-only. | Align revenue definition with admin (`payable_amount`, `payment_status`) where applicable; add weekly / custom range on overview. |
| Inventory | Product `stock` / flags (confirm schema in app). | Low-stock alerts on dashboard and analytics; optional email later. |
| Payments and payouts | `EarningsPage`, Netlify payout functions. | Dashboard strip: pending payout, last payout date (read-only aggregates). |
| Shipping / fulfillment | Campus pickup context (not generic shipping). | Copy and IA (Information Architecture): “Pickup / fulfillment” wording instead of generic shipping. |
| Communication | Limited in-repo. | “Recent activity” should be **data-backed** (last N orders, status changes) or removed; placeholder rows hurt trust (see gap analysis). |
| Mobile / responsive | Both apps use responsive Tailwind patterns. | Touch targets on pagination; chart height on small screens. |
| Security / support | Auth exists; support links can be docs URLs. | In-dashboard help panel linking to `utap-docs` / Fibery onboarding. |

---

## 3. Current implementation — short audit

### 3.1 Vendor (`utap-vendors`)

| Area | File(s) | What works | Gap |
|------|---------|------------|-----|
| Overview | `DashboardOverview.tsx` | Four KPI cards, month-over-month %, welcome banner, quick actions. | Loads **all** orders for vendor then filters in JS (scales poorly). “Recent activity” is **static placeholder** text, not real events. No charts on home. |
| Orders | `OrdersPage.tsx` | Supabase pagination (`range`), status tabs, counts. | Good baseline; could add date filter and export. |
| Products | `ProductsPage.tsx` | Search/category/status filters. | All products loaded; filtering is client-only. |
| Analytics | `AnalyticsPage.tsx`, `SalesChart.tsx`, `TopProducts.tsx` | Time range toggle, charts. | Fetches `orders` with `select('*')` for window; verify join shape vs dashboard (consistency). |

### 3.2 Admin (`utap-admin`)

| Area | File(s) | What works | Gap |
|------|---------|------------|-----|
| Dashboard | `pages/Dashboard.tsx`, `lib/analytics.ts` | KPI cards with trends, 14-day line chart, university bar chart, top vendors, refresh, empty states. | `fetchDashboardAnalytics` loads **full** `orders` row set for aggregations — OK for early stage, risky as order volume grows. Pagination component exists in UI kit but **list pages** (e.g. `Vendors.tsx`, `Products.tsx`) load full lists and filter in memory. |
| List CRUD | Multiple `pages/*.tsx` | Search filters on several pages. | No consistent pagination, sorting, or columnar “data grid” pattern. |

---

## 4. Choice logic (how we prioritize)

1. **Reuse before new services** — Both apps already use Supabase + React + Tailwind; admin already uses Recharts and shadcn-style UI primitives. Prefer query shaping, RPC (Remote Procedure Call), and UI composition over new analytics vendors.
2. **Operational truth for vendors** — WC Vendors emphasizes orders, money, and catalog. ThoughtSpot emphasizes a small KPI layer + drill-down. Combined: **tight vendor home**, deep detail in Orders / Analytics / Earnings.
3. **Admin = ecosystem + risk** — ThoughtSpot’s e-commerce article recommends grouping by theme (revenue, operations, customer experience). For UTap: **Revenue & orders**, **Supply (vendors / stores / catalog)**, **Campus / university concentration**, **Students / engagement** (as data exists).
4. **Performance is a feature** — Any change that removes “load everything” is higher leverage than adding a fifth chart. Pagination and server-side filters belong in the same program of work as “better visualization.”
5. **No regressions** — Extend UI with additive routes or sections; keep existing navigation IDs and Supabase RLS (Row Level Security) assumptions intact.

---

## 5. Proposed workstreams (build on top, do not rip out)

### A. Vendor dashboard (`utap-vendors`)

| # | Initiative | Outcome | Notes |
|---|------------|---------|-------|
| A1 | **Real metrics on home** | Replace placeholder “Recent activity” with last N real events from `orders` (and optionally `order` status updates if tracked), or remove until real. | Trust + WC “order management” alignment. |
| A2 | **Charts on overview** | One line or bar spark for last 7 or 14 days revenue/orders per vendor (reuse patterns from `SalesChart`). | ThoughtSpot “above the fold” + trend context. |
| A3 | **Query efficiency** | Replace “fetch all orders” on overview with aggregated queries: e.g. `count`, `sum` with date filters, or a Supabase RPC that returns monthly rollups. | Scales without new product. |
| A4 | **Products pagination** | Mirror orders: `.range()` + total count; optional compact table view toggle. | WC product management at scale. |
| A5 | **Cross-page consistency** | Same currency and revenue rules as admin where business logic should match (`payable_amount`, paid statuses). | Single source of truth for “revenue.” |

### B. Admin dashboard and lists (`utap-admin`)

| # | Initiative | Outcome | Notes |
|---|------------|---------|-------|
| B1 | **Analytics query refactor** | Phase 1: server-side aggregation (SQL view or RPC) for totals, daily series, university and vendor breakdowns. Phase 2: optional materialized refresh for heavy installs. | Fixes core scaling bottleneck. |
| B2 | **Dashboard IA** | Tabs: `Overview` | `Operations` | `Marketplace` (names flexible) with ThoughtSpot-style grouping; each tab stays under “rule of 6” visuals. | Reduces scroll fatigue. |
| B3 | **List UX** | Add pagination + sort to `Vendors`, `Products`, `Stores`, and other long lists using existing `components/ui/pagination.tsx`. | UI kit already exists; wire to `database.ts` with limit/offset or keyset. |
| B4 | **Exports** | CSV export for admin lists (vendors, orders if exposed) gated by admin role. | ThoughtSpot “export for presentations”; keep PII (Personally Identifiable Information) in mind. |
| B5 | **Empty and error states** | Already decent on dashboard; extend pattern to all list pages. | UX consistency. |

### C. Cross-app and documentation

| # | Initiative | Outcome |
|---|------------|---------|
| C1 | **Glossary in docs** | Short doc: definition of revenue, order statuses, and dashboard KPIs shared across vendor, admin, and mobile. |
| C2 | **Fibery / onboarding** | One-pager for “what each KPI means” linked from both dashboards (WC vendor support + resources pattern). |

---

## 6. Database and Supabase — optional proposals (for a later implementation pass)

**None of these are applied in this research task.** They are candidates if query cost in production proves high.

| Option | Purpose | Tradeoff |
|--------|---------|----------|
| **SQL view** `admin_order_facts` | Normalized columns for revenue eligibility, university id, amounts. | Simplifies RPC; still live queries. |
| **RPC** `get_vendor_dashboard_stats(vendor_id, from, to)` | Returns JSON aggregates in one round-trip. | Less client logic; must secure with `SECURITY DEFINER` carefully or use RLS-safe patterns. |
| **Materialized view** + nightly or hourly `REFRESH` | Pre-aggregated daily revenue/order counts per vendor/university. | Faster admin home; slight staleness; more ops complexity. |
| **`vendor_notifications` or `activity_events` table** | Durable activity feed if you need more than orders (e.g. product approved, payout sent). | True WC-style comms hub; requires write paths from Netlify functions or triggers. |

Prefer **views/RPC first**; add materialized views only when measured need appears.

---

## 7. Suggested sequencing (phased)

**Phase 1 — Trust and truth (low UI risk)**  
- A1 real activity or removal  
- A3 + B1 query efficiency for dashboards  
- Revenue definition alignment (A5)

**Phase 2 — Visualization and IA**  
- A2 vendor home charts  
- B2 admin tabs / grouping  
- B3 pagination on highest-traffic admin lists

**Phase 3 — Power features**  
- Exports, advanced filters, optional materialized aggregates  
- Optional `activity_events` if product wants a true notification center

---

## 8. Validation checklist (when someone implements)

- [ ] Vendor with many orders: home and analytics still respond within an agreed budget (e.g. &lt; 2s on 3G Fast).  
- [ ] Admin dashboard with large `orders` table: no full-table scan for routine home load.  
- [ ] RLS: vendors still see only their rows; admins use service role or elevated policies as designed today.  
- [ ] No removal of existing routes or core flows without explicit sign-off.  
- [ ] Keyboard and screen reader: pagination controls and tabs usable.

---

## 9. Open questions (need product call)

1. **Single “revenue” definition** for vendor vs admin vs mobile — confirm payable vs gross and which order statuses count.  
2. **Activity feed scope** — orders only vs include product moderation, payouts, and support tickets.  
3. **Export policy** — which columns are allowed off-platform for GDPR (General Data Protection Regulation) / POPIA-style compliance in South Africa context.

---

## 10. Sources

- ThoughtSpot — [Dashboard design: examples and best practices](https://www.thoughtspot.com/data-trends/dashboard-design-examples-best-practices) (audience, KPI count, layout, chart selection, performance, tabs/groups).  
- ThoughtSpot — [E-commerce dashboard: examples and best practices](https://www.thoughtspot.com/data-trends/dashboard/ecommerce-dashboard) (KPI grouping by theme, interactivity, quarterly review habit).  
- WC Vendors — [Vendor dashboard top features](https://www.wcvendors.com/vendor-dashboard-top-features/) (product, order, analytics, inventory, payments, communication, responsive UI).  
- Internal references: `utap-vendors/src/components/dashboard/DashboardOverview.tsx`, `.../orders/OrdersPage.tsx`, `.../products/ProductsPage.tsx`, `utap-admin/src/lib/analytics.ts`, `utap-admin/src/pages/Dashboard.tsx`, `utap-admin/src/pages/Vendors.tsx`, `utap-admin/src/pages/Products.tsx`.

---

*Prepared as architecture and product input; implementation and migrations belong to a separate engineering pass after sign-off on open questions.*
