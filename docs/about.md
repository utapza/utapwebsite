# uTap — Product Narrative (NMU Alpha Pivot)

*Last Updated: 2026-05-15*

## 1. What is uTap?
uTap is a campus-grade digital commerce and engagement layer for South African students. It puts daily campus utility — ordering food and finding events — into one seamless mobile wallet.

**Core Vision:** To simplify campus life by removing the friction of queues and the fragmentation of campus information.

---

## 2. Key Features (NMU Alpha)

### uShop (Campus Marketplace)
- **Problem:** Students waste hours in queues. Vendors lose margins to delivery apps.
- **Solution:** A pickup-first marketplace. Students order ahead and collect with a code.
- **Benefit:** "Skip the queue. Pay the menu price."
- **Vendor Benefit:** "Keep 100% of your earnings. No delivery commissions."

### uGig (Events & Ticketing)
- **Problem:** Campus events are fragmented across posters and WhatsApp groups. Physical tickets are easy to lose.
- **Solution:** A centralized discovery and booking feed for campus gigs, sports, and society events.
- **Benefit:** "Never miss a gig. Your tickets are always on your phone."
- **Promoter Benefit:** "Sell to verified students. Real-time attendance data."

---

## 3. Product Ecosystem

### Student App (utap-apps)
- **Framework:** Expo (React Native).
- **Primary Flows:**
  - **Ushop:** Browse stores, view menus, place orders via Yoco.
  - **uGig:** Discover campus events, book tickets, view digital PDFs.
  - **Orders:** Track pickup codes and ticket history.
  - **Profile:** Manage student identity and university affiliation.

### Vendor Web (utap-vendors)
- **Framework:** React + Vite + TypeScript.
- **Primary Flows:**
  - **Dashboard:** At-a-glance sales and order metrics.
  - **Order Manager:** Real-time fulfillment queue with pickup code verification.
  - **Store Setup:** Manage menus, hours, and operational status (e.g., "Pause for load-shedding").
  - **Earnings:** Transparency on balances and payout requests.

### Admin Console (utap-admin)
- **Framework:** React + Vite + TypeScript.
- **Primary Flows:**
  - **University Management:** Oversee campuses and vendor categories.
  - **Analytics:** Cross-platform trends on spending and event attendance.
  - **Governance:** Manage feature policies (enabling/disabling features per campus).

---

## 4. Technical Stack
- **Frontend:** React Native (Apps), React (Web).
- **Backend:** Supabase (PostgreSQL, Auth, Realtime, RLS).
- **Payments:** Yoco (ZAR-native checkout and payouts).
- **Observability:** Sentry (Error tracking).

---

## 5. Strategic Context (NMU Alpha)
We are currently in an **Alpha Phase** at Nelson Mandela University.
- **Scope:** 5–10 Vendors, 100 Students.
- **Focus:** Operational reliability and trust building.
- **Constraint:** NFC and Student Card Digitization are currently disabled for the pilot to focus on commerce and events.
