# Copy Spec: uTap Admin

Internal admin console (`utap-admin`). Audience: uTap ops team only — students and vendors never see these strings.

Tone: direct, calm, dense with information. See [`utap-admin-audience.md`](utap-admin-audience.md).

---

## 1. App identity

| Where | Copy |
|-------|------|
| Browser tab | `uTap Admin` |
| Sign-in headline | `uTap Admin` |
| Sign-in sub | `Internal operations console.` |
| Sidebar header | `uTap Admin` (with user name and role beneath) |
| Footer (every page) | `uTap Admin · v {version} · {environment badge}` |

The environment badge shows `Production`, `Staging`, or `Local` — always visible. Use a colour strip on staging and local so it's obvious you're not on prod.

---

## 2. Sign in

| Element | Copy |
|---------|------|
| Title | `Sign in to uTap Admin` |
| Email | `Email` |
| Password | `Password` |
| Submit | `Sign in` |
| Forgot password | `Forgot password?` |
| Access denied (not an admin) | `Your account doesn't have admin access. Get in touch with the uTap team.` |
| Inactive admin | `Your admin account is inactive. Contact a super admin.` |
| Wrong credentials | `Email or password didn't match.` |

---

## 3. Dashboard home (analytics)

Reuse strings from the implemented `Dashboard.tsx`. Canonical:

| Element | Copy |
|---------|------|
| Page title | `Dashboard` |
| Sub | `Live performance across vendors, stores, and orders.` |
| Refresh CTA | `Refresh` |
| Refreshing label | `Refreshing...` |
| Stat: total vendors | `Total Vendors` |
| Stat: total students | `Total Students` |
| Stat: total orders | `Total Orders` |
| Stat: total revenue | `Total Revenue` |
| Trend hint | `{+/-X}% from last month` |
| Chart: orders & revenue | `Orders & Revenue (last 14 days)` |
| Chart: sales by university | `Sales by University` |
| Top vendors header | `Top Performing Vendors` |
| Empty chart | `No orders recorded in the last 14 days.` |
| Empty vendor list | `No vendor activity yet.` |
| Error retry | `Try again` |

These strings already live in the codebase. Treat this spec as the source of truth.

---

## 4. Navigation labels

Sidebar items (in order):

`Dashboard · Universities · Vendors · Stores · Products · Product categories · Store categories · Orders · Payouts · Promotions · Settings · Admin users`

Each label is sentence case. The active item is bold.

---

## 5. Universities

| Element | Copy |
|---------|------|
| Page title | `Universities` |
| Sub | `Universities and campuses students can pick.` |
| Add CTA | `Add a university` |
| Empty | `No universities yet.` |
| Search | `Search universities` |
| Columns | `Name · Location · Stores · Campuses · Created · Status · Actions` |
| Status: active | `Active` |
| Status: inactive | `Inactive` |
| Toggle confirm: deactivate | `Deactivate {name}? Its stores and students will no longer appear in uTap.` |
| Delete confirm | `Delete {name}? Stores, vendors, and student records linked to this university will be removed. This can't be undone.` |

### 5.1 Add / edit university

| Element | Copy |
|---------|------|
| Title (add) | `New university` |
| Title (edit) | `Edit university` |
| Name | `University name` |
| Location | `Location` |
| Logo URL | `Logo URL` |
| Active toggle | `Active` |
| Save | `Save` |

---

## 6. Vendors

| Element | Copy |
|---------|------|
| Page title | `Vendors` |
| Sub | `All vendor accounts on uTap.` |
| Filters | `Status · University · Joined within` |
| Status filter values | `All · Pending · Approved · Suspended · Rejected` |
| Search placeholder | `Search by name or email` |
| Columns | `Vendor · Email · Stores · Status · Joined · Last seen · Actions` |
| Empty | `No vendors match those filters.` |

### 6.1 Vendor detail

| Element | Copy |
|---------|------|
| Header | `{Vendor name}` |
| Sub | `{Email} · joined {date}` |
| Status badge | `Pending · Approved · Suspended · Rejected` |
| Action: approve | `Approve vendor` |
| Action: reject | `Reject` |
| Action: suspend | `Suspend` |
| Action: reinstate | `Reinstate` |
| Action: delete | `Delete account` |
| Approve confirm | `Approve {name}? They'll be able to go live and start selling immediately.` |
| Reject reason input | `Why are you rejecting this application?` |
| Reject confirm | `Reject {name}? They'll get an email explaining why.` |
| Suspend reason input | `Why are you suspending this vendor?` |
| Suspend confirm | `Suspend {name}? Their stores will be hidden from students until reinstated.` |
| Delete confirm | `Delete {name} and all their stores, products, and orders? This can't be undone.` |
| Activity log section | `Account activity` |

---

## 7. Stores

| Element | Copy |
|---------|------|
| Page title | `Stores` |
| Sub | `Every store across uTap.` |
| Add CTA | `Add a store for a vendor` |
| Filters | `Vendor · University · Campus · Type · Status` |
| Status values | `All · Live · Paused` |
| Columns | `Store · Vendor · University · Campus · Type · Status · Products · Orders · Actions` |
| Pause action | `Pause` |
| Pause confirm | `Pause {store}? Students won't see it. The vendor can re-activate from their portal.` |
| Resume action | `Resume` |

---

## 8. Products

| Element | Copy |
|---------|------|
| Page title | `Products` |
| Sub | `All products across uTap. Flag anything that breaks policy.` |
| Filters | `Vendor · Store · Category · Status` |
| Columns | `Product · Store · Vendor · Price · Status · Updated · Actions` |
| Flag action | `Flag` |
| Flag reason input | `Why are you flagging this product?` |
| Flagged badge | `Flagged · {reason}` |
| Hide action | `Hide from uTap` |
| Hide confirm | `Hide "{product}"? Students won't see it until you un-hide it.` |

---

## 9. Categories (product + store)

| Element | Copy |
|---------|------|
| Page title (product) | `Product categories` |
| Page title (store) | `Store categories` |
| Add CTA | `Add a category` |
| Edit modal title | `Edit category` |
| Name | `Name` |
| Description | `Description (optional)` |
| Active toggle | `Active` |
| Delete confirm | `Delete "{name}"? Products in this category will lose their category until you reassign them.` |

---

## 10. Orders (admin lookup)

| Element | Copy |
|---------|------|
| Page title | `Orders` |
| Sub | `Look up any order, refund where needed.` |
| Quick lookup | `Order ID, student email, or vendor name` |
| Filters | `Status · Payment · Date range · University · Vendor` |
| Columns | `Order · Student · Vendor · Total · Payment · Status · Placed · Actions` |
| Action: view | `View` |
| Action: refund | `Refund` |

### 10.1 Order detail

| Element | Copy |
|---------|------|
| Header | `Order {short ID}` |
| Sub | `{date} · {time}` |
| Sections | `Student · Vendor · Items · Payment · Activity · Notes` |
| Payment line | `R {gross} · Yoco fee R {fee} · uTap fee R {platform} · Vendor net R {net}` |
| Refund partial CTA | `Issue partial refund` |
| Refund full CTA | `Refund this order` |
| Refund confirm | `Refund R {amount} to {student}? This reverses vendor earnings for this order.` |
| Refund success | `Refund issued. Bank usually clears within 2–5 working days.` |
| Internal note input | `Add an internal note (only admin sees this)` |

---

## 11. Payouts

(Implemented in `Payouts.tsx` — these are the canonical strings.)

| Element | Copy |
|---------|------|
| Page title | `Vendor Payouts` |
| Sub | `Review vendor payout requests and record completed bank transfers.` |
| Generate scheduled CTA | `Generate 28th payouts` |
| Stat: vendor balances | `Vendor balances` |
| Stat: pending payouts | `Pending payouts` |
| Stat: paid out | `Paid out` |
| Stat: system earnings | `System earnings` |
| Queue title | `Payout queue` |
| Status filters | `Pending · Approved · Processing · Completed · Rejected · All` |
| Empty queue | `No payout requests found.` |
| Manage CTA | `Manage` |
| Modal title | `Manage payout` |
| Bank reference label | `Bank transfer reference` |
| Admin notes label | `Admin notes` |
| Rejection reason label | `Rejection reason` |
| Actions | `Cancel · Reject · Approve · Processing · Mark completed` |
| Toast: marked X | `Payout marked as {status}.` |
| Toast: generated N | `Created {n} scheduled payout request{s}.` |

---

## 12. Promotions (admin)

| Element | Copy |
|---------|------|
| Page title | `Promotions` |
| Sub | `Run platform-wide deals or review vendor promos.` |
| Tabs | `App discounts · Vouchers · Vendor promos · Redemptions` |
| Add app discount | `New app discount` |
| Add voucher | `New voucher` |
| Active badge | `Active` |
| Draft badge | `Draft` |
| Paused badge | `Paused` |
| Expired badge | `Expired` |

### 12.1 App discount form

| Element | Copy |
|---------|------|
| Title (new) | `New app discount` |
| Internal name | `Internal name` |
| Audience-facing label | `Label students see` |
| Discount type | `Percent · Fixed rand` |
| Discount value | `Amount` |
| Max discount cap | `Maximum discount per order (R)` |
| Min order | `Minimum order (R)` |
| Eligibility | `Who's eligible?` |
| Eligibility options | `All students · By university · By campus · By cohort` |
| Schedule | `Starts · Ends` |
| Usage limit | `Total redemptions allowed` |
| Per-student limit | `Per student` |
| Activate confirm | `Activate this discount? It'll appear at checkout for eligible students immediately.` |

### 12.2 Vendor promo review

| Element | Copy |
|---------|------|
| Header | `{Vendor} — {promo name}` |
| Status | `Awaiting review` |
| Approve CTA | `Approve promo` |
| Reject CTA | `Reject promo` |
| Reject reason input | `Why?` |

---

## 13. Settings

| Section | Copy |
|---------|------|
| `Platform fees` | `Platform fees` |
| `Yoco fees` | `Yoco fees` |
| `Payout schedule` | `Payout schedule` |
| `Discount caps` | `Discount caps` |
| `Notifications` | `Outbound notifications` |
| Save change confirm | `Update platform settings? This affects every new order and payout from now on.` |
| Save success | `Updated.` |

Each setting field has inline help describing its impact (e.g. "Charged to every paid order. Currently 10%.").

---

## 14. Admin users

| Element | Copy |
|---------|------|
| Page title | `Admin users` |
| Sub | `Who can sign in to uTap Admin.` |
| Add CTA | `Invite an admin` |
| Roles | `Admin · Super admin` |
| Add modal title | `Invite an admin` |
| Invite send | `Send invite` |
| Invite sent toast | `Invite sent to {email}.` |
| Deactivate confirm | `Deactivate {name}? They won't be able to sign in.` |
| Reactivate confirm | `Reactivate {name}?` |
| Delete confirm | `Delete this admin? Their activity log is preserved.` |

---

## 15. Errors (admin-specific)

| Trigger | Copy |
|---------|------|
| RLS denied | `You don't have permission to do that.` |
| Stale data | `Someone else updated this just now. Reload to see the latest.` |
| Bulk action partial fail | `{X} of {Y} succeeded. The rest didn't — check the details below.` |
| Export too large | `That export is too big. Narrow your date range and try again.` |
| Schema mismatch | `Something's off with this record. Get the engineering team.` |

---

## 16. Activity logging

Every destructive admin action gets logged. Wording for log entries:

| Action | Log line |
|--------|----------|
| Approve vendor | `Approved vendor {name}` |
| Suspend vendor | `Suspended vendor {name} — {reason}` |
| Reject vendor | `Rejected vendor application {name} — {reason}` |
| Issue refund | `Refunded order {short ID} — R {amount} — {reason}` |
| Mark payout completed | `Marked payout {id} as completed — reference {ref}` |
| Update platform settings | `Updated {setting} from {old} to {new}` |
| Activate promotion | `Activated promotion {name}` |

These log lines are admin-facing. They should read like a paper trail, not a chat.

---

## 17. Forbidden in admin copy

- Marketing language ("Awesome!", "🎉").
- Hidden technical errors as headlines.
- Anything that infantilises the admin ("Don't worry, we've got this!").
- Emoji clutter in tables.
- Long marketing intros at the top of operational pages.
