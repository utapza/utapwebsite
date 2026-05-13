# Copy Spec: uShop (Commerce Module)

uShop is the campus commerce experience inside the uTap mobile app. Audience for uShop is **the student** (see [`utap-mobile-audience.md`](utap-mobile-audience.md)).

This doc covers strings unique to uShop. Shared strings (payments, auth, errors) live in [`utap-mobile-copy.md`](utap-mobile-copy.md).

---

## 1. Module identity

| Where | Copy |
|-------|------|
| Tab label | `uShop` |
| Tab hint (on first reveal) | `Order from campus vendors.` |
| Home header | `What are you grabbing?` |
| Search placeholder | `Search food, books, gear…` |

The name **uShop** is one word, lowercase `u`, capital `S`. Never `Ushop` or `U-Shop`.

---

## 2. Discovery (uShop home)

### 2.1 Above the fold

| Element | Copy |
|---------|------|
| Greeting (morning) | `Morning, {first name}.` |
| Greeting (afternoon) | `Afternoon, {first name}.` |
| Greeting (evening) | `Evening, {first name}.` |
| Sub greeting | `Here's what's open on campus.` |
| Empty campus | `Nothing's open at your campus right now. Check back soon.` |

### 2.2 Section headers

| Section | Header |
|---------|--------|
| Frequently ordered | `Order again` |
| Open now | `Open right now` |
| Promoted vendors | `Featured this week` |
| New on uTap | `New on campus` |
| Closing soon | `Closing soon` |
| All stores | `All stores` |

### 2.3 Category chips

`Food · Drinks · Snacks · Books · Stationery · Electronics · Personal care · Print & copy · More`

When a category is empty: `No {category} stores yet at your campus.`

---

## 3. Store detail

| Element | Copy |
|---------|------|
| Open badge | `Open · Closes {time}` |
| Closing soon badge | `Closing in {15 min}` |
| Closed badge | `Closed · Opens {time}` |
| Distance label | `{n} min walk` |
| Pickup label | `Pickup` |
| Delivery label (only if vendor offers it) | `Delivery from R {fee}` |
| Search inside store | `Search this store` |
| Empty category in store | `Nothing in this section today.` |
| Store description fallback | (Don't auto-fill — only show if vendor wrote one.) |
| Vendor away message | `{Vendor} is on a quick break. They'll be back at {time}.` |

### 3.1 Product card

| Element | Copy |
|---------|------|
| Out of stock | `Sold out` |
| Limited badge | `Only {n} left` |
| Add button | `Add` |
| Quick-add toast | `Added to your bag.` |
| Quantity stepper accessibility label | `Quantity` |

### 3.2 Product detail

| Element | Copy |
|---------|------|
| Title | `{Product name}` |
| Price | `R {amount}` |
| Description fallback | (Don't show a fallback. If the vendor didn't write one, hide the section.) |
| Variant picker title | `Pick a {variant type}` |
| Add-on picker title | `Add anything?` |
| Notes for vendor | `Notes for {vendor} (optional)` |
| Notes placeholder | `e.g. no cheese, extra hot sauce` |
| Add to bag CTA | `Add R {amount} to bag` |

---

## 4. Bag

### 4.1 Empty bag

| Element | Copy |
|---------|------|
| Headline | `Your bag is empty.` |
| Sub | `Find something good near you.` |
| Primary | `Browse uShop` |

### 4.2 Bag with one vendor

| Element | Copy |
|---------|------|
| Header | `Bag from {vendor}` |
| Sub | `Pickup at {store name}` |
| Edit quantity | tap to adjust |
| Remove item | swipe to remove (no copy needed) |
| Notes for vendor | `Add a note for {vendor}` |
| Pickup time picker | `When do you want to pick up?` |
| Pickup options | `As soon as ready · 15 min · 30 min · Choose time` |
| Subtotal label | `Subtotal` |
| Service fee label (if any) | `Service` |
| Discount label | `Discount` |
| Total label | `Total` |
| Checkout CTA | `Pay R {total}` |

### 4.3 Bag with multiple vendors (we don't support this in v1)

If a student tries to add an item from a different vendor while their bag has another vendor's items:

> Modal title: `Start a new bag?`
> Body: `You can only order from one vendor at a time. Replace your bag from {current} with this item?`
> Primary: `Replace bag`
> Secondary: `Keep my bag`

### 4.4 Bag with closed vendor

If the vendor goes offline mid-bag:

> Banner: `{Vendor} just closed for the day. Your bag is saved for tomorrow.`

---

## 5. Checkout

| Step | Copy |
|------|------|
| Header | `Confirm and pay` |
| Pickup summary | `Pick up at {store}, {time}` |
| Edit pickup link | `Change pickup` |
| Payment summary | `Pay with {method}` |
| Edit payment link | `Change method` |
| Voucher input | `Have a voucher code?` |
| Voucher apply button | `Apply` |
| Terms inline | `By placing this order, you agree to uTap's [Order Terms].` |
| Primary CTA | `Pay R {total}` |
| Processing | `Asking your bank…` |
| Success | `Order placed. {Vendor} is making it now.` |

After success, route to the order tracker, not back to the bag.

---

## 6. Order tracker (uShop side)

States and their copy. Each shows a one-line title, a sub, and (when relevant) an ETA.

| Status | Title | Sub | ETA |
|--------|-------|-----|-----|
| Placed | `Order placed` | `Waiting for {vendor} to accept.` | — |
| Accepted | `{Vendor} is on it` | `They'll start preparing your order shortly.` | — |
| Being prepared | `Being prepared` | `Hot and fresh. We'll ping you when it's ready.` | `Ready in about {12 min}` |
| Ready for pickup | `Ready to collect` | `Tap "I'm here" when you arrive.` | — |
| At-store check-in | `Tell {vendor} you're here` | `Show this code: {short code}.` | — |
| Collected | `All yours` | `Enjoy. See you next time.` | — |
| Cancelled by vendor | `Order cancelled` | `{Vendor} couldn't make this one. You haven't been charged.` | — |
| Cancelled by student | `Cancelled` | `You haven't been charged.` | — |
| Refunded | `Refunded` | `R {amount} on its way back to your card.` | `Usually 2–5 working days.` |

### 6.1 "I'm here" interaction

| Element | Copy |
|---------|------|
| Button (before pickup) | `I'm here to collect` |
| Button (during) | `Showing code to {vendor}…` |
| Success | `Collected. Enjoy.` |
| Failure | `That didn't go through. Show your code to {vendor} — they can mark it manually.` |

---

## 7. Receipt

| Element | Copy |
|---------|------|
| Title | `Receipt` |
| Order number | `Order #{shortId}` |
| Date | `{Date} at {time}` |
| Items section | `What you got` |
| Pickup section | `Pickup` |
| Payment section | `Paid via {method}` |
| Subtotal | `Subtotal` |
| Discount line | `Discount ({code})` |
| Total | `Total paid` |
| Vendor block | `{Vendor name}, {Store address}` |
| VAT note (if applicable) | `Prices include VAT.` |
| Share receipt | `Share receipt` |
| Help with this order | `Get help with this order` |

---

## 8. Reorder

| Element | Copy |
|---------|------|
| Button | `Order again` |
| Modal title | `Order this again?` |
| Modal sub | `We'll start a new bag at {vendor} with the same items.` |
| Modal primary | `Start bag` |
| Item unavailable warning | `{n} item{s} aren't available right now.` |
| Item unavailable detail | `We'll skip {item} and add the rest.` |

---

## 9. Vouchers, promotions, app discounts

### 9.1 Voucher applied to bag

| Element | Copy |
|---------|------|
| Inline above total | `Voucher applied: {code} — saves R {amount}` |
| Remove voucher | `Remove voucher` |

### 9.2 App discount (uTap-funded promo)

When a uTap-wide discount is on:

| Element | Copy |
|---------|------|
| Banner | `uTap is paying R {discount} of your order. No code needed.` |
| Inline above total | `uTap deal applied — saves R {amount}` |

Never imply the vendor is funding a uTap discount. If the vendor *is* funding it, frame as "Voucher from {vendor}".

### 9.3 Promotion didn't apply

| Reason | Copy |
|--------|------|
| Minimum order not met | `Spend at least R {min} to use this voucher.` |
| Excluded item | `This voucher doesn't cover {item}.` |
| Time window | `This voucher works from {time} to {time}.` |
| Expired | `This voucher expired on {date}.` |
| Used up | `This voucher's been claimed by other students.` |

---

## 10. Empty / edge states

| Where | Copy |
|-------|------|
| No stores at campus | `No stores at {campus} yet.` Sub: `We're talking to vendors near you.` |
| No products in store | `{Vendor} hasn't listed anything yet.` |
| Search no results | `No results for "{term}".` Sub: `Try a different word or browse categories.` |
| Outside operating hours | `Most stores are closed right now. Come back at {time}.` |
| Big network failure | `We're having trouble loading uShop. Pull down to retry.` |

---

## 11. Errors specific to uShop

| Trigger | Copy |
|---------|------|
| Item ran out while in bag | `{Item} just sold out. We've removed it from your bag.` |
| Vendor went offline mid-checkout | `{Vendor} just closed. You weren't charged — try another store.` |
| Pickup time no longer available | `That pickup time's been taken. Pick another.` |
| Min order not met | `{Vendor} needs a R {min} order minimum.` |
| Max order exceeded | `That's more than {vendor} can prep right now. Drop a few items.` |

---

## 12. Marketing copy inside uShop

A few in-app moments invite a lighter brand voice. Use these sparingly:

| Where | Copy |
|-------|------|
| First-order banner | `First order? It's on us — R 20 off, applied at checkout.` |
| Friday lunch banner | `Fridays are busy. Order now, walk in, walk out.` |
| Exam-week banner | `Exam week. We'll do the queue if you do the studying.` |
| Pickup arrival nudge | `You're 2 min away. {Vendor} will start any moment.` |

Don't run these all at once. Pick one moment, run it, retire it.

---

## 13. Accessibility

- All product cards have an `accessibilityLabel`: "{Product name}, R {price}, from {vendor}".
- Quantity steppers expose "Increase quantity" / "Decrease quantity".
- Order tracker states are read aloud by screen readers on status change.
- Don't rely on colour alone to indicate sold-out — also show the word.

---

## 14. Forbidden in uShop copy

- "Cart" — we use **bag**.
- "Checkout your order" — we use **place order** / **pay**.
- "Delivery" used as the default — we are pickup-first.
- "Click & collect" — too jargon-y. Use **pickup**.
- "Item processed" — use the specific state.
