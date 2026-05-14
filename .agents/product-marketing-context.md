# Product Marketing Context

*Last updated: 2026-05-14*

---

## Product Overview

**One-liner:** uTap is the campus digital wallet that puts your student card, campus orders, and event tickets on your phone — one tap away.

**What it does:** uTap lets South African university students scan their physical student card once, then carry it digitally. From the same app they browse and order from real campus vendors (uShop), discover sports and campus events (uGig — paid feature), manage tickets, and track orders with pickup codes — all backed by Yoco-powered checkout and Supabase-synced cloud backup.

**Product category:** Campus super-app / student digital wallet / campus commerce platform

**Product type:** Mobile app (React Native / Expo) for students + web dashboard (React / Vite) for vendors + admin console for operators

**Business model:**
- **Students:** Free core app (wallet + uShop); freemium upsells (uGig access, extra NFC card slots, multi-device, university change, Apple perks, verified badge)
- **Vendors:** Free to list (1 store); 8% commission per paid order + Yoco fee (2.95% + VAT); paid subscription tiers unlock growth tools (extra stores, analytics, promoted placements)
- **B2B (long-term engine):** Businesses (banks, retailers, gyms, transport, event organisers, brands) pay for verified student access, precision-targeted advertising (by faculty + year level + university), and aggregated student insights packages
- **Payouts:** Auto on the 28th of each month; vendors can request anytime (R 50 minimum)

---

## Target Audience

**Students (primary users):**
- South African university students
- Any year level, any faculty
- Mobile-native; already carry a physical student card they sometimes lose or forget
- Use campus food vendors, attend campus events, navigate access control daily

**Vendors (paying customers — wedge):**
- Campus or near-campus food stalls, coffee shops, bookstores, gear shops, event organisers
- Small-to-medium operators; many already on Yoco
- Currently paying 25–35% commission to Mr D / Uber Eats, or managing orders manually via WhatsApp

**Universities (partnership / distribution channel):**
- Institutional partners who benefit from reduced plastic card loss, faster access control, and verified campus commerce
- Contact: partners@utap.co.za

**B2B / Advertisers (long-term revenue engine):**
- Banks, retailers, gyms, transport companies, event organisers, brands
- Want verified, segmented access to student populations (faculty + year + university)

---

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Student | Convenience, not losing their card, not being overcharged | Card is back at res; food queue is long; tickets get lost | "Your student card lives on your phone now. Tap in, order up, show up." |
| Campus vendor | Margins, predictable cash flow, less queue management | Paying 25–35% commission to delivery apps; orders are messy | Free to list. Small commission. Predictable payouts. One inbox. |
| University partnerships lead | Student experience, data privacy, operational efficiency | Plastic card loss, replacement costs, long queues at readers | Less plastic. Faster turnstiles. Verified campus-only vendors. |
| B2B / Brand | Reaching students with precision, ROI on campus marketing | Generic ads don't convert; no verified student segments available | Verified student access by faculty, year, and university |

---

## Problems & Pain Points

**Core student problem:** Physical student cards get lost, forgotten, and are a single point of failure for campus access, food orders, and events. There is no single app that handles all three in one place.

**Core vendor problem:** Existing delivery platforms (Mr D, Uber Eats) charge 25–35% per order, destroying margins. Campus vendors don't have an accessible, affordable, campus-native ordering channel.

**Why alternatives fall short:**
- Mr D / Uber Eats: 25–35% commission, not campus-specific, no student identity layer
- Generic card apps: No campus commerce integration
- University-built portals: Clunky, students don't open them, not mobile-first
- Manual ordering (WhatsApp, walk-up): No pickup codes, no order management, no analytics

**What it costs them (vendor):** A vendor making R 100 per order loses R 27–35 to commission on legacy platforms — uTap takes 8% + Yoco's 2.95%, leaving ~R 89 net vs R 65–73 elsewhere.

**Emotional tension (student):** "I forgot my card and missed an exam." Lost card = admin queues, replacement fees, disrupted day. Campus food ordering is still walk-up or WhatsApp chaos.

---

## Competitive Landscape

**Direct competitors:**
- Generic NFC wallet apps — no campus commerce, no student identity, not South Africa–aware
- University-built apps — closed ecosystems, poor UX, students don't open them

**Secondary competitors (same problem, different solution):**
- Mr D Food / Uber Eats — solve campus ordering but at 25–35% commission, no student card integration, not campus-specific
- Eezipay — campus payment adjacent, but not a full wallet + commerce + events layer

**Indirect competitors:**
- Physical card status quo — "I'll just carry my card" (habit force)
- WhatsApp ordering — vendors take orders via WhatsApp group chats; zero infrastructure

**How each falls short:**
- Mr D/Uber Eats: Punishing commission, not campus-native, no NFC wallet
- University portals: Not maintained, no vendor marketplace, bad mobile UX
- Status quo: Card loss, replacement costs, friction at every touchpoint

---

## Differentiation

**Key differentiators:**
- Real NFC / MIFARE card scanning — not a demo; it IS the student card
- Campus-only vendor marketplace — no random dropshippers, only campus-affiliated stores
- 8% commission vs 25–35% on delivery platforms — vendors keep dramatically more margin
- Three features in one app: wallet + marketplace + events/tickets
- Feature policy governance — universities can enable/disable features per campus for safe pilots
- South Africa–built: ZAR pricing, Yoco-native, local university norms, SA cellphone identity patterns

**How we do it differently:** We replace the physical card entirely (not supplement it), then layer campus commerce and events on top of an identity students already trust.

**Why that's better:** Students don't need to adopt a new behaviour — the card is the hook. Once in the wallet, ordering and tickets are one tap away. Vendors get a motivated, captive audience paying full price (no delivery fee inflation).

**Why customers choose us:**
- Students: "My card is always on my phone — I can't lose it."
- Vendors: "I keep my margins and get a pickup-friendly order flow."
- Universities: "Students actually open it."

---

## Objections

| Objection | Response |
|-----------|----------|
| "Does my university card actually work?" | If your university uses a supported card standard, yes. We're growing the list — check the help centre or try a scan. |
| "What does it cost me as a student?" | Nothing. Downloading uTap is free. You pay for what you order, nothing more. (uGig is a paid extra.) |
| "We're not ready to switch platforms as a vendor." | Free to list. One store at no cost. You only pay a small commission when you make a sale — no upfront risk. |
| "What about our student data?" | Card credentials are encrypted on device. Universities get only aggregated, anonymised reporting. We don't sell student data. |
| "Is it live at my campus?" | Pilot launching at Nelson Mandela University. Leave your details and we'll notify when your campus is next. |

**Anti-persona:**
- Vendors outside South Africa (not supported yet)
- Students at universities without supported NFC card standards (for the wallet; ordering still works)
- Businesses wanting raw individual student data (we offer aggregated/anonymised insights only)

---

## Switching Dynamics

**Push (away from current solutions):**
- Vendor rage at 25–35% commission eating their margins
- Students losing cards and facing admin queues + replacement fees
- WhatsApp order chaos: no tracking, no pickup codes, no analytics

**Pull (toward uTap):**
- "Keep nearly all your money" — 8% vs 30% is transformational for vendor economics
- "Your card can't be lost" — instant cloud restore on new phone
- One app for card + orders + tickets — no context-switching

**Habit (keeps people stuck):**
- Vendors: "My regulars know the WhatsApp number"
- Students: "I usually remember my card"
- Universities: "We have an existing card system contract"

**Anxiety (about switching):**
- "What if students don't adopt the app?" (vendors)
- "Will it actually work at our access control readers?" (universities / students)
- "Is my card data safe on a phone?" (students)

---

## Customer Language

**How students describe the problem:**
- "I left my card in my room again"
- "The queue at the caf is ridiculous"
- "I lost my ticket and they wouldn't let me in"
- "I had to pay R 150 to replace my card"

**How students describe uTap:**
- "It's basically your student card on your phone"
- "You tap in, order your food, and your ticket's already there"

**How vendors describe the problem:**
- "Mr D takes almost a third of every order"
- "I don't even know who ordered what until they're standing in front of me"

**How vendors describe uTap:**
- "I list for free and keep my margin"
- "Orders come in properly — I can actually manage the queue"

**Words to use:**
- Tap, scan, campus, students, vendors, pickup, predictable, margin, friction, wallet, "your phone"
- Honest, straightforward pricing language ("small commission", "every cent on your statement")
- South African: R (not $), "load-shedding", "res", "caf", Yoco

**Words to avoid:**
- "Delivery" (we are pickup-first, not delivery)
- "Sell your data" (anti-promise)
- "Platform fee" without showing the maths
- Overstating Stripe (Yoco is the default audited path)

**Glossary:**
| Term | Meaning |
|------|---------|
| uShop | The campus marketplace tab inside the student app (free) |
| uGig | The sports and campus events discovery tab (paid student feature) |
| NFC | Near Field Communication — how the phone reads the physical student card |
| MIFARE | The card standard used by most SA university cards |
| Yoco | South African payment provider used for vendor checkout and payouts |
| Feature policy | Operator-controlled flags that enable/disable features per campus or user profile |
| EAS | Expo Application Services — build and deployment tooling for the mobile app |
| RLS | Row Level Security — database-level access control for multi-tenant data |

---

---

## Brand Voice (Full Framework)

*Updated May 2026 — replaces the stub above. Apply to all marketing copy, product strings, social, emails, and support docs.*

### Brand Personality

If uTap were a person, they'd be the sharp, resourceful friend who grew up on campus and figured out a better way to do things. They don't oversell. They show you the maths and let you decide. Optimistic without being naive. Confident, but never smug.

> "If our brand were a person, they'd be a final-year student who built something that actually works — clear-eyed, resourceful, and genuinely excited to hand you the keys."

---

### Voice Attributes

**Direct**
- **We are:** Clear, efficient, honest. We say what we mean in as few words as it takes.
- **We are not:** Blunt or cold.
- **Sounds like:** "You pay the menu price. No markup. No delivery fee."
- **Does NOT sound like:** "uTap offers a comprehensive, fee-transparent marketplace ordering experience."

**Grounded**
- **We are:** Specific and evidence-based. We back claims with numbers or concrete examples.
- **We are not:** Boring or overly cautious.
- **Sounds like:** "A R100 meal on Mr D costs up to R185 once you add the fees. On uTap, it costs R100."
- **Does NOT sound like:** "uTap could potentially save students a meaningful amount of money."

**Warm**
- **We are:** Genuinely on the side of students and vendors. We speak to people, not segments.
- **We are not:** Gushing, hollow, or performatively empathetic.
- **Sounds like:** "Orders come in clean. Payouts are on time. Students actually find you."
- **Does NOT sound like:** "We're so passionate about empowering the campus ecosystem to thrive together!"

**Confident but fair**
- **We are:** Clear about where we win; honest about where we don't.
- **We are not:** Arrogant or disparaging of competitors.
- **Sounds like:** "uTap is built for campus life. If you're off campus, Uber Eats is great for that."
- **Does NOT sound like:** "Mr D is a rip-off that destroys small businesses."

---

### Tone Spectrum

| Context | Tone | Example |
|---|---|---|
| Hero copy | Bold, benefit-first | "Stop paying R40 delivery fees on campus." |
| Comparison pages | Confident, fact-based | "Mr D charges up to 35%. We charge zero." |
| Vendor sales | Specific, numbers-first | "On a R100 order, you keep ~R97." |
| Student onboarding | Welcoming, brief | "The core app is always free for students." |
| Error messages | Calm, helpful, never blaming | "Something went wrong on our end. Here's how to fix it." |
| X / Twitter | Punchy, occasionally sharp | "R40 delivery fee to get lunch to your res. Yikes." |
| LinkedIn | Professional, evidence-based | "Why campus vendors are switching from 30% commissions." |
| Email | Personal, one clear action | "Here's what changed and why it helps you." |
| Press / B2B | Factual, specific, no hype | "uTap currently serves X students across Y universities." |
| Support docs | Patient, clear, step-by-step | "If your NFC tap isn't working, try this first." |

---

### Style Rules

| Rule | uTap Standard |
|---|---|
| Oxford comma | **Yes** — "fast, reliable, and free" |
| Heading case | **Sentence case** only |
| Contractions | **Yes** — "you're", "we'll", "it's" |
| Em dash spacing | **No spaces** — "pickup—not delivery" |
| Numbers | **Always numerals for data** — "R100", "8%", "30 seconds" |
| Exclamation marks | **Rare** — max one per piece; never in errors |
| Ellipsis | **Avoid** — use a period or rewrite |
| ALL CAPS | **Never** — use bold for emphasis |
| Emoji | **Social only** — never in product UI or support |
| Percentage symbol | **%** — never "percent" |
| Currency | **R with no space** — "R100", "R89.05" |

---

### Terminology

**Product & Feature Names**

| Use | Avoid | Notes |
|---|---|---|
| uTap | Utap, UTAP, u-tap | Always lowercase "u" |
| uShop | Ushop, U-Shop | Campus marketplace feature |
| uGig | Ugig, U-Gig | Exclusive student events access |
| NFC card / NFC wallet | digital card, card app | NFC is the correct framing |
| Campus vendor | restaurant, merchant, seller | Established internal term |
| Pickup | pick-up, pick up (noun) | One word as noun/modifier |
| Starter plan | free plan, basic plan | Official vendor tier name |
| Growth plan | paid plan, premium vendor | Official vendor growth tier |
| uTap Premium | premium, pro plan | Student premium tier |

**General Preferred Terms**

| Use | Avoid |
|---|---|
| sign up (verb) | signup (verb) |
| log in (verb) | login (verb) |
| set up (verb) | setup (verb) |
| zero commission | no commission, free commission |
| campus vendor | restaurant, cafe |
| straightforward | easy, simple |

**Always Avoid**
- "Revolutionary", "game-changing", "disrupting" — show, don't claim
- "Ecosystem" in student-facing copy
- "Leverage" as a verb
- "Synergy" — always
- "Going forward", "at the end of the day"
- Passive voice in CTAs

**Competitor References**
- Refer to competitors by name when the comparison is factual and fair
- Never mock — let the numbers do the talking
- Our preferred category framing: **"campus-native marketplace"** (not "delivery app alternative")

---

### Brand Decision Filter

Before publishing anything — social post, email, UI string, blog post:

1. **Is it direct?** Could it be said in fewer words?
2. **Is it grounded?** Is there a number or concrete proof point behind it?
3. **Is it warm?** Does it treat the reader like a person, not a segment?
4. **Is it honest?** Would we be comfortable if a competitor read it?

If the answer to any of these is no — rewrite before publishing.

