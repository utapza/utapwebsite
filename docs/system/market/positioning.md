# uTap Positioning

The 90-second answer to "what is uTap and who is it for".

---

## 1. One-line positioning

**For South African students who want campus life on one phone**, **uTap** is **the student card and campus marketplace in your pocket** that lets you **tap into university buildings, order from campus vendors, and grab event tickets — in one app**, **so you stop carrying cards, wallets, and queues you don't have time for**.

---

## 2. Who we're for

### Primary: the student

- 17–25, undergrad, at a South African university or TVET college.
- Lives between residence, lecture halls, the library, and a campus café.
- Phone-first. Carries the bare minimum.
- Pays mostly with their phone (instant EFT, virtual card, contactless).
- Tight on money and tighter on time.

### Secondary: the campus vendor

- Owns or runs a store on or near campus — food, drinks, stationery, electronics, sports gear, prints.
- Already serving students with a queue out the door.
- Wants more orders without hiring more staff.
- Wants payouts they can predict.
- Often a small team (1–5 people) doing operations on a phone or tablet.

### Tertiary: the university and uTap ops team

- University facility staff who want fewer lost-card replacements and faster turnstile flow.
- The internal uTap admin team operating the platform day-to-day.

---

## 3. What we replace

| Today | uTap |
|-------|------|
| A plastic student card you keep losing | A card that lives on your phone |
| Queueing 15 minutes for a coffee between lectures | Order on the way, pick up the moment you arrive |
| Cash, separate event tickets, paper stamps for games | One bag, one wallet, one tap |
| Vendors juggling WhatsApp orders, cash drawers, and spreadsheets | One inbox, automatic payouts |
| Admin chasing payments and vendor onboarding by email | One console with everything visible |

---

## 4. Our core promise

Three jobs, one tap each:

1. **Tap in.** Your student card on your phone — for buildings, residences, libraries, and turnstiles wherever campus accepts it.
2. **Order up.** Food, books, electronics, and everyday campus essentials from trusted vendors near you. Pay on your phone, skip the queue, collect when it's ready.
3. **Show up.** Tickets for varsity sports, society events, and campus gigs — on the same phone you used to pay for them.

Vendors get the matching promise on their side: **list, sell, get paid**.

---

## 5. Why uTap and not something else

| Alternative | Why uTap wins |
|-------------|----------------|
| Uber Eats / Mr D | Campus vendors and pickup-first; no R 40 delivery fee on a R 30 toastie; works with stores literally inside your campus |
| Cash + plastic student card | One device, no replacements, identity stays with you if your wallet doesn't |
| Generic event ticketing | Built for the campus rhythm — varsity games, society launches, residence socials |
| Standalone vendor POS | Includes the student demand pipeline, not just the till |
| Building a custom NFC stack yourself | We've already built the native MIFARE module and handle the campus acceptance work |

---

## 6. What we are not

Saying what we're **not** is half the brand. uTap is **not**:

- A general-purpose delivery app. We are pickup-first. Delivery is optional, where vendors offer it.
- A bank or a fintech. Yoco moves the money. We just make checkout fast.
- A social network. We don't try to be your group chat.
- An e-hailing service. Get to campus, then we start.
- A point-of-sale system. Vendors who need a till should keep their till; we drive student orders to them.
- A facility-management system. We tap into existing university access infrastructure; we don't replace it.

Drift here is dangerous. If a feature pulls the product into one of these lanes, slow down and check.

---

## 7. Geography and currency

uTap is **South African by default**. All copy, currency (ZAR), date formats, holidays, and university references should reflect that.

International expansion is not on the immediate roadmap. Don't write copy that pretends it is.

---

## 8. Brand attributes (the feel)

| We are | We are not |
|--------|------------|
| Practical | Preachy |
| Quick | Rushed |
| Confident | Cocky |
| Warm | Bubbly to the point of fake |
| Honest about money | Coy about fees |
| South African | Generically American |
| Built for campus | Built for "the modern user" |

Pick honesty over hype every time. The student already knows the trade-offs of student life. We're not here to tell them campus is amazing — we're here to take three friction points off their day.

---

## 9. Proof points to lean on

When we need credibility in copy or campaigns, reach for these (don't fabricate):

- Native NFC scanning + emulation built in-house (`@utapza/expo-mifare-scanner`).
- Payments via **Yoco**, a payment partner students and vendors already know.
- Encrypted card storage on device; cloud sync only when the student is signed in.
- Vendor payouts on a fixed cycle (e.g. the 28th), so cash flow is predictable.
- Multi-store vendor support — one operator can run several outlets.
- One Supabase backend used by every uTap app; the data the student sees is the data the vendor and admin see.

Use the specifics. Avoid abstract claims like "fast", "secure", "the best".

---

## 10. Common positioning mistakes (call them out in review)

1. **Talking about NFC tech**. Students don't care about MIFARE. They care about tapping into the library.
2. **Selling the platform to students**. Students buy the *outcome*. Save "platform" language for the vendor side, and even there use it sparingly.
3. **Promising delivery**. uTap is pickup-first.
4. **Sounding like a fintech**. We're a student utility that happens to handle money.
5. **Universal student stereotypes**. South African campuses have residences, taxis, rugby, queues at the cafeteria, slow Wi-Fi between buildings. Lean into the real thing.

---

## 11. The 30-second elevator pitch

> uTap is the campus app for South African students. Your student card lives on your phone — tap into buildings, libraries, and residences. Order food, books, and gear from trusted campus vendors and skip the queue. Grab tickets for varsity games and campus events on the same screen. Vendors get a simple way to take orders and get paid. One app, one tap, the day moves quicker.

---

## 12. Related docs

- [`messaging-architecture.md`](messaging-architecture.md) — turn this positioning into headlines and pillars.
- [`voice-guidelines.md`](voice-guidelines.md) — how the brand actually sounds.
- [`go-to-market-plan.md`](go-to-market-plan.md) — how we get this positioning into the market.
