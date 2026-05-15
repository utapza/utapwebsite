# uTap NMU Alpha Launch Plan

*Updated: May 2026*
*Phase: Alpha — Closed & Controlled*
*Scope: 5–10 Founding Vendor Collaborators | 100 Students | 4–6 Week Remote Pilot*

---

## What this is — and what it isn't

| | This Alpha | Not this |
|---|---|---|
| **Type** | Closed, hand-picked | Public launch |
| **Primary question** | Does the system work? Do vendors trust us? | Mass adoption |
| **Student cap** | 100 | Unlimited |
| **Vendor count** | 5–10 | Open self-serve |
| **Duration** | PE trip (4–5 days) + 4–6 week remote pilot | One-off visit |
| **Distribution** | TestFlight (iOS), APK sideload (Android) | App Store / Play Store |

The Alpha seeds the pilot. The pilot tests the business model. Beta opens to the broader NMU population after the pilot proves the model.

---

## App Distribution — Action Required

### iOS
- Apple Developer account: ✅ Active
- **Alpha path: TestFlight** — invite up to 100 external testers via email link. No App Store listing needed.
- **Action:** Create TestFlight build and generate invite links before the PE trip.

### Android
- Google Play Developer account: ❌ Not yet registered
- **Alpha path: APK sideload** — share `.apk` directly via WhatsApp. Students enable "Install from unknown sources" once.
- **Action:** Register Google Play account ($25 USD one-time fee) now — needed for Beta/public launch. APK sideload is acceptable for Alpha.

---

## Vendor Trust Strategy

Vendors are reluctant for three specific reasons identified from direct conversations:

### Fear 1: They don't know us personally
**Response:** Physical presence. Lutho and Blessing arriving in person and spending time at their stall is worth more than any pitch deck. The "Founding Collaborator" frame makes them partners, not customers.

### Fear 2: They've never heard of uTap
**Response:** Send the "Where's My Money" one-pager *before* the trip. Let them read it in their own time. Credibility is built before we arrive.

### Fear 3: This involves their money
**Response:** Live Money Flow Demo — show the Yoco dashboard, the payout request button, and exactly where the money sits. On a real device, in front of them. Not a slide deck.

### Founding Collaborator Perks
- 8% uTap commission waived for 6 months (Founding Collaborators only)
- Direct WhatsApp line to founders — no support tickets
- Physical Founding Collaborator certificate
- Priority placement in uShop listing at NMU
- Free menu photography during the PE visit

---

## Stage Checklist

### Stage 1: Internal Testing ✅ Complete
- [x] NFC card scanning tested across multiple card types
- [x] uShop ordering flow tested end-to-end
- [x] Onboarding screen refactored
- [x] Builds passing on Android and iOS
- [ ] TestFlight build created and invite links generated
- [ ] APK build created for Android sideload

### Stage 2: Pre-Trip Vendor Outreach (2 weeks before PE)
- [ ] Contact NMU vendor WhatsApp group via standin/master contact
- [ ] Identify 5–10 interested vendors and schedule meetings
- [ ] Share "Where's My Money" one-pager with each vendor before arrival
- [ ] Confirm SIMA/NMU lecturer contact and schedule class talk slot(s)
- [ ] Print QR code flyers (A6 — cheap)
- [ ] Print Founding Collaborator certificates

### Stage 3: PE Trip — Vendor Onboarding (Days 1–3)
- [ ] Day 1: Discovery conversations — listen, don't pitch
- [ ] Day 1: Live Money Flow Demo with each vendor
- [ ] Day 2: Hands-on store setup + live test order from vendor's own phone
- [ ] Day 3: Shadow vendor during busy period
- [ ] Day 3: Set up every vendor in Founding Vendor WhatsApp group
- [ ] Day 3: Hand over Founding Collaborator certificate
- [ ] Confirm every vendor has processed one successful test order before student recruitment

### Stage 4: PE Trip — Student Alpha Recruitment (Days 2–4)
- [ ] Class talk(s) via SIMA/NMU contact — hook: "100 alpha testers needed"
- [ ] Lead with the card: "Your student card lives on your phone"
- [ ] Distribute TestFlight links (iOS) and APK download link (Android)
- [ ] Walk first students through NFC scan live in the room
- [ ] Add students to Alpha Student WhatsApp group
- [ ] Deploy QR code flyers at all live vendor counters
- [ ] Stop at 100 students — disable signup code

### Stage 5: Remote Pilot (Weeks 2–6 from Joburg)
- [ ] Daily end-of-day check-in to Founding Vendor WhatsApp group
- [ ] Monitor Sentry logs daily — fix critical bugs within 24 hours
- [ ] Same-day responses to Alpha Student WhatsApp group
- [ ] Week 2: Confirm every vendor received first payout correctly
- [ ] Week 2: Interview 5 alpha students — what worked, what didn't
- [ ] Week 3: Fix top 3 friction points
- [ ] Week 4: Review metrics dashboard
- [ ] Week 6: Draft NMU Alpha case study

---

## Vendor Pitch Script

> "We're launching a campus ordering app at NMU. We're selecting 10 vendors to be Founding Collaborators — meaning you help us build it, and in exchange we waive our commission entirely for the first 6 months. It takes 15 minutes to set up. Students pay you the full menu price and collect with a pickup code. We'll be here all week to set everything up with you personally. Want to be one of the first?"

**Do not say "zero commission" as a general uTap feature.** The standard rate is 8%. The waiver is the Founding Collaborator reward only.

---

## Student Recruitment Script

> "We're building a campus app at NMU. We need 100 alpha testers to help us break it before the full launch. Your student card lives on your phone — tap in at the gate, order your lunch from here, collect it with a code. You get a permanent Founding Student badge. Who's in?"

---

## Remote Support Model

**Owner from Joburg:** Aya (daily monitoring, bug triage, vendor support)
**PE relationship owners:** Lutho and Blessing

**Vendor support:**
- Daily check-in message to Founding Vendor WhatsApp group
- Pre-recorded 30-second video snippets (recorded during PE trip): accepting an order, checking earnings, requesting a payout
- Pickup code failure protocol: vendor gives the food, messages the group, team manually verifies and ensures payout
- Payout Week 1: team personally confirms every founding vendor received their first correct payout

**Student support:**
- Alpha Student WhatsApp group monitored daily
- Google Form for structured bug reports (pinned in the group)
- NFC scan failure: direct response within 2 hours during business hours

**Escalation:**
- Critical (no orders, payout failure, crash): same-day fix
- Non-critical (UI glitch, slow loading): batched into weekly builds

---

## Success Metrics

| Metric | Week 1 | Week 4 | Week 8 |
|---|---|---|---|
| Student installs (Alpha cap) | 100 | 100 | 300+ (Beta opens) |
| Active vendors on uShop | 5 | 5 | 8 |
| Orders processed | 50 | 300 | 1,000+ |
| NFC card scans | 80 | 80 | 250 |
| Founding Vendor retention | 5/5 | 5/5 | 5/5 |
| First payout received (all vendors) | — | ✓ | ✓ |
| Campus #2 waitlist registrations | — | 10 | 50+ |

**Retention is the metric — not installs. A vendor who stops trading after Week 1 is a failed Alpha regardless of student install count.**

---

## Open Questions — Needs Owner

| Question | Owner |
|---|---|
| Who owns the SIMA/NMU lecturer relationship? | Lutho |
| Who owns the vendor WhatsApp group contact? | Lutho |
| Who registers Google Play Developer account? | TBD |
| Who creates TestFlight build and invite links? | TBD |
| Who prints QR flyers and certificates before the trip? | TBD |
| Who owns remote support from Joburg? | TBD |
| What is the realistic trip date? | All three |

---

## Key Messaging Rule

**Student = card first.** "Your student card lives on your phone."
**Vendor = commission waiver first.** "You keep everything for the first 6 months."

Never mix the two audiences' messages.
