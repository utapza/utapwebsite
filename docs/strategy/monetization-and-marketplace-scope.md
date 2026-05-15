# uTap — Marketplace scope, monetization, and positioning (NMU Alpha Pivot)

*Last Updated: 2026-05-15 (NMU Alpha Pivot — NFC removed)*

---

## 1. Product Snapshot
- **Core:** React Native / Expo app focused on campus ordering (uShop) and event discovery (uGig).
- **Marketplace:** **uShop** (general campus stores) and **uGig** (campus event tickets) load data via `ushopService.getStores` and `ticketService`, filtered by `university_id`.
- **Payments:** **Yoco** hosted checkout for both uShop orders and uGig tickets.

---

## 2. Marketplace scope (Alpha Behaviour)

| Surface | Rule |
|--------|------|
| **uShop** | Only stores for the student's set university. Students can filter by campus. If no university is set, the app prompts the user to set it in Profile. |
| **uGig** | Same university scope; event listings are filtered by campus/university to ensure relevance. |

**Why:** Keeps the commerce loop (fulfilment and attendance) aligned to the physical institution where the student is located.

---

## 3. Monetization Strategy (Alpha)

| Stream | Status |
|--------|--------|
| **uShop Orders** | 8% platform commission + Yoco processing fees (2.95% + VAT). *Waiver active for founding vendors.* |
| **uGig Tickets** | Commission per ticket sold or flat fee for event organisers. |
| **University switch** | Fixed ZAR R100 fee to change university affiliation (prevents cross-campus arbitrage). |

---

## 4. Positioning vs Competitors

| Platform | Position | uTap Advantage |
|----------|----------|----------------|
| **Mr D / Uber Eats** | Delivery-first, high fee | Pickup-first, R0 delivery fee, 8% vs 30% commission. |
| **Quicket / Ticketpro** | General ticketing | Campus-native discovery, verified student access. |
| **WhatsApp Groups** | Manual, unmanaged | Automated pickup codes, secure payments, order tracking. |

---

## 5. Implementation Status
- **NFC/Card Scanning:** Disabled for Alpha to focus on commerce reliability.
- **Yoco Integration:** Audited and live for NMU pilot.
- **Remote Support:** 6-week model defined for PE-to-Joburg handover.
