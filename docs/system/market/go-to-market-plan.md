# uTap Go-to-Market Plan

How we get the positioning out of these docs and into the hands of South African students and campus vendors.

This is a **living plan**. Review it quarterly. Don't run a campaign that contradicts a section here without updating it first.

---

## 1. Strategic principles

1. **Campus by campus, not country-wide.** Treat each campus as a self-contained market. Saturate one before opening the next.
2. **Two-sided launches.** Students and vendors need each other. Don't open one side without minimum critical mass on the other.
3. **Pickup-first messaging.** Never let the brand drift into "delivery app" framing.
4. **Authentic before clever.** Real student names, real campuses, real prices — not stock imagery.
5. **One CTA per surface.** Each piece of marketing routes to *one* action: download the app, open a store, or get in touch.

---

## 2. Two parallel funnels

### Student funnel

| Stage | Goal | How |
|-------|------|-----|
| Awareness | "What's uTap?" | Social ads, posters at orientation, friend referrals |
| Curiosity | First app open | Hero on website, App Store / Play Store listing |
| Signup | Account created | Friction-free onboarding |
| First scan | Card on phone | NFC priming + happy-path tutorial |
| First order | Money moved | First-order discount + warm push reminders |
| Habit | 3+ orders / month | Order-again push, weekly digest |
| Advocacy | Referrals & social posts | Referral codes, shareable receipts |

### Vendor funnel

| Stage | Goal | How |
|-------|------|-----|
| Awareness | "There are students nearby ordering" | Walk-ins, sales calls, referrals from existing vendors |
| Curiosity | Visit `/vendors` | Vendor landing page + case studies |
| Application | Signup started | Self-serve onboarding + sales call follow-up |
| Onboarded | Store live with products | Onboarding sequence + first-week check-in |
| First order | Money received | Push + email celebrating it |
| Habit | Daily orders | Weekly digest, monthly statement |
| Advocacy | Refer another vendor | Vendor-to-vendor referral programme |

Every funnel stage has a copy moment defined in the per-app copy specs or the notifications doc. The GTM plan is what triggers each moment.

---

## 3. The campus rollout playbook

When opening a new campus, follow this pattern.

### Two weeks before launch

- Sign 5+ anchor vendors near the busiest student paths (a café, a tuck shop, a bookshop, a stationery shop, an electronics or sports store).
- Brief vendors. Walk them through the portal. Help them list their first 10 products.
- Order branded materials: counter stickers, table tents, posters for residence common areas.
- Schedule a uTap stand for the busiest week of orientation.
- Get explicit permission from the university to operate on campus (where applicable).

### Launch week

- **Day 1** — Activate the stand. Free coffee from an anchor vendor for the first 50 signups.
- **Day 2** — Push the homepage hero to the new campus banner; turn on geo-targeted ads.
- **Day 3** — Friend referrals open. Students who refer 3 friends get a R 50 voucher.
- **Day 4** — Send an email to anyone who signed up but didn't scan: "Two minutes from scanning."
- **Day 5** — First weekly digest goes out for vendors.
- **Day 7** — Review numbers with the local sales team.

### Two weeks after launch

- Add a second wave of vendors (specialised stores: prints, sports gear, charge cables, snacks).
- Run the first uGig event in partnership with a residence or society.
- Capture first quotes from real students and a real vendor for case studies.

### KPI gates (no fudging)

| Metric | Floor before opening the next campus |
|--------|---------------------------------------|
| Activated students | 30% of estimated reachable student body |
| Orders/day on the campus | 50+ within 30 days |
| Live vendors on the campus | 8+ |
| Vendor retention (>1 order/week) | 70% at 60 days |
| Student NPS / sentiment check | Qualitative — gather and review |

If a campus misses two of these, hold rollout to the next. Fix what's broken first.

---

## 4. Channel plan — students

### 4.1 Organic social

| Channel | What we post | Frequency |
|---------|---------------|-----------|
| Instagram | Stories from campus, real students, vendor highlights | Daily during launch month, 3x/week after |
| TikTok | Hook-driven shorts ("POV: you forgot your student card"), vendor cameos | 3x/week |
| WhatsApp Status / broadcast (opt-in) | New vendor alerts, voucher drops | 1x/week max |
| Twitter / X | Lighter brand voice, campus tweets | 2x/week |

Voice for organic: the brand voice (see [`voice-guidelines.md`](voice-guidelines.md)) but slightly warmer, more student-vernacular.

### 4.2 Paid

| Channel | Use | Notes |
|---------|-----|-------|
| Instagram + Facebook | Awareness + signup | Target student-age, geo-fence the campus |
| TikTok ads | Awareness | Hooks library from [`messaging-architecture.md`](messaging-architecture.md) §7 |
| Google search | Catching intent: "campus food order", "{university} student app" | Conservative budget — keyword volume is low |
| Spotify (premium-free students) | Audio + display | Only during launch weeks |

### 4.3 On-campus

- Posters in residences, libraries, lecture buildings (with university permission).
- Counter stickers at anchor vendors ("Order via uTap").
- Table tents at campus cafés.
- A monthly **campus stand** during high-foot-traffic moments (orientation, exam week, derby week).

### 4.4 Referral

- Each student gets a unique code worth **R 20 off the first order** for them and **R 20 for the referrer**, capped at 5 successful referrals per student.
- Shown in Profile → Refer a friend.
- Push the moment a friend's first order is collected: "Your R 20 voucher is unlocked."

### 4.5 Events

- Sponsored varsity matches: uTap logo at the gate, tickets sold via uGig.
- Society co-ops: society launches use uGig for ticketing; uTap supplies a small float as a launch sponsor when relevant.
- Residence socials: discounted vendor bundles via uShop during the week of the social.

---

## 5. Channel plan — vendors

### 5.1 Direct sales

- A small sales team handles vendor onboarding for the first year.
- Sales kit: a printed one-pager (PDF version: same content as the vendor hero), a portal demo on a laptop or tablet, a price-breakdown sheet (synced from the live `finance_settings`).
- Reps visit a campus's anchor vendors first, then second-tier shops.

### 5.2 Referral

- Vendors who refer another vendor get **R 200 credit** when the new vendor reaches their first 10 orders.
- Tracked in the vendor portal under Finance → Credits.

### 5.3 Email

| Email | Audience |
|-------|----------|
| Cold intro | New campus pre-launch |
| Application reminder (24h after starting signup) | Half-signed-up vendors |
| Approval celebration | Approved vendors |
| First-week tips | Newly live vendors |
| Monthly newsletter | All live vendors |

Tone for vendor emails: the calm vendor portal tone (see [`utap-vendors-audience.md`](utap-vendors-audience.md)).

### 5.4 In-portal moments

- The vendor sees a real-time "Students on your campus right now" counter on day one. Never fabricate it — wire it to actual session data.
- After their 10th order, a celebration banner: "10 orders. You're on your way."
- A monthly statement email is the calendar's most reliable touchpoint.

---

## 6. Brand campaigns (yearly themes)

| Quarter | Theme | Hooks |
|---------|-------|-------|
| Q1 (Jan–Mar) | **First year, sorted.** | Orientation week, getting the card on the phone, first uShop order. |
| Q2 (Apr–Jun) | **Game season.** | uGig front and centre — varsity rugby, intervarsity events. |
| Q3 (Jul–Sep) | **Exam week.** | uShop for late-night snacks, coffee runs, study fuel. |
| Q4 (Oct–Dec) | **Graduation and goodbye.** | uShop for graduation gear, alumni access for saved tickets. |

Each quarter has one **flagship campaign** and a handful of supporting pushes. Quarterly campaigns get their own brief, signed off by Marketing + Founder.

---

## 7. Press and PR

### Always-on press readiness

- Boilerplate ready (see [`utap-website-copy.md`](utap-website-copy.md) §11).
- Founder bios up to date.
- Press kit (logos, screenshots, fact sheet).
- A list of journalists who cover SA student/edtech/fintech, refreshed quarterly.

### Newsworthy moments

| Moment | Beat |
|--------|------|
| Launch on a new campus | Local + tech |
| Partnership with a university | Higher-ed + tech |
| Milestones (10k students, 1M orders) | Tech + business |
| Founder profile pieces | Business + lifestyle |
| Product launches (new module) | Tech |
| Industry talks (SA fintech, student life) | Industry press |

We don't issue press releases without a real story. Empty press releases damage credibility.

---

## 8. Partnerships

| Partner type | What we ask | What we offer |
|--------------|-------------|----------------|
| Universities | Permission to operate, comms slot in student newsletter | Card-on-phone benefit, lower lost-card admin |
| Sponsors (banks, telcos) | Co-branded campus campaigns | Co-marketing reach to engaged students |
| Sports clubs | Ticketing via uGig | Better attendance tracking, faster gate scans |
| Societies | uGig ticketing | Easier ticket sales, dashboards |
| Government / student bodies | Awareness around safety, identity | A credible South African product |

Partnership comms have their own tone — slightly more formal than the brand voice, but never stuffy.

---

## 9. Measurement (the ones that matter)

Vanity numbers we ignore:

- App store ranking by itself.
- Total signups without activation.
- Impressions.

Numbers we actually watch:

| Metric | Why |
|--------|-----|
| **Activated students** | Signups who completed first NFC scan or first order |
| **Orders/day per campus** | Real demand |
| **Repeat-order rate (30 days)** | Habit formation |
| **Average order value** | Margin |
| **Vendor live-rate** | Approved vendors who actually go live |
| **Vendor retention (60-day)** | Whether vendors stick |
| **Refund rate** | Trust |
| **NFC scan success rate** | Product readiness |
| **Push opt-in rate** | We're not annoying |
| **Net promoter signal (qualitative)** | Word of mouth |

We instrument these from the existing Supabase data plus app analytics. We do not invent them for fundraising.

---

## 10. The 12-month roadmap (high level)

### Months 1–3 — **Anchor campus**

- Pick one campus where the team has the best presence.
- Sign 10 vendors. Activate 500 students.
- Validate the order flow, NFC scan rate, refund rate.
- Capture real testimonials.

### Months 4–6 — **Second and third campus**

- Repeat the anchor playbook. Two campuses opened, not three.
- Build the vendor referral programme.
- Begin uGig with a high-visibility derby weekend on one campus.

### Months 7–9 — **Programmatic vendor acquisition**

- Standardise the vendor pitch and demo.
- Lower cost per vendor signup with a small inbound funnel.
- Two more campuses opened.

### Months 10–12 — **Brand consolidation**

- First brand campaign across all live campuses.
- First press milestone (10k students or 100k orders, whichever lands first).
- First partnership announcement with a university or major vendor chain.

We do not chase a "country-wide" milestone in year one. Depth beats breadth.

---

## 11. Budget shape (illustrative percentages)

Allocate within whatever total budget Marketing gets:

| Bucket | % of marketing spend |
|--------|----------------------|
| Vendor acquisition (sales team, materials, referrals) | 30% |
| Student paid acquisition (Meta, TikTok, Google) | 25% |
| On-campus presence (posters, stands, sponsorships) | 20% |
| Content and creative (shoot days, social content) | 10% |
| Referral payouts | 10% |
| Press and PR | 5% |

Adjust quarterly based on what's actually working.

---

## 12. Anti-patterns (don't do)

- **Paid ads before the campus has stores.** Drives empty signups.
- **Influencer campaigns with non-students.** Cuts the authenticity we've built.
- **"Launch on every campus by Q4"** ambition. Quality of activation beats coverage.
- **Buying email lists.** Ever.
- **Vague stats in PR.** Either we have the number or we don't say it.
- **Promotions that the vendor finds out about second-hand.** Always loop them in first.
- **Cute taglines that don't tell the audience what we do.**

---

## 13. Crisis comms (one page)

If something goes wrong publicly (data, payments, refunds at scale):

1. **Acknowledge within 1 hour** on the homepage banner and on social.
2. **Plain language only.** Tell people what happened in their own words.
3. **Tell them what they need to do**, if anything.
4. **Commit to a follow-up time.** "We'll update by 5pm."
5. **Follow up on time, every time.**

The crisis voice is the brand voice — calm, honest, useful — turned up on honesty, turned down on warmth.

---

## 14. Review cadence

| Doc / plan | Review |
|------------|--------|
| This file | Quarterly |
| Per-campus playbook | After each launch |
| Channel performance | Monthly |
| Vendor activation report | Weekly |
| Notification frequency check | Monthly |
| Voice and brand sweeps | Twice a year |

If the market shifts (new competitor, new partner, new region), update the doc the same week — not at the next quarterly review.

---

## 15. Who runs what

| Lane | Owner |
|------|-------|
| Brand voice and creative | Marketing lead |
| Vendor acquisition | Head of sales (or Marketing if combined) |
| Lifecycle (push, email, in-app inbox) | Lifecycle / CRM lead |
| Performance ads | Marketing or external agency |
| Partnerships | Founder + Marketing |
| Press | Marketing + Founder |
| Crisis comms | Founder + Marketing + Engineering on call |
| Copy doc maintenance | Marketing + Product owners per surface |
