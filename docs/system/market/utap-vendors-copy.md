# Copy Spec: uTap for Vendors

Canonical strings for the vendor portal (`utap-vendors`).

Tone: calm, operational, respectful of time. See [`utap-vendors-audience.md`](utap-vendors-audience.md).

---

## 1. Portal identity

| Where | Copy |
|-------|------|
| Browser tab title | `uTap for Vendors` |
| Sign-in screen logo line | `uTap for Vendors` |
| Sign-in tagline | `Run your store. Take orders. Get paid.` |
| Dashboard window title | `uTap · {Store name}` (or `· All stores` when multi-store view active) |
| Footer | `uTap · vendors.utap.co.za` |

---

## 2. Marketing (public vendor pages)

The vendor portal serves a small marketing layer before sign-in. Strings:

### 2.1 Hero

| Element | Copy |
|---------|------|
| Headline | `Sell to students before they walk past.` |
| Subhead | `Open your store on uTap, take orders from the campus next door, and get paid on a schedule you can count on.` |
| Primary CTA | `Open my store` |
| Secondary CTA | `See how it works` |

### 2.2 Three-up benefits

| Title | Body |
|-------|------|
| `One inbox` | `Every order in one place. No more juggling WhatsApp chats and shouting through the kitchen.` |
| `Predictable payouts` | `Your money lands in your Yoco bank account on a schedule. Plan, breathe, restock.` |
| `Run as many shops as you have outlets` | `Add stores at as many campuses as you operate. One log-in, one finance tab.` |

### 2.3 Pricing strip

| Element | Copy |
|---------|------|
| Headline | `Simple, transparent pricing.` |
| Body | `uTap takes a small commission on each order. You pay nothing to list your store. We show every cent of the math at checkout and on your payout statement.` |
| CTA | `See the full fee breakdown` |

(Never quote a specific percentage in marketing without Finance approval. Reference: `finance_settings.platform_commission_percent` lives in the DB.)

---

## 3. Sign in / Sign up

### 3.1 Sign in

| Element | Copy |
|---------|------|
| Title | `Sign in to your store` |
| Email placeholder | `Email` |
| Password placeholder | `Password` |
| Submit | `Sign in` |
| Forgot password | `Forgot your password?` |
| New vendor link | `New here? Open your store →` |

### 3.2 Forgot password

| Element | Copy |
|---------|------|
| Title | `Reset your password` |
| Sub | `We'll send a reset link to the email on file.` |
| Submit | `Send reset link` |
| Success | `Check your email — we've sent a link.` |

### 3.3 Sign up (vendor onboarding step 1 of 5)

| Element | Copy |
|---------|------|
| Title | `Let's open your store` |
| Sub | `Takes about 10 minutes. You can save and come back any time.` |
| Step indicator | `Step 1 of 5 · Account` |
| Owner name | `Your full name` |
| Business name | `Business or trading name` |
| Email | `Email` |
| Phone | `Phone (we use this for important alerts)` |
| Password | `Password` |
| Submit | `Save and continue` |

### 3.4 Step 2 — Choose campus

| Element | Copy |
|---------|------|
| Title | `Which campus do you serve?` |
| Sub | `Pick the campus closest to your store. You can add more campuses later.` |
| University picker label | `University` |
| Campus picker label | `Campus or building` |
| Submit | `Save and continue` |

### 3.5 Step 3 — Set up your first store

| Element | Copy |
|---------|------|
| Title | `Set up your store` |
| Sub | `This is what students see in uTap.` |
| Store name | `Store name (what students will see)` |
| Store type | `Type of store` |
| Description placeholder | `One sentence about your store. Keep it real — what do you sell, what makes it good.` |
| Logo upload | `Upload your logo` |
| Logo hint | `Square works best. JPG or PNG, under 2 MB.` |
| Submit | `Save and continue` |

### 3.6 Step 4 — Opening hours

| Element | Copy |
|---------|------|
| Title | `When are you open?` |
| Sub | `Students only see your store during these hours.` |
| Day labels | `Monday`, `Tuesday`, … |
| Closed toggle | `Closed` |
| Add break | `Add a break` |
| Submit | `Save and continue` |

### 3.7 Step 5 — Bank details

| Element | Copy |
|---------|------|
| Title | `Where should we send your money?` |
| Sub | `We send payouts to a Yoco bank account on the 28th of each month. You can request earlier payouts any time, with a R 50 minimum.` |
| Bank name | `Bank` |
| Account holder | `Account holder name` |
| Account number | `Account number` |
| Branch code | `Branch code (optional)` |
| Account type | `Account type` |
| Submit | `Save and continue` |
| Reassurance footer | `Your details are encrypted. Only uTap finance and Yoco see them.` |

### 3.8 Final step — Review and go live

| Element | Copy |
|---------|------|
| Title | `One last look` |
| Sub | `Make sure your store looks right. You can flip the switch once you've added at least 1 product.` |
| Go live primary | `Go live` |
| Save for later | `Save as draft` |
| Missing-products warning | `Add at least 1 product before going live.` |

---

## 4. Dashboard home

### 4.1 At-a-glance cards

| Card | Copy |
|------|------|
| Today's orders | `Today's orders` (large count, sub: `R {revenue} so far`) |
| Pending payout | `Pending payout` (sub: `Next sent on the 28th`) |
| Available balance | `Available now` (sub: `Request a payout any time`) |
| Live stores | `Live stores` (sub: `{n} of {total}`) |

### 4.2 Section headers

| Section | Header |
|---------|--------|
| New orders | `New orders` |
| In progress | `Being prepared` |
| Ready for pickup | `Ready to collect` |
| Recently collected | `Recently collected` |
| All today | `All today` |

### 4.3 Empty states

| Where | Copy |
|-------|------|
| No new orders | `No new orders right now. We'll let you know.` |
| No orders all day | `Quiet day so far. Update your hours if you've closed early.` |
| Store not live | `Your store isn't live yet. Add a product and flip the switch.` |

---

## 5. Order management

### 5.1 Order card (list view)

| Field | Copy / format |
|-------|----------------|
| Student name | `{First name}` (we don't show full names) |
| Order short ID | `#{short}` |
| Items count | `{n} item{s}` |
| Total | `R {amount}` |
| Time since placed | `2 min ago`, `12 min ago`, `1 hour ago` |
| Status badge | `New · Preparing · Ready · Collected · Cancelled` |

### 5.2 Order detail

| Element | Copy |
|---------|------|
| Header | `Order #{short}` |
| Sub | `{Time placed} · {Pickup time requested}` |
| Items list section | `What they ordered` |
| Notes section | `Notes from {student}` |
| Notes fallback | (Hide section if empty.) |
| Pickup section | `Pickup` |
| Pickup details | `As soon as ready` / `Asked for {time}` |
| Payment section | `Paid R {amount} with Yoco` |
| Action: accept | `Accept order` |
| Action: decline | `Decline` |
| Action: mark preparing | `Start preparing` |
| Action: mark ready | `Mark ready` |
| Action: mark collected | `Mark collected` |
| Action: cancel after accepting | `Cancel this order` |

### 5.3 Status change confirmations

| Action | Confirmation |
|--------|---------------|
| Decline | `Decline this order? {Student} will be refunded R {amount} immediately.` |
| Cancel after accepting | `Cancel this order? {Student} will be refunded and we'll let them know.` |
| Mark ready | (no confirm — student is pinged automatically) |
| Mark collected | (no confirm) |

### 5.4 Decline reasons

When declining, ask why:

| Reason | Label |
|--------|-------|
| Sold out | `Sold out of an item` |
| Closed early | `Closed for today` |
| Too busy | `Too busy to take this one` |
| Other | `Something else (let us know)` |
| Note input | `Anything you'd like us to tell the student?` |

---

## 6. Products

### 6.1 Product list

| Element | Copy |
|---------|------|
| Empty state headline | `No products yet.` |
| Empty state sub | `Students won't see your store until you add at least one.` |
| Empty state CTA | `List a product` |
| Active count badge | `{n} live` |
| Sold-out filter chip | `Sold out` |
| Hidden filter chip | `Hidden` |

### 6.2 Add or edit product

| Element | Copy |
|---------|------|
| Title (add) | `New product` |
| Title (edit) | `Edit product` |
| Name | `Product name` |
| Description | `Description (optional)` |
| Description hint | `Help students decide. Keep it short.` |
| Price | `Price (R)` |
| Category | `Category` |
| Photo | `Photo` |
| Photo hint | `Looks best in a 1:1 square. Under 2 MB.` |
| Availability times | `When is this available?` |
| Stock | `Stock on hand (optional)` |
| Stock hint | `We'll mark it sold out when this hits zero.` |
| Status: live | `Live` |
| Status: hidden | `Hidden from students` |
| Save | `Save product` |
| Delete | `Delete product` |
| Delete confirm | `Delete "{Product name}"? Students will no longer see it. You can re-list it later.` |

### 6.3 Quick actions

- **Sold out** toggle on the product card: switches the product to "Hidden — sold out" with a note in the activity log.
- **Make live** on a hidden product: confirmation only if stock is zero.

---

## 7. Stores (multi-store)

### 7.1 Stores list

| Element | Copy |
|---------|------|
| Empty | `You only have one store. Add another when you're ready.` |
| Live badge | `Live` |
| Paused badge | `Paused` |
| Add store CTA | `Add a store` |

### 7.2 Store settings

| Element | Copy |
|---------|------|
| Section: basics | `Basics` |
| Section: hours | `Opening hours` |
| Section: pickup | `Pickup details` |
| Section: staff | `Team` |
| Pickup point label | `Where students collect` |
| Pickup point hint | `e.g. "Counter at the front of the café" or "Locker by the library entrance".` |
| Staff invite CTA | `Invite a team member` |
| Staff invite sent | `Invite sent. They'll get an email to join {store name}.` |
| Pause store CTA | `Pause this store` |
| Pause confirm | `Pause {store name}? Students won't see it until you resume.` |

---

## 8. Finance

### 8.1 Finance home

| Element | Copy |
|---------|------|
| Title | `Money in, money out` |
| Hero number | `R {available_balance}` (sub: `Available to pay out`) |
| Secondary numbers | `Pending: R {pending}` · `Paid out this year: R {paid}` |
| Request payout CTA | `Request a payout` |
| Statements link | `Statements` |

### 8.2 Request a payout

| Element | Copy |
|---------|------|
| Modal title | `Request a payout` |
| Amount input | `Amount` |
| Helper | `Minimum R 50. Available now: R {available}.` |
| Bank account | `Pay into {bank name} · {last 4}` |
| Change bank link | `Change bank account` |
| Submit | `Request R {amount}` |
| Success | `We've got your request. Money usually clears in 1–2 working days.` |
| Errors |  |
| Below minimum | `Minimum payout is R 50.` |
| Over balance | `That's more than your available balance.` |
| No bank account | `Add a bank account to receive payouts.` |

### 8.3 Payout history row

| Column | Format |
|--------|--------|
| Requested | `{date}` |
| Amount | `R {amount}` |
| Status | `Pending · Approved · Processing · Completed · Rejected` |
| Reference | `{bank reference}` (if available) |
| Action | `View statement` |

### 8.4 Earnings ledger

| Element | Copy |
|---------|------|
| Title | `Every order, every cent.` |
| Filters | `This month · Last month · Custom` |
| Columns | `Date · Order · Gross · Yoco fee · uTap fee · You get` |
| Totals row | `Totals for this period` |
| Export | `Download CSV` |

Always show the fee math. Vendors will check.

---

## 9. Promotions

### 9.1 Promotions list

| Element | Copy |
|---------|------|
| Empty | `No promos yet.` Sub: `Run a special to bring students in for a slow afternoon.` CTA: `Create a promo` |
| Active badge | `Active` |
| Scheduled badge | `Starts {date}` |
| Expired badge | `Ended {date}` |

### 9.2 Create a promotion

| Element | Copy |
|---------|------|
| Title | `New promo` |
| Type picker | `Voucher (code) · App discount (automatic) · Bundle deal` |
| Name | `Internal name (only you see this)` |
| Public label | `Label students see` |
| Discount type | `Percent off · Fixed rand off` |
| Discount value | `Amount` |
| Min order amount | `Minimum order (optional)` |
| Applies to | `What it covers` |
| Usage limit | `How many can redeem this?` |
| Per-student limit | `Per student` |
| Start date | `Starts` |
| End date | `Ends` |
| Stackable toggle | `Allow stacking with uTap deals` |
| Save | `Save promo` |
| Activate | `Activate` |
| Activate confirm | `Activate this promo? It'll start showing to students immediately.` |

Add a live preview of the discount math so vendors see what students will see.

---

## 10. Settings

### 10.1 Account

| Element | Copy |
|---------|------|
| Section: profile | `Your details` |
| Section: password | `Password` |
| Change password CTA | `Change password` |
| Change email CTA | `Change email` |
| Email change confirm | `We'll send a confirmation to your new email. You'll keep signing in with the old one until you confirm.` |

### 10.2 Notifications

| Element | Copy |
|---------|------|
| Title | `What we ping you about` |
| Toggle: new orders | `New orders — we can't turn this one off, it's core to your store.` |
| Toggle: ready reminders | `Reminders to mark orders ready` |
| Toggle: weekly digest | `A short weekly summary of how your stores did` |
| Toggle: payouts | `When we send a payout to your bank` |
| Toggle: product updates | `New uTap features for vendors` |

### 10.3 Team

| Element | Copy |
|---------|------|
| Section title | `Your team` |
| Add member | `Invite someone` |
| Member role | `Owner · Manager · Staff` |
| Remove member | `Remove from store` |
| Remove confirm | `Remove {name} from {store}? They'll lose access immediately.` |

---

## 11. Errors specific to vendors

| Trigger | Copy |
|---------|------|
| Order accepted twice | `This order is already being prepared.` |
| Marked ready twice | `This order is already ready.` |
| Cancel after collected | `This order's been collected — we can't cancel it.` |
| Payout below minimum | `Minimum payout is R 50.` |
| Payout exceeds balance | `That's more than your available balance of R {available}.` |
| Bank account missing | `Add a bank account to request payouts.` |
| Schema validation | `Some details are missing. We've highlighted them.` |
| Server error | `Something on our side broke. We've logged it. Try again in a minute.` |

---

## 12. Tone test for vendor portal copy

Before shipping a new string:

1. Would Sibusiso (food vendor, mid-rush) read this in under 3 seconds?
2. Does it tell him what just happened *and* what to do next?
3. Does it avoid hype words like "Awesome!" or "🎉"?
4. If it concerns money, are the numbers explicit?

If any answer is no, rewrite.

---

## 13. Forbidden in vendor portal copy

- "Submit" — name the action.
- "Awesome!", "Yay!", "🎉" — too cheerful for an operational tool.
- "Disrupting" / "Revolutionising" — vendors are running businesses, not joining a revolution.
- "User" / "customer" — say "student" or "they".
- "Conversion" / "funnel" — internal marketing speak.
- "Optimise your funnel" — see above.
