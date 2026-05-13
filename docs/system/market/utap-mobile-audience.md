# Audience: uTap Mobile (Student App)

The mobile app is uTap's flagship surface. This doc captures **who the student is**, **what they're trying to get done**, and **how we should talk to them at each moment**.

Implementation lives in `utap-apps` (React Native / Expo).

---

## 1. The student in one paragraph

A South African university student, aged 17–25, on their second or third phone, with a tight budget and a tighter schedule. They live partway between residence, lecture halls, and a campus café. They juggle a student ID card, a meal card, an event wristband, cash for the taxi, and a phone that's usually the only thing in their hand. They want fewer things to carry, fewer queues to stand in, and fewer reasons to walk back to res.

---

## 2. Personas

### Persona A — **Naledi, first-year, undergrad**

- 18, lives in res on campus.
- Just got her student card last week and has already misplaced it twice.
- Uses Instagram and TikTok heavily; checks email rarely.
- Orders coffee almost daily, buys textbooks reluctantly.
- Pays with her bank's app + occasional cash from her parents.
- **What she needs from uTap:** a way to stop losing her card; quick coffee orders between 8am classes.

### Persona B — **Sipho, second-year, off-campus**

- 21, takes a taxi or bus to campus.
- Spends 6+ hours on campus daily, mostly in the library.
- Likes rugby; goes to home games.
- Already pays for tuition via a sponsor; his spending money is tight.
- Comfortable with mobile payments (Apple Pay, instant EFT).
- **What he needs from uTap:** order food without walking back across campus; secure his student ID; get game tickets without scrambling.

### Persona C — **Thandi, third-year, society lead**

- 22, runs a society on campus.
- Organises events and game-day pre-drinks for ~40 people.
- Buys a lot from vendors as a group.
- Very switched-on socially; influences what her friends use.
- **What she needs from uTap:** quick group orders, easy event ticketing, status as a "knows-what's-good" student.

---

## 3. What students actually do (jobs-to-be-done)

| Job | When it happens | How uTap shows up |
|-----|------------------|---------------------|
| Get into the library | Late evening, between lectures, weekends | Tap into the library with the saved card |
| Get a coffee in 15 minutes | 8am, 11am, 2pm | Pre-order from a campus café, walk in, walk out |
| Buy textbooks at the start of term | Once a semester | Find them via uShop, pickup at the campus bookshop |
| Grab last-minute snacks | Any time after a lecture | Pickup from a tuck shop near the lecture hall |
| Replace a charger | After dropping it for the third time | Order from the campus electronics store |
| Attend the home rugby game | Match days | Buy ticket, show on phone at the gate |
| Get into res after curfew | Late at night | Tap to enter at the res door |
| Track spending | End of week | See order history in the app |

We don't need to support every "campus app" job. We pick the few that actually save the student time and money, and we win those.

---

## 4. Pain points we directly remove

1. **"I forgot my student card."** — Card lives on the phone.
2. **"The queue is out the door."** — Order ahead, collect.
3. **"I lost my ticket."** — Tickets live in the app.
4. **"I don't carry cash."** — Yoco, Apple Pay, Google Pay, card on file.
5. **"Where did my money go?"** — Order history with totals.
6. **"The vendor is offline / closed."** — Real store hours, accurate availability.

Pain points we don't pretend to fix:

- Tuition pricing.
- Wi-Fi quality on campus.
- The state of campus food generally.
- Replacing a lost physical card. (We complement it; we don't replace it on the university's side.)

---

## 5. Emotional drivers

| What they feel | When | We respond by |
|----------------|------|----------------|
| Stressed | Sunday night before a deadline | Quiet, helpful tone; no flashy promos. |
| Hungry | Between lectures | Snappy CTAs; clear ETAs from vendors. |
| Self-conscious | Paying at a cash counter for a small item | Frictionless pickup; their phone does the talking. |
| Proud | They scored a great deal or got tickets fast | Positive confirmations; share-worthy receipts. |
| Anxious | Tapping into a residence at 11pm | Reassuring NFC feedback ("Hold for a second…", "You're in"). |
| Tired | Friday afternoon | Light, optimistic copy. |

---

## 6. Language accessibility

- Reading level: **Grade 9 / 14-year-old**. Even though our users are at university, they read product copy fast and tired.
- Sentence length: target 12 words or fewer per UI string.
- Avoid metaphors that don't translate across SA cultures.
- Don't write copy that *requires* knowing university lingo to understand (e.g. "Lekker, your bag is sorted" — fine in marketing, not on a payment screen).

---

## 7. Channels students live on

| Channel | Use case |
|---------|----------|
| Instagram + TikTok | Discovery, brand vibe, social proof |
| WhatsApp | Word of mouth between friends, group chats |
| Push notifications | Order ready, NFC card backed up, ticket reminders |
| In-app inbox | Receipts, weekly digest |
| Email | Receipts, password resets — minimal otherwise |
| SMS | Critical transactional (OTP, big charge) only |
| Campus posters | Discovery moments at orientation, during exam stress |

Don't email students like they're enterprise buyers. Don't push them like they're a CRM target.

---

## 8. What students don't want from us

- Daily push notifications.
- Surveys after every order.
- Cross-sells to products they didn't ask about.
- "How did we do?" emails 5 minutes after pickup.
- Aggressive upsells to a paid tier (there isn't one).
- Anything that feels like the app is mining their data for ads.

If a feature would feel like that, talk it through with Marketing before shipping.

---

## 9. Moments of high anxiety (handle with care)

These are the moments where copy quality matters most. Build them deliberately.

1. **First scan.** "Hold your card flat against the back of your phone. We'll let you know when it's read."
2. **Paying for the first time.** "You'll pay R 65 with Yoco. No charges yet — confirm to pay."
3. **A failed payment.** "Your bank declined that one. Your money is safe. Try again or pick another card."
4. **A missing order.** "We're checking with Campus Café — they'll respond shortly. You won't be charged twice."
5. **Tapping into a residence at night.** "Hold steady… You're in." (Or a clear failure path.)
6. **Sign out / delete account.** Slow these down. Confirm carefully.

---

## 10. Anti-personas (people we're not building for)

- **Parents looking for a tracking app.** uTap doesn't surveil. We sell to the student.
- **High-school students wanting to feel "uni-ish".** We don't take payment without university affiliation.
- **Off-campus consumers.** If you don't go to campus regularly, you're outside the use case.
- **Corporate buyers.** No B2B SKU.
- **General delivery customers.** Pickup-first.

If a feature decision starts catering to an anti-persona, slow down.

---

## 11. How students discover us

| Trigger | Likely first impression |
|---------|--------------------------|
| Orientation week stand | Branded poster, QR code, signup table |
| Friend sends a WhatsApp link | "Use this code to get R 20 off your first order" |
| Spotting a uTap sticker on a café till | "Order via uTap" |
| TikTok / Instagram ad with hook | "POV: you forgot your student card" |
| Search "campus food order" or similar | Marketing site lands them on the student page |
| University comms (when partnered) | A formal email saying "uTap is now available" |

---

## 12. Related copy spec

- [`utap-mobile-copy.md`](utap-mobile-copy.md) — exact strings for the mobile app.
- [`ushop-copy.md`](ushop-copy.md) — uShop module.
- [`ugig-copy.md`](ugig-copy.md) — uGig module.
- [`notifications-and-emails.md`](notifications-and-emails.md) — outbound messages.
