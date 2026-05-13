# Notifications & Emails

Every outbound message uTap sends — push, email, SMS, in-app — gets its copy here.

The rule: **if we wouldn't send it twice to a friend, we don't send it at all.**

---

## 1. Channels and when to use them

| Channel | Use for | Don't use for |
|---------|---------|---------------|
| **Push notification** | Real-time order updates, ticket reminders, payouts, NFC backup confirmations | Marketing news, weekly digests |
| **In-app inbox** | Receipts, refunds, weekly summary, new feature highlights | Anything urgent |
| **Email** | Receipts, password resets, account changes, vendor payouts, monthly summaries, partnership comms | Day-to-day order updates (use push) |
| **SMS** | Critical alerts only — OTP, big refund, security event | Promotions, recommendations |
| **WhatsApp** | Vendor onboarding (opt-in), urgent vendor support | Anything to students |

---

## 2. Frequency caps

| Audience | Push | Email | SMS |
|----------|------|-------|-----|
| Student | Max 3/day, max 1 promo/week | 1–2/week max during promos, otherwise transactional only | Only for security or money-out events |
| Vendor | All transactional are fine; promos max 1/week | 1 transactional/event, 1 weekly digest, 1 monthly statement | Only when a payout is sent or a critical alert |
| Admin | No caps (operational) | Daily summary opt-in, plus event-triggered alerts | — |

A student who has been pushed twice today doesn't get a third push for a promo. The order-ready push is exempt.

---

## 3. The push notification pattern

```
{One specific thing.} {Why it matters or what's next.}
```

- **Under 60 characters** so it fits on lockscreens.
- **Title** carries the headline; **body** carries the detail.
- **Always tap-through** to the relevant screen, not the app home.
- **Sound and haptic** only for state-changing events (order ready, ticket scanned in). Quiet for informational pushes.

### Student push library

| Trigger | Title | Body |
|---------|-------|------|
| Card backed up after first scan | `Card saved.` | `Your student card is on your phone. Open uTap to tap.` |
| New order placed | `Order placed.` | `{Vendor} will accept soon. We'll ping you when they start.` |
| Order accepted by vendor | `{Vendor} is on it.` | `Your order is being prepared.` |
| Order being prepared (long wait) | `Almost there.` | `{Vendor} says ready in about {12 min}.` |
| Order ready | `Ready to collect.` | `Tap to see your code and pickup point.` |
| Vendor declined | `Order cancelled.` | `{Vendor} couldn't make this one. You haven't been charged.` |
| Refund issued | `Refund on its way.` | `R {amount} back to your card in 2–5 working days.` |
| Voucher you can use | `Voucher dropped.` | `R {amount} off your next order from {vendor or anywhere}.` |
| Ticket purchased | `Tickets are yours.` | `{Event} on {date}. Open uTap to see them.` |
| Event tomorrow | `{Event} tomorrow.` | `Doors open at {time}.` |
| Event 1 hour away | `Kickoff in 1 hour.` | `Tap to show your ticket.` |
| Event cancelled | `{Event} cancelled.` | `Refund on its way — R {amount}.` |
| New stores at your campus | `New on {campus}.` | `{Vendor} just opened on uTap.` |
| Friend sent a ticket | `Ticket from {name}.` | `Tap to add it to your wallet.` |
| Password changed | `Password updated.` | `If this wasn't you, get in touch right away.` |
| Sign-in from new device | `New sign-in.` | `Was this you? Tap to check.` |

### Vendor push library

| Trigger | Title | Body |
|---------|-------|------|
| New order | `New order from {first name}.` | `R {amount} · {n} item{s} · Open to accept.` |
| Order waiting too long | `{First name}'s order is still pending.` | `Accept or decline within 5 min so they aren't left hanging.` |
| Mark-ready reminder | `Order's been preparing 20 min.` | `Time to mark it ready?` |
| Student arrived | `{First name} is here.` | `Hand over order #{short}.` |
| Refund processed | `Refund sent.` | `R {amount} returned to {first name}.` |
| Payout approved | `Payout approved.` | `R {amount} on its way to your bank.` |
| Payout sent | `Payout sent.` | `R {amount} sent. Should clear in 1–2 working days.` |
| Payout failed | `Payout couldn't go.` | `Check your bank details in uTap for Vendors.` |
| Store has been paused | `{Store} paused.` | `Students can't see it. Resume when you're ready.` |
| Weekly digest | `Your week on uTap.` | `{Orders} orders · R {revenue} earned. Tap for details.` |

---

## 4. Email patterns

### 4.1 Subject line rules

- Plain. No emoji unless the message warrants it (a milestone, a celebration).
- Under 50 characters.
- Says what's inside.
- No fake `Re:` or `Fwd:`.
- No clickbait ("You won't believe…").

### 4.2 Universal email frame

Every email follows:

```
From: uTap <messages@utap.co.za>  (or vendors@, billing@ where it fits)
Subject: {short, specific}

Hi {first name},

{One-line answer to what just happened.}

{Optional 1–2 sentence context.}

{Primary CTA as a clear link button.}

{Optional secondary CTA as text link.}

Thanks,
uTap
```

Plain text version always present.

### 4.3 Student emails

| Trigger | Subject | Body summary |
|---------|---------|---------------|
| Welcome (post-signup) | `Welcome to uTap` | "Glad you're here. Three things to try first: scan your card, browse uShop, check what's on at uGig." |
| Confirm email | `Confirm your email` | "Tap the link to finish setting up." Single CTA: `Confirm email`. Link expires in 24 hours. |
| Password reset | `Reset your password` | "Use this link to set a new one." Link expires in 1 hour. |
| Receipt | `Your order from {vendor}` | Order details, total, payment method, link to receipt. |
| Refund | `Refund on its way` | "R {amount} back to your card. Banks usually take 2–5 working days." |
| Ticket purchased | `Your tickets to {event}` | Date, time, venue. PDF attachment + in-app link. |
| Event cancelled | `{Event} was cancelled` | "Refund of R {amount} on its way." |
| Account deleted | `Your uTap account has been deleted` | "Your account and saved cards have been removed. Get in touch if you didn't request this." |

### 4.4 Vendor emails

| Trigger | Subject | Body summary |
|---------|---------|---------------|
| Vendor signup submitted | `Your uTap application` | "We're reviewing your store. We'll come back within one working day." |
| Vendor approved | `You're approved — go live` | "Sign in to your vendor portal, list at least one product, and flip the switch." |
| Vendor rejected | `About your uTap application` | Plain explanation, named reason, an open invitation to reapply if relevant. |
| Vendor suspended | `Your store is paused` | Reason, what to do to reinstate, support contact. |
| Daily digest | `{Day}'s orders — R {revenue}` | "{N} orders today across {stores}. Top item: {item}." |
| Weekly digest | `Your week on uTap` | Order totals, revenue, top sellers, anything to act on. |
| Monthly statement | `{Month} statement` | "R {revenue} in orders. R {paid_out} paid out. R {available} available now." Attachment: PDF. |
| Payout sent | `Payout sent — R {amount}` | Bank, reference, ETA. |
| Payout rejected | `Payout request couldn't be approved` | Reason, what to do next. |
| New feature for vendors | `New in uTap for Vendors` | One paragraph, one screenshot, one link. Rare. |

### 4.5 Partner / admin emails

| Trigger | Subject | Body |
|---------|---------|------|
| Admin invite | `You've been invited to uTap Admin` | Standard role-based onboarding. |
| Security event | `Sign-in from a new device` | Device, location, time. CTA: `That was me` / `It wasn't me`. |
| Platform incident | `uTap was unavailable on {date}` | Plain post-mortem, what we did, what we're doing to prevent it. |
| Press list | (curated list, see press strategy) | — |

---

## 5. SMS pattern

We send SMS only for **security and money-out** events. Keep them under 160 characters, no emoji, no marketing speak.

| Trigger | Copy |
|---------|------|
| OTP for sign-in | `Your uTap verification code is {code}. It expires in 5 minutes. uTap will never ask for this code.` |
| Sign-in from new device | `New sign-in to uTap from {city}, {date}. Wasn't you? Reply STOP or go to utap.co.za/help.` |
| Payout sent (vendor) | `uTap: R {amount} sent to {bank} {last4}. Reference {ref}. Should clear in 1–2 working days.` |
| Big refund (>R 500) | `uTap: R {amount} refund issued to your bank-ending {last4}. 2–5 working days to clear.` |

If you find yourself writing an SMS for any other reason, it should be a push instead.

---

## 6. In-app inbox

The inbox lives inside the mobile app and the vendor portal. It holds **non-urgent, persistent** messages:

| Type | Example |
|------|---------|
| Receipt | "Receipt for your order from {vendor}" |
| Refund confirmation | "We refunded R {amount}." |
| Weekly digest | "Your week on uTap" |
| Feature announcement | "uGig now shows seating maps." |
| Policy update | "We updated our refund policy." |

Inbox messages have:

- A title (under 50 chars).
- A preview line (under 100 chars).
- A body (no length limit, but keep it tight).
- A single CTA or none.

---

## 7. Transactional template library

A short style block for the most common templates. Copy into the templating engine.

### Receipt body (student)

```
Hi {first_name},

Here's your receipt for the order from {vendor}.

{items table}

Subtotal: R {subtotal}
{discount line if any}
Total paid: R {total}
Paid with: {method}

Pickup: {pickup point}, {pickup time}.

Need help? Reply to this email or open your order in uTap.

Thanks,
uTap
```

### Payout sent (vendor)

```
Hi {first_name},

R {amount} has been sent to {bank} account ending {last4}.

Reference: {bank_reference}
ETA: 1–2 working days for the payment to clear.

Statement: {link to PDF}

Questions? Reply or ping us at vendors@utap.co.za.

Thanks,
uTap
```

### Vendor approved

```
Hi {first_name},

Welcome to uTap. Your store is approved.

Here's how to go live:

1. Sign in: {portal link}
2. Add at least one product.
3. Flip the switch under "Go live".

Need a hand? Reply to this email or call us on {phone} weekdays 9–17.

Thanks,
uTap
```

---

## 8. Localisation

uTap operates in **South African English**. Don't ship US English variants. If we localise into isiZulu, isiXhosa, Afrikaans, or Sesotho in the future, add a sibling file (`notifications-and-emails.zu.md` etc.) — don't translate inline here.

---

## 9. Approval flow

| Change | Approver |
|--------|----------|
| Tweak to wording of an existing template | PR author |
| New triggered notification (push/email/SMS) | Lifecycle / CRM lead |
| Promo or marketing send to students | Marketing lead + Lifecycle |
| Anything involving money words ("paid", "refunded", "balance") | Finance + Marketing |
| Anything involving security ("sign-in", "device", "verification") | Engineering + Marketing |

---

## 10. Forbidden in notifications

- ALL-CAPS WORDS in subjects or push titles.
- Emoji in transactional pushes (allowed in marketing pushes if it's earned).
- Vague phrasing in money pushes ("a refund was processed" → "R 45 refunded").
- "Don't miss out!" or any urgency theatre.
- Auto-pushes that don't link somewhere meaningful.
- Multiple CTAs in one email — pick one.
- A reply-to that's a no-reply address. Always reply to a real inbox.
