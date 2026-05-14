# uTap NMU Pilot Launch Strategy

*Created: May 2026*
*Launch: Nelson Mandela University (NMU) — Pilot Phase*
*Framework: ORB (Owned → Rented → Borrowed) + 5-Phase Launch*

---

## Launch Context

**What we're launching:** uTap v1 at NMU — the first live campus deployment of the NFC wallet + uShop ordering + uGig event access.

**Current state:** Pre-launch. Product is built. NMU campus is the first live deployment. Vendors need to be onboarded. Students need to download.

**What success looks like at NMU:**
- 500+ active student installs in the first 60 days
- 5+ active campus vendors live on uShop
- Enough real usage data (orders, taps, sessions) to generate a case study for the next campus pitch

**Launch type:** Phase 4 (Early Access / Controlled Campus Launch) → Phase 5 (Full NMU Launch + multi-campus expansion campaign)

---

## 5-Phase Launch Roadmap

### Phase 1: Internal — Complete ✅

Student card scanning works. uShop ordering works. NFC tap access works. Internal team tested. Bugs from onboarding flow resolved (see `OnboardingScreen.js` refactor).

---

### Phase 2: Alpha — Vendor Seeding (Weeks 1–2)

**Goal:** Get 5 vendors live and generating real orders before opening to students at scale.

**Actions:**
- [ ] Personally onboard 5 NMU campus vendors — walk through 15-minute store setup
- [ ] Give each vendor a printed "your store is live" card with their uShop URL and QR code
- [ ] Test pickup code flow end-to-end with each vendor
- [ ] Identify the vendor with the highest student foot traffic — make them Vendor #1 in the app
- [ ] Photograph each vendor's store (for app listings and marketing assets)

**Vendor acquisition script (in-person):**
> "We're launching a campus ordering app at NMU. It takes 15 minutes to set up. You list for free. We don't take a commission. Students pay you the menu price and collect with a code. Want to try it before we open to all students?"

**Target vendor types:**
1. Most popular lunch spot on campus
2. Coffee / drinks vendor
3. Snacks / tuckshop
4. Evening food vendor (for after-hours coverage)
5. Anything unique to NMU campus

---

### Phase 3: Beta — Student Seeding (Weeks 2–3)

**Goal:** 50–100 students using the app before any public announcement.

**Actions:**
- [ ] Recruit 50 students directly — res halls, SRC contacts, class reps
- [ ] Offer the first 100 students a small incentive: "First order free" voucher via the vendor (coordinate with vendor to absorb or refund)
- [ ] Ask each beta student to send feedback via a simple WhatsApp message or Google Form
- [ ] Watch for onboarding drop-offs — where do students bail on the NFC scan?
- [ ] Fix anything critical before the wider launch

**Beta recruitment channels:**
- SRC (Student Representative Council) — they have group chats with thousands of students
- Facebook groups: NMU students buy-and-sell groups, res groups, class groups
- WhatsApp broadcast from any friendly lecturer or TA willing to share

**Beta ask:**
> "We're testing a new campus app at NMU before we fully launch. Download uTap, scan your card, place one order from [Vendor Name], and tell us if anything went wrong. First order's on us."

---

### Phase 4: Early Access Launch — Campus Wide (Week 3–4)

**Goal:** 200–300 installs. Vendors processing real orders daily. First real usage metrics.

**The early access hook:** First 500 students who register get a "Founding Student" badge in the app (permanent, displayed on their profile). Creates FOMO + social proof + bragging rights without costing anything.

**Launch assets to prepare:**
- [ ] Hero screenshot of the NFC tap flow
- [ ] Screenshot of uShop with real NMU vendors
- [ ] 15-second screen recording: open app → tap campus gate → order lunch → collect with code
- [ ] Student testimonial quote (from beta users) — even one real quote beats nothing
- [ ] Vendor quote: "I set it up in 15 minutes and I keep my full margin"

**Activation on campus:**

**Physical:**
- [ ] Posters in every res block common room — QR code to App Store / Google Play
- [ ] Table tents at every vendor who's live on uShop: "Order ahead on uTap — skip the queue"
- [ ] Sticker on every campus food vendor counter: "Available on uTap"
- [ ] Card drop at SRC events and orientation-adjacent moments

**Digital:**
- [ ] NMU student Facebook group post (via SRC or direct)
- [ ] WhatsApp broadcast to all beta users asking them to share
- [ ] Post to r/NMU or any NMU-adjacent Reddit/Discord

**Content:**
- [ ] Blog post: "uTap is live at NMU" (announcement post on utaptech.co.za/blog)
- [ ] X thread: the launch story from founder POV
- [ ] LinkedIn post: NMU pilot launch — what we're testing and why

---

### Phase 5: Full NMU Launch + Multi-Campus Expansion Announcement (Week 6–8)

**Goal:** 500+ active installs. Vendor case study drafted. Multi-campus waitlist open.

**Actions:**
- [ ] Publish the NMU case study: "X students. Y vendors. Z orders in 6 weeks."
- [ ] Open the multi-campus waitlist publicly: "Which campus is next? Vote / register."
- [ ] Launch the vendor self-serve signup page publicly (vendors.utaptech.co.za)
- [ ] Press release to SA tech media: TechCentral, Ventureburn, BusinessTech, ITWeb
- [ ] Student media pitch: NMU's own student newspaper/radio, Varsity Tribune

---

## ORB Channel Plan

### Owned Channels

| Channel | Role | Actions |
|---|---|---|
| Email list (cheat sheet leads) | Nurture → convert to installs | 5-email launch sequence (see email plan below) |
| Blog (utaptech.co.za/blog) | Launch announcement + SEO | "uTap is live at NMU" post + NMU pilot results post |
| In-app push (post-install) | Onboarding + vendor discovery | Day 1, Day 3, Day 7 push messages |
| WhatsApp broadcast | Beta → wider student push | Campus-native, high open rate |

---

### Rented Channels

| Channel | Audience | Content | Frequency |
|---|---|---|---|
| X / Twitter | SA tech + students | Thread: NMU launch story | Launch day + weekly |
| LinkedIn | Vendors + university admins + press | Case study teaser + B2B angle | 3x/week |
| Facebook (NMU groups) | NMU students directly | App download post + vendor spotlight | Launch week |
| App Store / Google Play | Search traffic | ASO-optimised listing | Ongoing |

**Algorithm rule:** No external links in LinkedIn post body — put the app link in comments.

---

### Borrowed Channels

| Partner | What they get | What we get | Priority |
|---|---|---|---|
| NMU SRC | Credit for bringing campus innovation | Student group access, co-post | 🔴 Critical |
| NMU student newspaper / Varsity Radio | Exclusive "first on campus" story | Credibility + student reach | 🔴 Critical |
| Popular NMU student content creators (Instagram/TikTok) | Free Premium access + "launch partner" credit | Authentic campus content | 🟠 High |
| SA student-adjacent tech YouTubers | Free access, early briefing | Video reach + credibility | 🟡 Medium |
| NMU Faculty / SRC-affiliated lecturers | None needed — just inform | WhatsApp class group share | 🟡 Medium |
| SA startup press (TechCentral, Ventureburn) | Exclusive story angle | Press coverage + backlinks | 🟠 High |

**Borrowed channel pitch framework:**
> "We're launching at NMU — a campus app that puts your student card on your phone and lets you order campus food without delivery fees. We're looking for [an exclusive story / a campus partner / a creator who wants to share something actually useful with their audience]. We can offer [exclusive first access / founder interview / free Premium for your audience]."

---

## Launch Email Sequence (for cheat sheet leads)

*Triggered for anyone who downloaded the Campus Ordering Cheat Sheet.*
*Goal: convert email subscribers to app installs.*

**Email 1 — Immediate (already live):** Cheat sheet delivery
> Subject: "Your Campus Ordering Cheat Sheet is here"
> Body: Delivers the PDF. One CTA: download uTap.

**Email 2 — Day 3:**
> Subject: "Did you know the café near you takes uTap orders?"
> Body: "Quick one — we're now live at NMU. If you're at NMU, here's how to skip the lunch queue: [download link]. If you're at another campus, [register for early access]."

**Email 3 — Day 7:**
> Subject: "What a R100 campus meal actually costs (the maths)"
> Body: The fee breakdown from the blog post, in email format. CTA: "Order without the fee — download uTap."

**Email 4 — Day 14:**
> Subject: "The first 500 NMU students get a Founding Student badge"
> Body: Introduce the Founding Student status. FOMO hook. CTA: "Get your badge before it's gone."

**Email 5 — Day 21:**
> Subject: "One more thing before we close early access"
> Body: Final nudge. Social proof from any early users. CTA: Download + optional: "Tell us which campus you're at" (data collection for expansion).

---

## Launch Day Checklist

### T-7 Days
- [ ] All 5 NMU vendors are live and have tested at least one order
- [ ] Beta student group has confirmed app works
- [ ] Founding Student badge is implemented in-app
- [ ] App Store + Google Play listings are updated with NMU-specific screenshots
- [ ] Launch blog post is written and scheduled
- [ ] Physical launch materials (posters, table tents, stickers) are printed
- [ ] SRC intro call done — they're briefed and ready to co-post

### T-1 Day
- [ ] Schedule all social posts for launch day
- [ ] Stage email to cheat sheet list (Email 2)
- [ ] Final app build tested on Android + iOS
- [ ] Vendor WhatsApp group briefed: "Tomorrow we announce. Expect more orders."
- [ ] Press release sent to SA tech media (embargo: launch day morning)

### Launch Day (call it Day 0)
- [ ] 07:00 — Blog post goes live: "uTap is live at NMU"
- [ ] 07:30 — X thread from founder account
- [ ] 08:00 — LinkedIn post (link in comments)
- [ ] 08:30 — SRC posts to NMU student groups (Facebook + WhatsApp)
- [ ] 09:00 — Email to cheat sheet list (Email 2)
- [ ] 10:00 — Physical posters go up on campus
- [ ] 12:00 — Table tents placed at all 5 live vendors
- [ ] All day — Respond to every comment, DM, and message personally
- [ ] 18:00 — Recap tweet: "Day 1 is live. Here's what's happening"

### T+7 Days
- [ ] Review install numbers — how many in first week?
- [ ] Interview 5 students who used it: what worked, what didn't?
- [ ] Fix top 3 most-reported friction points
- [ ] Send Email 3 to cheat sheet list
- [ ] Post "Week 1" update on X and LinkedIn

### T+30 Days
- [ ] Draft NMU pilot case study (even partial data is publishable)
- [ ] Send Email 4 (Founding Student FOMO push)
- [ ] Begin pitching Campus #2 using NMU data

---

## Metrics to Track

| Metric | Week 1 Target | Week 4 Target | Week 8 Target |
|---|---|---|---|
| Student installs | 100 | 300 | 500+ |
| Active vendors on uShop | 3 | 5 | 8 |
| Orders processed | 50 | 300 | 1,000+ |
| NFC card scans | 80 | 250 | 450 |
| Email → install conversion | — | 15% | 20% |
| Campus #2 interest (waitlist) | — | 10 | 50+ |

---

## Press Release Template

```
FOR IMMEDIATE RELEASE

uTap Launches at Nelson Mandela University: Campus Digital Wallet 
Replaces Physical Student Card and Eliminates Delivery Fees

PORT ELIZABETH, [DATE] — uTap, a South African campus super-app, 
today launched at Nelson Mandela University (NMU), enabling students 
to carry their student card on their phone and order from campus vendors 
without delivery fees or platform markups.

The app uses NFC technology to scan and digitise existing MIFARE student 
cards — the standard used by most South African universities. Once scanned, 
students tap their phone at campus access points exactly as they would their 
physical card.

uTap's campus marketplace (uShop) lets students browse NMU campus vendors, 
order ahead, and collect with a pickup code — paying the exact menu price 
with no delivery fees or service charges.

"Campus food vendors are paying 25–35% commission on orders where the 
student is 200 metres away," said [Founder Name], founder of uTap. 
"We built a pickup-first model that removes the driver, removes the fee, 
and lets vendors keep their margins."

For NMU vendors, uTap charges zero transaction commission. Vendors list 
for free and keep approximately 97% of each order after standard payment 
processing fees.

uTap is available free on the App Store and Google Play for NMU students. 
Vendor registration is open at vendors.utaptech.co.za.

About uTap: uTap is a South African campus digital wallet that puts 
student card access, food ordering, and event discovery on one phone. 
Founded in [year]. Contact: hello@utaptech.co.za | utaptech.co.za

###
Media contact: hello@utaptech.co.za
```

---

## What Makes This Launch Different

Most app launches on campus fail for one reason: cold download problem. Students have no reason to download yet another app.

uTap avoids this because the student card is the hook — not a feature. Every student needs their card to exist on campus. Once they scan it into uTap, the ordering and events features are already there. There's no extra behaviour change required.

The launch strategy reflects this: lead with the card, not the food ordering. "Your student card lives on your phone" is simpler, more urgent, and more differentiating than "order campus food without fees" — even though both are true.

The fee message is the vendor acquisition story. The card message is the student acquisition story. Keep them separate.
