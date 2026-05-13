# Copy Spec: uGig (Events Module)

uGig is the events and tickets experience inside the uTap mobile app — varsity sport, society launches, residence socials, campus gigs.

Audience is **the student** (see [`utap-mobile-audience.md`](utap-mobile-audience.md)). Shared mobile strings live in [`utap-mobile-copy.md`](utap-mobile-copy.md).

---

## 1. Module identity

| Where | Copy |
|-------|------|
| Tab label | `uGig` |
| Tab hint (on first reveal) | `Tickets for games and events.` |
| Home header | `What's on?` |
| Home sub | `Games, gigs, and society nights — at your campus.` |
| Search placeholder | `Search events` |

The name **uGig** is one word, lowercase `u`, capital `G`. Never `Ugig` or `U-Gig`.

---

## 2. Discovery (uGig home)

### 2.1 Section headers

| Section | Header |
|---------|--------|
| Up next at your campus | `Up next at {campus}` |
| This week | `This week` |
| This weekend | `This weekend` |
| Sports | `Varsity sport` |
| Societies | `Society events` |
| Residence | `Res socials` |
| Featured | `Featured` |

### 2.2 Category chips

`Rugby · Football · Cricket · Netball · Athletics · Society night · Concert · Talk · Workshop`

If no events in a chip:

> `No {category} events at {campus} right now.`

### 2.3 Empty homepage

| Element | Copy |
|---------|------|
| Headline | `Quiet on campus.` |
| Sub | `We'll let you know when something's on.` |
| CTA | `Browse other campuses` |

---

## 3. Event detail

### 3.1 Header strip

| Element | Copy |
|---------|------|
| Event title | `{Event name}` |
| Subtitle | `{Sport / category} · {Campus}` |
| Date and time | `{Day, date} · {time}` |
| Venue | `{Venue}` |
| Status: tickets selling | `Selling now` |
| Status: opens soon | `Tickets open {date} at {time}` |
| Status: selling fast | `Selling fast` |
| Status: limited left | `Only {n} left` |
| Status: sold out | `Sold out` |
| Status: event over | `This event has ended` |

### 3.2 Body sections

| Section | Header |
|---------|--------|
| About | `About this event` |
| Schedule (if multi-part) | `Schedule` |
| Venue info | `How to get there` |
| Doors open | `Doors open {time}` |
| Rules / age | `Good to know` |
| Cancellation policy | `Cancellations` |

If a section is empty: hide it. Don't show "No description available."

### 3.3 Ticket selection

| Element | Copy |
|---------|------|
| Ticket types title | `Pick your ticket` |
| Standing ticket | `Standing` |
| Seated ticket | `Seated` |
| Student-only | `Student price` |
| Visitor / guest | `Visitor` |
| Quantity stepper | `How many?` |
| Max per student | `Up to {n} per student` |
| Continue CTA | `Continue · R {total}` |

### 3.4 Seat picker (when seated)

| Element | Copy |
|---------|------|
| Title | `Pick your seats` |
| Hint | `Tap to select. Tap again to release.` |
| Selected count | `{n} of {max} selected` |
| Continue CTA | `Continue · R {total}` |
| Seat taken toast | `That seat just got taken. Try another.` |

### 3.5 Companion picker (when needed)

If the student is buying for friends:

| Element | Copy |
|---------|------|
| Section title | `Who's coming?` |
| Sub | `You'll get a code to send each friend.` |
| Add friend | `Add a name` |
| Skip option | `Skip — I'll sort this later.` |

---

## 4. Checkout (uGig)

Reuses the shared payment screen (see [`utap-mobile-copy.md`](utap-mobile-copy.md) §6). uGig-specific overrides:

| Element | Copy |
|---------|------|
| Review title | `Review your tickets` |
| Pickup row (replaced with) | `Sent to your phone instantly` |
| Final CTA | `Pay R {total}` |
| Success | `You're in. Tickets are in your wallet.` |

---

## 5. Tickets (your wallet of tickets)

uGig tickets live in the same **Wallet** tab as student cards, in a "Tickets" subsection. We don't create a separate tab.

### 5.1 Ticket card (collapsed)

| Element | Copy |
|---------|------|
| Title | `{Event name}` |
| Sub | `{Date} · {Venue}` |
| Status: upcoming | `In {time}` |
| Status: starts soon | `Starts in {30 min}` |
| Status: live | `Live now` |
| Status: scanned | `Scanned in` |
| Status: ended | `Ended` |
| Status: cancelled by organiser | `Event cancelled — refund issued` |

### 5.2 Ticket detail (expanded)

| Element | Copy |
|---------|------|
| Big QR / barcode | (visual) |
| Helper above code | `Show this at the gate.` |
| Helper below code | `Or tap your phone on the reader.` |
| Seat info (if seated) | `Section {block} · Row {row} · Seat {seat}` |
| Doors open | `Doors open {time}` |
| Venue link | `Open in maps` |
| Share ticket (if transferable) | `Send this ticket to a friend` |
| Refund request | `Request a refund` |

### 5.3 Share ticket flow (only if transferable)

| Element | Copy |
|---------|------|
| Sheet title | `Send this ticket` |
| Sub | `They'll get a link to add it to their uTap.` |
| Phone input | `Friend's number` |
| Send button | `Send ticket` |
| Sent confirmation | `Sent. They have 24 hours to claim it.` |
| Cancel send | `Take it back` |

### 5.4 Refund

| State | Copy |
|-------|------|
| Eligible | `Refund this ticket?` Sub: `You'll get R {amount} back to your card.` Primary: `Refund this ticket` |
| Outside refund window | `Refunds closed for this event.` Sub: `Try sending the ticket to a friend instead.` |
| Already used | `This ticket was scanned in. We can't refund it.` |
| Event cancelled | `Refunded automatically. R {amount} back to your card in 2–5 working days.` |

---

## 6. At-the-gate experience

| State | Copy |
|-------|------|
| Approaching | `Ready to show.` |
| Scanned successfully | `Welcome in.` |
| Scan failed | `That didn't scan. Try again, or ask staff for help.` |
| Wrong event | `That ticket is for a different event.` |
| Already used | `This ticket was already scanned in.` |
| Doors not open yet | `Doors open at {time}. Come back then.` |

Add a haptic + sound for the success and failure states.

---

## 7. Notifications (event-specific)

See [`notifications-and-emails.md`](notifications-and-emails.md) for full list. uGig-specific copies:

| Trigger | Push |
|---------|------|
| Tickets bought | `Tickets in your wallet. {Event} on {date}.` |
| Day before | `{Event} tomorrow. Doors open at {time}.` |
| 1 hour out | `Kickoff in 1 hour. Tap to show your ticket.` |
| 15 min out | `15 min to kickoff. Heading to {venue}?` |
| Event cancelled | `{Event} was cancelled. Refund's on its way — R {amount}.` |
| New tickets dropped at your campus | `New: {event} at {campus}. Tickets just opened.` |

Last one (drop alert) is opt-in, not transactional.

---

## 8. Errors specific to uGig

| Trigger | Copy |
|---------|------|
| Tickets just sold out before checkout | `Sold out just now. We saved your spot for {n} min — try again or pick another event.` |
| Seat taken between selection and pay | `Someone grabbed that seat. Pick another and we'll keep the rest.` |
| Max-per-student exceeded | `You can buy up to {n} tickets per student for this event.` |
| Student verification failed (student-only event) | `This event is students-only. Confirm your student email to buy.` |

---

## 9. Empty states

| Where | Copy |
|-------|------|
| No tickets yet | `No tickets yet.` Sub: `Browse what's on at {campus}.` Primary: `See events` |
| No upcoming events | `Nothing coming up at {campus}.` Sub: `Check other campuses if you're travelling.` |
| No past events | `No past events to show.` (Hide section entirely if true.) |

---

## 10. Marketing copy inside uGig

Use sparingly — only when context fits.

| Where | Copy |
|-------|------|
| Big game banner | `Derby weekend. Tickets are flying.` |
| Pre-rivalry hype | `{Home team} vs {away team}. You don't miss this.` |
| First ticket banner | `Your first uGig ticket? It's on your phone — no print-outs.` |
| Society launch | `Society launches usually sell out by Wednesday.` |

Never run an artificial scarcity message. If we say "selling fast", it has to be true.

---

## 11. Forbidden in uGig copy

- "Print your ticket." — we don't print.
- "Save the date." — too vague; give the date.
- "Stay tuned." — say what to do or hide the message.
- "Don't miss out." — pressure tactic.
- Generic "Buy now" CTAs — use "Get tickets".

---

## 12. Accessibility

- Event cards announce: "{Event name}, {date and time}, {venue}, {price}".
- Selected seats are announced when picked: "Block A, Row 7, Seat 12 selected".
- Tickets are screen-reader friendly: the code is described as "Entry code: {code}".
- High-contrast mode shows the QR/barcode on a solid white background regardless of theme.
