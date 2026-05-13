# uTap Voice & Tone Guidelines

How uTap sounds — across the mobile app, vendor portal, admin console, marketing site, push notifications, and emails.

Anchored to the APD-Market skill. The product communicates **outcomes**, not systems.

---

## 1. Voice in one sentence

> uTap sounds like a clued-in classmate who's already figured it out and wants you sorted in two taps.

Friendly, plain-spoken, never preachy, never corporate. Aware that the user is busy, broke-ish, and on the move.

---

## 2. The four voice anchors

Every string should pass at least three of these four checks:

1. **Human** — sounds like a person, not a system.
2. **Short** — earns its space. Cuts to the action.
3. **Specific** — names what just happened or what to do next.
4. **Calm** — doesn't shout, blame, or apologise more than once.

If a line fails three of the four, rewrite it.

---

## 3. Tone by context

| Moment | Tone | Example |
|--------|------|---------|
| Welcome / onboarding | Warm, optimistic, guiding | "Welcome to uTap. Let's get your student card on your phone." |
| Empty state | Friendly nudge, not apologetic | "No orders yet. Browse uShop to get started." |
| Loading | Quiet, specific | "Reading your card…" |
| Success | Confident, brief | "Card saved. You're ready to tap." |
| Error (user can fix) | Calm, with a way out | "Hold the card flat against the back of your phone and try again." |
| Error (we caused it) | Honest, with a recovery path | "Something on our side hiccuped. Your money wasn't moved. Try again in a moment." |
| Payment | Direct, never ambiguous about money | "You'll pay R 65 with Yoco. No charges yet — confirm to pay." |
| Confirmation | Reinforcing the win | "Order placed. Campus Café is making it now." |
| Vendor dashboard | Operational, efficient | "3 new orders. Tap to view." |
| Marketing | Aspirational, light, social | "Tap in. Order up. Skip the queue." |
| Legal / consent | Plain, no jargon, complete | "You're agreeing to let uTap store your card so you can tap in next time." |

---

## 4. Sentence patterns

### Length

- **UI:** 1 short sentence, ideally under 12 words.
- **Body copy:** 1–2 sentences per paragraph.
- **Marketing headline:** 3–8 words.
- **Push notification:** under 60 characters; tells what happened and why it matters.

### Structure

Use this order whenever a moment has multiple things to say:

1. **What just happened** (or what's about to happen).
2. **Why it matters to the user**.
3. **What to do next** (a single CTA).

> Order received. Campus Café will have it ready in about 12 minutes. We'll ping you when it's up.

### Grammar

- Contractions are encouraged. "You're", "we're", "it's".
- Sentence case for buttons, headings, and tab labels. **Title Case Is Off-Brand.**
- Oxford comma in lists of three or more.
- Numerals over words for quantities (`3 items`, not "three items").
- Rand amounts: `R 45` with a thin space; never `R45.00` for whole rand.

---

## 5. CTAs (button copy)

CTAs are verbs that name the user's outcome. Avoid generic words.

### Prefer

| CTA | Used for |
|-----|----------|
| Get started | First-run signup |
| Create account | Sign-up form submit |
| Sign in | Returning user |
| Tap to scan | NFC trigger |
| Save card | After a successful scan |
| Add to bag | uShop product page |
| Place order | uShop checkout |
| Pay R 65 | Payment confirmation (always include the amount) |
| Get tickets | uGig event page |
| Reserve seat | uGig with seating |
| I'm here | "I'm at the pickup point" |
| Mark ready | Vendor: order is ready for pickup |
| Mark collected | Vendor: order has been handed over |
| List a product | Vendor empty product state |
| Request payout | Vendor finance |
| Try again | After any error |

### Avoid

- **Submit** — robotic. Use the outcome verb instead.
- **Continue** — vague. Name what's next.
- **OK** — what does it confirm? Use specific text.
- **Process** / **Execute** — these are system words.
- **Click here** — buttons aren't sentences; the whole button is the link.

---

## 6. Banned words and lazy phrases

| Don't write | Why | Try |
|-------------|-----|-----|
| API / endpoint / token | Backend term, not user concept | "connection", "sign-in", or omit |
| MIFARE / sector / block | Hardware jargon | "card", "tap" |
| Server error / 500 / 404 | System-facing | "Something on our side broke" |
| Processing… | Vague | "Saving your order…", "Reading your card…" |
| Submission failed | Bureaucratic | "We couldn't send that. Try again." |
| Leverage / solution / synergy | Generic SaaS | Plain English |
| Powered by AI | Distracting | Name the benefit, not the engine |
| Disrupting | Marketing cliché | What problem you remove |
| Best-in-class / world-class | Empty | A specific advantage |
| User | In *user-facing* copy | "you" |
| Click | Mobile is touch | "tap" |
| Please | More than once per moment | Once is enough |

---

## 7. Inclusive and clear language

- Speak to a **single you**. Avoid "users", "members", "subscribers" inside the product.
- No gendered defaults. "Student" or "you".
- Don't assume a body (no "blind users", say "students using a screen reader").
- Spell out university and brand names on first mention; abbreviate after.
- Avoid slang that ages fast. Light SA-English texture is fine ("sorted", "sort it out", "lekker" only in opt-in marketing, never in transactional UI).

---

## 8. Numbers, dates, and currency

| Pattern | Format | Example |
|---------|--------|---------|
| Rand whole amount | `R 45` | "Pay R 45" |
| Rand with cents | `R 45.50` | only when partial rand matters |
| Large amounts | thin space thousands | `R 12 500` |
| Date in full body | day month | "23 May" |
| Date short | `dd MMM` | "23 May" still works in tight UI |
| Time | 24-hour in lists, 12-hour with context for humans | "16:00" or "4 pm today" |
| Relative time | when it helps | "in 12 min", "just now", "yesterday" |
| Counts | numerals | "3 orders" |
| Pluralisation | always handle 1 vs many | "1 order", "3 orders" |

---

## 9. Error pattern

Every error has three parts:

1. **What happened** (in plain words, never an error code as the headline).
2. **Why it matters** (only if the user needs to know — usually skipped).
3. **What to do next** (always present; either a CTA or a clear instruction).

Pattern:

```
{What happened.} {What to do next.}
[Primary action]   [Secondary action if needed]
```

Examples:

- **NFC read failed**
  - "Couldn't read that card. Hold it flat against the back of your phone and try again."
  - Primary: `Try again`  Secondary: `Help with scanning`

- **Payment declined**
  - "Your bank declined that payment. Try a different card or contact your bank."
  - Primary: `Try again`  Secondary: `Use another card`

- **Network down**
  - "We can't reach uTap right now. Check your connection and try again."
  - Primary: `Retry`

- **Server side error**
  - "Something on our side broke. You weren't charged. Please try again in a minute."
  - Primary: `Try again`

**Never** display a raw error code as the headline. If diagnostic codes must appear, push them to a small footer label like "Reference: A1B2" for support.

---

## 10. Empty states

Every empty state shows three things:

1. A friendly **one-liner** that doesn't sound like a system message.
2. A **suggestion** for what to do next.
3. A **CTA** if there is a sensible primary action.

| Where | Headline | Sub | CTA |
|-------|----------|-----|-----|
| No saved cards | "Your wallet is empty." | "Scan your student card to add it." | `Scan a card` |
| No uShop orders | "No orders yet." | "Find food, books, and gear from stores near you." | `Browse uShop` |
| No uGig tickets | "Nothing booked yet." | "Catch upcoming campus games and events." | `See what's on` |
| Vendor: no products | "No products yet." | "Add your first item to start selling." | `List a product` |
| Vendor: no orders | "No orders yet today." | "We'll let you know the moment one comes in." | — |
| Admin: no results | "Nothing matches your filters." | "Try adjusting the date range or status." | `Clear filters` |

---

## 11. Loading states

Be specific. Loading copy tells the user **what** is happening, not just **that** it's happening.

| Generic (don't) | Specific (do) |
|-----------------|----------------|
| Loading… | Reading your card… |
| Please wait | Placing your order… |
| Processing | Asking your bank… |
| Working on it | Updating store hours… |

Skeleton screens beat spinners wherever the layout is known.

---

## 12. Confirmation and destructive actions

Always restate what's about to happen and what can be undone.

- **Delete a product** → "Delete *Espresso Coffee*? Students will no longer see it in uShop. You can re-list it later."
- **Cancel an order** → "Cancel order #A7F2? The student will be refunded in full."
- **Suspend a vendor** → "Suspend Campus Café? Their store will be hidden from students until you reinstate it."

Destructive primary buttons are red and named after the verb: `Delete`, `Cancel order`, `Suspend`. Never `OK` or `Yes`.

---

## 13. Notifications (push and email subjects)

Push notifications are read at a glance. They follow this pattern:

> **{Hook}.** {What just happened or what's next.}

| Trigger | Push copy |
|---------|-----------|
| Order is being made | "Campus Café is on it. We'll ping you when it's ready." |
| Order ready | "Order ready. Tap to see your collection code." |
| Vendor: new order | "New order from Thabo. R 65 — open to start." |
| Vendor: payout sent | "R 1 250 sent to your bank. Should clear in 1–2 days." |
| uGig: ticket reminder | "Kickoff in 1 hour. Tap to show your ticket." |
| Cart abandonment | "Still hungry? Your bag at Campus Café is waiting." |

Email subjects follow the same rule: one promise, no hype, never `Re:` tricks or fake urgency.

---

## 14. The 60-second voice check

Before shipping any string, run this quick gut check:

1. Read it out loud. Does it sound like a person?
2. Would a busy student understand it in two seconds?
3. Does it name the outcome, not the mechanism?
4. Is there exactly one CTA?
5. If something went wrong, is there a way out?

If any answer is no, rewrite.

---

## 15. Approval ladder for new copy

| Change | Who approves |
|--------|---------------|
| Microcopy tweak (1 string, no semantic change) | PR author |
| Net-new screen or flow copy | Product owner + Marketing |
| New error class or notification | Product owner + Marketing + (if money) Finance lead |
| Brand-level shift (tagline, positioning) | Marketing lead + Founder |

Update the relevant copy doc in the same PR that changes code. The doc and the build ship together.
