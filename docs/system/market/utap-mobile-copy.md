# Copy Spec: uTap Mobile (Student App)

Canonical strings for the React Native app (`utap-apps`).

If you change a string in code, update it here first.
If you need a string that isn't here, add it.

Conventions:

- **Sentence case** for everything.
- Buttons use the verb of the outcome (`Save card`, not `Submit`).
- Money: `R 45` (whole rand) or `R 12.50` (with cents). Always with a thin space.
- Read [`voice-guidelines.md`](voice-guidelines.md) before adding a new pattern.

---

## 1. App identity strings

| Where | Copy |
|-------|------|
| App store title | `uTap` |
| App store subtitle | `Tap in. Order up. Show up.` |
| App store short description | `Your student card on your phone. Order from campus vendors. Catch games and events.` |
| Splash tagline | `Tap in. Order up. Show up.` |
| Tab bar labels | `Wallet · uShop · uGig · Orders · Profile` |

Note: the wallet tab is the home of saved cards. We call it **Wallet** in the UI even though the docs and code use *Cards*. Standardise on **Wallet** in user copy.

---

## 2. Onboarding

### 2.1 Welcome carousel (first launch)

| Slide | Headline | Subhead |
|-------|----------|---------|
| 1 | Your student card on your phone | Scan it once. Tap in for years. |
| 2 | Skip the campus queue | Order from real campus vendors and pick up when it's ready. |
| 3 | Tickets without the scramble | Catch varsity games and events on the same screen. |

CTA on the final slide: `Get started`.
Secondary link: `I already have an account`.

### 2.2 Sign up

| Element | Copy |
|---------|------|
| Title | `Create your uTap account` |
| Sub | `Free, takes about a minute.` |
| Email field placeholder | `Email` |
| Phone field placeholder | `Phone (optional)` |
| Password field placeholder | `Password` |
| Password hint | `At least 8 characters.` |
| Submit button | `Create account` |
| Already-have-account link | `Sign in instead` |
| Terms inline (under button) | `By creating an account, you agree to our [Terms] and [Privacy Policy].` |

### 2.3 Sign in

| Element | Copy |
|---------|------|
| Title | `Welcome back` |
| Sub | `Sign in to pick up where you left off.` |
| Forgot password link | `Forgot your password?` |
| Sign in button | `Sign in` |
| New here link | `Create an account` |

### 2.4 Forgot password

| Element | Copy |
|---------|------|
| Title | `Reset your password` |
| Sub | `We'll send a reset link to your email.` |
| Button | `Send reset link` |
| Success | `Check your email — we've sent a link.` |

### 2.5 University picker (first-run)

| Element | Copy |
|---------|------|
| Title | `Which campus are you on?` |
| Sub | `So we can show you stores and events near you.` |
| Search placeholder | `Search universities` |
| Not listed link | `Can't find your university?` |
| Confirm button | `Set my campus` |
| Empty state | `Nothing matches that search.` |

### 2.6 NFC priming (before first scan)

| Element | Copy |
|---------|------|
| Title | `Let's get your student card on your phone.` |
| Sub | `Hold your physical card against the back of your phone when we ask.` |
| Primary | `Scan my card` |
| Secondary | `I'll do this later` |

---

## 3. Wallet (NFC card flow)

### 3.1 Empty wallet

| Element | Copy |
|---------|------|
| Headline | `Your wallet is empty.` |
| Sub | `Scan your student card to add it.` |
| Primary | `Scan a card` |
| Help link | `What can I scan?` |

### 3.2 During scan

| State | Copy |
|-------|------|
| Looking for tag | `Hold your card flat against the back of your phone…` |
| Reading | `Reading your card…` |
| Success | `Card read. Saving to your wallet…` |
| Backed up | `Card saved. You're ready to tap.` |
| Tag moved early | `Lost the card halfway. Hold steady and try again.` |
| No tag found | `Couldn't find a card. Try holding it flatter against the back of your phone.` |
| Card type unsupported | `That card isn't supported yet. Got a different one? Try again.` |

### 3.3 Saved card detail

| Element | Copy |
|---------|------|
| Title (varies) | `Student card` / `Library card` / `Access card` |
| Status badge (cloud synced) | `Synced` |
| Status badge (local only) | `On this phone only` |
| Backup CTA | `Back up to my uTap account` |
| Remove button | `Remove from wallet` |
| Remove confirm | `Remove this card from your wallet? You can always scan it again.` |
| Tap to use button | `Tap to use` |

### 3.4 Phone-as-card (emulation)

| State | Copy |
|-------|------|
| Ready to tap | `Hold your phone against the reader.` |
| Tapping | `Hold steady…` |
| Success | `You're in.` |
| Tap timed out | `That didn't go through. Try again, holding the phone flat against the reader.` |
| Tap failed at reader | `The reader didn't accept that. The door staff can help.` |

Sound + haptic should match these states.

---

## 4. Profile

| Element | Copy |
|---------|------|
| Header (logged in) | `{First name}` |
| Sub | `{University}` |
| Sections | `Account · Saved cards · Payment methods · Notifications · Help · About` |
| Sign out | `Sign out` |
| Sign out confirm | `Sign out of uTap? Your saved cards will stay backed up.` |
| Delete account | `Delete my account` |
| Delete account confirm headline | `Delete your uTap account?` |
| Delete account confirm sub | `This removes your saved cards, order history, and tickets from our servers. You can't undo this.` |
| Delete account final button | `Delete account` |

### 4.1 Payment methods

| Element | Copy |
|---------|------|
| Empty | `No payment methods yet. We'll save one when you place your first order.` |
| Default badge | `Default` |
| Add new | `Add a card` |
| Remove confirm | `Remove this card? You'll choose a payment method next time you check out.` |

### 4.2 Notification settings

| Element | Copy |
|---------|------|
| Title | `What we ping you about` |
| Section: orders | `Order updates — we keep these on so you don't miss a pickup.` |
| Toggle: tickets | `Event reminders — never miss a game.` |
| Toggle: promos | `Deals from your campus vendors.` |
| Toggle: news | `What's new in uTap.` |

Order updates are non-optional. Make that clear with a locked toggle.

---

## 5. Order history (cross-module)

| Element | Copy |
|---------|------|
| Empty | `No orders yet.` (Sub: `When you order from uShop or grab tickets from uGig, they'll live here.`) |
| Filter labels | `All · uShop · uGig · Tickets` |
| Status: placed | `Order placed` |
| Status: making | `Being prepared` |
| Status: ready | `Ready to collect` |
| Status: picked up | `Picked up` |
| Status: cancelled | `Cancelled` |
| Status: refunded | `Refunded` |
| Detail header | `Order #{shortId}` |
| Detail subhead | `{Vendor name} · {University}` |
| Receipt button | `View receipt` |
| Reorder button | `Order again` |
| Contact vendor | `Get in touch with {vendor}` |
| Cancel order button | `Cancel order` |
| Cancel confirm | `Cancel this order? If {vendor} has started making it, they may decline.` |

---

## 6. Payments (shared by uShop and uGig)

| Step | Copy |
|------|------|
| Bag review (uShop) / Ticket review (uGig) title | `Review your order` |
| Total label | `Total` |
| Discount applied | `Discount` (with line item showing voucher name) |
| Payment method picker title | `How do you want to pay?` |
| Yoco hosted CTA | `Pay R {amount} with Yoco` |
| Add card link | `Add a card` |
| Apple Pay button | `Apple Pay` |
| Google Pay button | `Google Pay` |
| Voucher input | `Have a voucher code?` |
| Voucher applied | `Voucher applied: {code}` |
| Voucher rejected (expired) | `That voucher's expired. Try another.` |
| Voucher rejected (invalid) | `We can't find that voucher.` |
| Voucher rejected (min order) | `Spend at least R {min} for this voucher.` |
| Processing | `Asking your bank…` |
| Success | `Paid. {Vendor} is making your order now.` |
| Failed (bank declined) | `Your bank declined that payment. Your money is safe — try another card.` |
| Failed (network) | `We couldn't reach Yoco. Check your connection and try again.` |
| Failed (vendor not available) | `{Vendor} closed before we could place the order. You weren't charged.` |

---

## 7. NFC ticket display (uGig tickets, see also ugig-copy.md)

| Element | Copy |
|---------|------|
| Title | `Show this at the gate` |
| Sub | `Or tap your phone on the reader.` |
| Status: not started | `Doors open at {time}` |
| Status: starts soon | `Starts in {30 min}` |
| Status: scanned | `Welcome in.` |
| Lost ticket help | `Help with this ticket` |

---

## 8. Help / Support

| Element | Copy |
|---------|------|
| Help home title | `How can we help?` |
| Sections | `Scanning your card · Orders · Payments · Tickets · Account` |
| Contact us | `Get in touch` |
| Contact form button | `Send message` |
| Send success | `Got it. We'll reply within 24 hours.` |
| Live phone (when available) | `Call {hours} · {phone}` |

---

## 9. Errors (mobile-wide)

| Code class | Title | Body | Primary |
|------------|-------|------|---------|
| Network | `Can't reach uTap` | `Check your connection and try again.` | `Retry` |
| Server side | `Something on our side broke` | `You weren't charged. Try again in a minute.` | `Try again` |
| Auth expired | `Sign in again` | `Your session expired. Sign in to keep going.` | `Sign in` |
| Permission denied | `You don't have access to that` | `Reach out to support if this looks wrong.` | `Get in touch` |
| NFC unsupported | `Your phone can't tap yet` | `uTap needs NFC. Most newer phones have it — yours may not.` | `Read more` |
| Camera permission off | `We can't open the camera` | `Turn on camera access in your phone settings.` | `Open settings` |
| Location permission off | `We can't see where you are` | `Turn on location in your phone settings to find stores nearby.` | `Open settings` |

Never display raw error codes as the headline. If diagnostic codes are useful, show them as `Reference: A1B2` at the bottom of the screen.

---

## 10. Microcopy patterns

### Save bar (sticky bottom)

When a form has unsaved changes:

> Sticky strip: `Save your changes?`  Primary: `Save`  Secondary: `Discard`

### Pull to refresh

- Idle: pull arrow only.
- Refreshing: `Updating…`
- Just refreshed: `Up to date.` (auto-dismiss in 2s).

### Optimistic update reverted

> `That didn't save. We've put it back.`

### Offline banner

> `You're offline. We'll catch up when you're back.`

### Maintenance window

> `uTap is doing some quick housekeeping. Back in {minutes}.`

---

## 11. Permission prompts

When asking the OS for a permission, *we* explain first; then the OS prompt fires.

| Permission | Our explainer (before OS prompt) |
|------------|----------------------------------|
| Camera | "We use the camera to scan order codes at pickup. We don't take photos." |
| Location | "We use your location to show stores and events near your campus." |
| Notifications | "We'll let you know when an order is ready or a game starts." |
| NFC | (no OS prompt — but explainer: "We use NFC to scan and tap with your card.") |

---

## 12. Currency and locale

- All currency: `R` + thin space + number, no decimals on whole rand.
- Dates inside the app: `23 May`, `Today`, `Tomorrow`, `Friday`.
- Times: 12-hour with am/pm in body copy, 24-hour in dense UI like calendars.
- Use the user's set university timezone (currently SAST for all SA campuses).

---

## 13. Strings explicitly forbidden

| String | Where it shows up | Replace with |
|--------|---------------------|----------------|
| "Submit" | any form CTA | the outcome verb |
| "Loading..." | spinners | name the action (`Reading your card…`) |
| "Oops!" | error headlines | a specific headline |
| "Click here" | any link | the outcome verb in the link |
| "Press OK to continue" | confirmations | the specific outcome |
| "MIFARE error" | NFC errors | "Couldn't read that card." |
| "Your card couldn't be processed" | payment errors | "Your bank declined that payment." |

---

## 14. Pending strings

Strings that need a final wording call. Track here so they don't get invented inconsistently in code.

| Area | Question | Owner |
|------|----------|-------|
| Cancel-order window | How long do students have to cancel for free? | Product |
| Refund timing | What do we promise for typical refund times? | Finance + Product |
| Multi-campus students | How do we phrase someone studying at two campuses? | Product |
| Group orders | Do we ship this? If so, naming? | Product + Marketing |

Resolve these in product reviews; don't ship guesses.
