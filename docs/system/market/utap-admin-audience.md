# Audience: uTap Admin

The admin console (`utap-admin`) is internal-only. It is used by the uTap operations team to manage universities, vendors, stores, products, payouts, promotions, and disputes.

This doc is short by design — admin is the surface where **clarity beats friendliness**.

---

## 1. The admin in one paragraph

A member of the uTap operations team. Mid-twenties to forties. Probably handling onboarding calls, vendor support, or finance reconciliation. Knows the platform inside out, switches between tabs all day, and wants the console to behave like a tool — fast, dense, with no theatrical animations.

---

## 2. Personas

### Persona A — **Operations lead**

- Manages vendor onboarding and approvals.
- Spends most of the day in the vendors and stores screens.
- Wants bulk actions, fast search, and accurate counts.

### Persona B — **Finance ops**

- Reviews and approves payouts.
- Cross-checks earnings against Yoco.
- Wants numbers, filters, exports.

### Persona C — **Support agent**

- Investigates student complaints (missing orders, refund requests, scan failures).
- Wants a fast way to look up an order or a student by reference.
- Wants enough context to call a vendor and resolve the issue.

### Persona D — **Founder / leadership**

- Logs in occasionally to look at totals.
- Wants the dashboard to summarise the platform in one screen.

---

## 3. What admin is for

- **Universities and campuses:** create, edit, activate, set logos.
- **Vendors:** approve, suspend, reinstate, edit account details.
- **Stores:** view all stores, pause/unpause, edit categories, override settings if needed.
- **Products:** view across the platform, flag, hide, audit categories.
- **Categories:** product and store taxonomies.
- **Orders:** look up, investigate, manually refund.
- **Payouts:** review pending, approve, mark completed.
- **Promotions:** create platform-wide app discounts, vouchers, review vendor promos.
- **Settings:** platform commission, Yoco fees, payout schedule, discount caps.
- **Admin users:** invite team members, manage roles.

---

## 4. Tone for admin

- **Direct.** Skip the fluff. Headings, tables, numbers.
- **Calm under pressure.** No flashing red unless something is on fire.
- **Verbose when consequences matter.** A payout approval shows the full breakdown.
- **Forgiving.** Destructive actions are reversible where possible; confirmations explain what undo paths exist.

Admin is the **quietest voice in the system**. It can use words students never see: "settlement", "RLS", "reconciliation", "ledger".

---

## 5. Anti-personas

- **Students.** They never see admin. If they do, something's misconfigured.
- **Vendors.** They never see admin. If they do, something's misconfigured.

This means admin can be **denser** than student/vendor copy. Don't dumb it down.

---

## 6. What admin shouldn't try to be

- A consumer dashboard.
- A growth dashboard with vanity metrics.
- A CRM with sales pipelines.
- A "delight"-driven product.

It's a tool. Optimise for **time-to-answer**.

---

## 7. Related docs

- [`utap-admin-copy.md`](utap-admin-copy.md) — exact strings.
- [`notifications-and-emails.md`](notifications-and-emails.md) — admin-triggered emails (e.g. vendor approval).
