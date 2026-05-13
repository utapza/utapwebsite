## uTap — market + technical narrative (AI context pack)

### Hook (what uTap is)

**uTap** is a **campus-grade digital wallet and commerce layer** for students: your **NFC (Near Field Communication)** student card becomes something you can **carry, use, and pay with** from your phone—while the same ecosystem gives **vendors** a **web dashboard** to run stores and **operators** an **admin console** to steer the platform. Built for **South African** university life (ZAR pricing patterns, local identity norms, Yoco-friendly checkout flows), uTap is designed to feel **fast, trustworthy, and “finally built for students”**—not bolted on as an afterthought.

---

### Student app (utap-apps) — “these are the pages” + selling lines

**Navigation model:** When you are **not signed in**, you get a focused **auth stack** (login, register, forgot password). When you **are signed in**, you land in **bottom tabs** plus a few **stack screens** for depth (card detail, store menu, checkout, order detail, dedicated NFC scan). If you are in **password recovery** mode, the app narrows to **set new password** until you are done—clean, safe, no distractions.

**Tabs students live in**

1. **Cards (wallet)**  
   - **Sell:** “Your wallet, your campus ID—always with you.”  
   - **Do:** Scroll saved cards, open a card, see **student ID**, **faculty**, **expiry**, optional notes.  
   - **NFC scan:** Add a card by **tapping** (FAB + guided dialog). Device support is checked; users get honest messaging if the phone cannot scan.  
   - **Per-card superpowers:** On **Android**, **emulate** the card for tap scenarios; on **iOS**, **QR code** fallback so you can still **present** credentials where QR is accepted.  
   - **Tech note:** Uses a **custom native MIFARE module** (`@utapza/expo-mifare-scanner`) for low-level card reads; **Expo (React Native framework)** app shell; **React Native Paper** UI; **Supabase** for auth + sync.

2. **Ushop (marketplace)**  
   - **Sell:** “Browse real campus stores—not random dropshippers.”  
   - **Do:** Stores filtered to **your profile university**; **search** that can return **stores and products**; **category** and **campus** filters; **pull to refresh**; **availability chips** so you know if ordering is open; optional **deal badges** on cards; **contact** snippets when vendors publish phone/email/owner.  
   - **Tech note:** Store availability is computed with a dedicated **store availability** service layer so UI and checkout stay aligned with **hours, pause modes, and cutoffs**.

3. **uGig (sports-focused slice)**  
   - **Sell:** “Your sports lane on campus—one tap from the rest of uTap.”  
   - **Do:** Sports-filtered store list, search, refresh, jump into the same rich **store detail** flow as Ushop.  
   - **Gate:** If the profile has **no university**, the app nudges you to **Profile** first—keeps listings meaningful.

4. **Profile**  
   - **Sell:** “This is your campus identity control centre.”  
   - **Do:** Avatar initials, name, email, **university + location**, shortcuts to **Orders** / **Cards** when those tabs are enabled.  
   - **Paid campus switch:** If you **transfer**, you can run a **paid university change** (fee surfaced in UI) via **embedded Yoco checkout**, then profile refreshes so **Ushop and uGig** follow your new campus.  
   - **Tech note:** **Yoco (payment provider)** web checkout in-app via a **WebView** pattern; bridges “mobile UX” with “card-not-present checkout” requirements.

5. **Orders**  
   - **Sell:** “Receipts, pickup codes, and tickets—without email archaeology.”  
   - **Do:** **My Orders** with a **status filter** (all major lifecycle states), rich cards (totals, discount breakdown when promotions applied, **pickup code**, delivery method, wait estimates, payment status, special instructions), **cancel** while **pending**, **view details**.  
   - **My Tickets:** Separate tab; **View ticket** opens **PDF (Portable Document Format)** via the OS browser when available.  
   - **Tech note:** Orders and tickets are backed by services (`orderService`, `ticketService`) over **Supabase**; UI uses **React Navigation** stack for drill-in.

**Stack screens (power user / edge flows)**

- **Store detail:** Hero imagery, category badge, tags, **product search**, **category** and **sort** menus (name, price, “fastest first”), **ordering blocked** banner when the store is not accepting new orders—browse still works so menus stay useful.  
- **Product order:** Quantity within stock, **order notes** and **per-item notes**, **voucher apply**, live promotion validation, **Place order & pay** into **Yoco** checkout, strong error copy for **cutoff / closed / pause** cases.  
- **Add / edit card:** Full manual form with **date picker** for expiry; scanned flows show a highlighted “we parsed NFC data—confirm it” pattern.  
- **Dedicated NFC scan screen:** Registered on the stack for deep workflows (MIFARE listener path on **Android**, read path on **iOS**, debug-style visibility for tricky reads, optional persistence paths)—built for pilots and power users, not a toy demo.

**“Don’t worry—we also support X, Y, Z” (student-facing)**

- **Feature policy (feature flags):** Tabs and NFC behaviours can be **turned on or off** per **build**, **university**, and **user profile**—so pilots can start narrow and widen safely.  
- **Offline-ish resilience patterns:** Refresh controls, loading skeletons, and explicit empty states reduce “is the app broken?” anxiety.  
- **Observability:** **Sentry (error tracking)** is wired into the app lifecycle so production issues are not invisible—students feel stability; engineers get signal.  
- **Payments reality:** The audited **student checkout** path for Ushop orders is **Yoco-centric**; the repo also contains **Stripe (payment platform)** integration scaffolding—position that as “payment rails can extend” without overclaiming what is default in every build profile.

---

### For universities — “this app will do A, B, C for you”

**A — Campus identity and access readiness**  
uTap gives students a **structured digital identity** tied to **university** context: registration captures **university**, **student number**, and **SA cellphone** norms so downstream experiences (store discovery, compliance, support) are anchored to **real campus populations**.

**B — Controlled commerce exposure**  
Store discovery and ordering respect **availability rules** (hours, operational modes, pauses, cutoffs). That means fewer “angry queue” moments where the app happily took money when the kitchen was not—**the product matches operational reality**.

**C — Pilot governance without app store chaos**  
**Feature policy overrides** in **Supabase** plus optional **EAS (Expo Application Services)** build-time gates mean a university can participate in a **measured rollout**: NFC on for engineering campuses, Ushop on for retail pilots, uGig staged for athletics—**without shipping separate apps per campus**.

**University-friendly technical footnote**  
Behind the scenes, **PostgreSQL (relational database)** via **Supabase** holds the canonical truth for profiles, universities, stores, orders, promotions, and finance-adjacent records; **Row Level Security (RLS)** patterns (where applied) are part of the “trust model” story for multi-tenant campus data.

---

### Cut to technical — how uTap is actually engineered (student)

- **Client:** **React Native** + **Expo**, **JavaScript** application code, **React Navigation** for auth vs main routing, **React Context** for auth/cards/feature policy (no heavy global store framework—intentionally straightforward for a mobile product team).  
- **Backend / data:** **Supabase** (hosted **PostgreSQL**, auth, realtime channels where used).  
- **NFC differentiator:** **Native module** for **MIFARE** workflows—this is not “generic NFC demo code”; it is the spine of the student card story on **Android** and **iOS** with pragmatic platform differences (listener patterns, emulation vs QR).  
- **Payments:** **Yoco checkout** creation + return URLs integrate mobile purchase flows with web-return pages on the vendor site for certain outcomes (for example **university change** payment result pages).  
- **Quality:** **Sentry** for crash and error intelligence; **Zod (schema validation library)** for parsing feature policy patches safely; **react-hook-form** ecosystem patterns appear in parts of the stack where forms need rigor.

---

### Vendor web (utap-vendors) — “my friend, are you a vendor?”

**Pitch**  
If you run a **campus outlet**, uTap is how you **show up where students already are**: a **mobile-first uShop** experience inside the student app, with **pickup-friendly** order flows, **promotions** you control, and **earnings transparency** that respects **fees** and **payouts** as first-class concepts—not a spreadsheet afterthought.

**What the vendor web app lets you do (high energy, still factual)**

- **Public presence:** Landing, about, contact—**credibility** and lead capture (contact form can send **transactional email** when configured).  
- **Auth + onboarding:** Login/signup flows plus **vendor setup** that binds **university → campus → store category** so your first store is structurally correct for students.  
- **Dashboard:** **KPI (Key Performance Indicator)** cards, **trend charts**, **quick actions**, **recent orders**, **low stock** warnings—this is the “CEO of your stall” view.  
- **Stores:** Create/edit/delete stores, upload **logos**, set **tags**, manage **active** state, and embed **weekly hours + ordering rules** right in the store form when needed.  
- **Hours & orders:** Dedicated operational console for **timezone**, **operational mode** (open / closing soon / closed / pause new orders), **cutoff buffers**, **pause-until**, and **weekly hour slots**—this is the bridge between “real kitchen hours” and “student phone expectations”.  
- **Products:** Search, filter, sort, paginate; add/edit/delete; **image upload** to **object storage**; **event ticket** toggles; **pending review** status on create—signals a marketplace with governance.  
- **Orders:** Date-ranged lists, status tabs with counts, pagination, **fulfilment progression** buttons, **realtime** refresh via **Supabase realtime** subscriptions—operations that feel “live”.  
- **Customers:** Derived **new vs repeat** segmentation from **paid** orders—simple, explainable, powerful for small vendors.  
- **Promotions:** Create **vouchers** and **app discounts** with limits, windows, stacking rules, and optional targeting (store/category).  
- **Earnings & banking:** See balances and fee splits; **request payouts** via **RPC (Remote Procedure Call)**; maintain **bank account** details for settlement storytelling.

**Vendor technical credibility**

- **React** + **Vite (build tool)** + **TypeScript** UI.  
- **Supabase client** for queries, inserts, updates, subscriptions.  
- **Netlify Functions** exist in-repo for server-side workflows like **Yoco checkout creation**—keeps secrets off the browser and gives you an **API (Application Programming Interface)** shape that scales to production hardening.  
- **Charts:** **Recharts** on vendor dashboard overview for at-a-glance momentum.

**“If you are thinking about G, we have an F”**  
Thinking about **promotions**? Built. **Payouts**? Built. **Multi-store**? Built. **Operational pause** during load-shedding chaos? The **hours & orders** model is explicitly designed for that class of pain.

---

### uTap Admin (utap-admin) — “systems admin / operator joining the team”

**Pitch**  
uTap Admin is the **control tower**: not student glitter, not vendor tactical screens—this is where **platform operators** steward **universities**, **profiles**, **catalog taxonomy**, **payouts**, and **cross-vendor promotions** with **analytics** that explain **where money flows** and **who is growing**.

**What it is built on**

- **React** + **TypeScript** + **Vite**.  
- **React Router** for public vs `/admin/*` protected areas.  
- **Supabase** integration patterns for backend-backed pages.  
- **UI:** **Radix UI** primitives + **Tailwind CSS**-style utility workflow (per dependency stack), **Heroicons**, **Sonner** toasts.  
- **Analytics UI:** **Recharts** dashboards with **range toggles** (7/14/30 day), tabs like **overview / trends / breakdown**, and **CSV (Comma-Separated Values) export** hooks—this is “operator-grade” visibility, not vanity charts.

**Admin pages (routes)**

- **Public:** landing, about, contact, login, register, forgot password, reset password.  
- **Protected (`/admin/*`):** dashboard, universities, student profiles, vendors, stores, products, product categories, store categories, payouts, promotions.

---

### One paragraph “voice” you can drop into any LLM system prompt

> uTap is an ambitious **campus ecosystem**: a **React Native / Expo** student wallet with **real NFC/MIFARE** depth, **Ushop** commerce, **uGig** sports discovery, **Yoco**-driven checkout, **Supabase**-backed identity and orders, and **operator-tunable feature policy** for safe rollouts. Vendors run a **React + Vite** dashboard with **stores, hours, products, live orders, promotions, earnings, and payouts**. Platform staff use **uTap Admin**—**React + TypeScript + Vite** with **Recharts analytics** and **admin CRUD** across universities, vendors, catalog categories, payouts, and promotions. The tone is **student-first**, **operations-realistic**, and **South Africa-aware**—serious infrastructure, warm product storytelling.


# OUR ECOSYSTEM + STRATEGIC OBJECTIVES
# ECOSYSTEM
## UTap – Digital Student ID & Payments
UTap is a smart student identity and payment platform designed to simplify campus life through integrated digital solutions.
### Key Features
* Smart student identification (digital & physical)
* Secure cashless payments
* Campus access control for facilities, events, and labs
* Integration with university systems and student services
* Transaction management and digital verification
* Enhanced security and operational efficiency
---
## UShop – Campus Marketplace
UShop is a student-centered digital marketplace that connects students with campus vendors, restaurants, and service providers.
### Key Features
* Pre-order meals, groceries, and essentials
* Vendor partnerships with campus businesses
* Streamlined delivery and collection systems
* Reduced waiting times and queue management
* Data-driven business insights
* Digital ordering and payment integration
---
## UGig – Student Events & Ticketing Platform
UGig is a digital ticketing and student engagement platform built specifically for the student and youth market.
The platform enables students to discover, purchase, and access tickets for sports events, concerts, festivals, nightlife, student activations, cultural experiences, and university events through one centralized ecosystem.
### Key Features
* Digital ticket sales for sports events, concerts, festivals, and student experiences
* Event discovery platform tailored for students
* Secure online payments and ticket verification
* QR code and digital access integration
* Partnerships with promoters, organizers, and student organizations
* Event marketing and promotional support
* Real-time event updates and engagement
* Integration with the wider UTap ecosystem
# STRATEGIC OBJECTIVES
## Digital Transformation
Drive efficiency, security, and convenience in student identity management, transactions, and campus operations.
## Inclusive Growth
Ensure affordability and accessibility for all students while bridging financial and digital divides.
## Scalability
Expand the ecosystem beyond Johannesburg into universities and institutions across South Africa and the African continent.
## Strategic Partnerships
Collaborate with universities, financial institutions, technology providers, event organizers, and businesses to enhance adoption and functionality.
## Innovation Leadership
Continuously improve the ecosystem through AI, blockchain, fintech integration, data analytics, and emerging technologies.
## Student Engagement
Create connected student communities through digital experiences, entertainment, events, and campus engagement initiatives.
---
# VISION + MISSION
# **ABOUT UTAP**
UTap Technologies is a pioneering digital ecosystem created to revolutionize student life by providing smart, secure, and cashless technology solutions tailored for campuses and student communities.
At the center of the ecosystem is **UTap**, a digital student identity and payment platform that integrates identification, financial transactions, and access control into one seamless solution.
Complementing UTap is **UShop**, a campus-focused digital marketplace that enables students to pre-order meals, groceries, essentials, and campus services while helping businesses streamline operations and reduce waiting times.
Expanding the ecosystem further is **UGig**, a student events and ticketing platform designed to connect students with sports events, concerts, festivals, nightlife, student activations, and university experiences through a secure digital ticketing system.
Together, UTap, UShop, and UGig form a connected technology ecosystem designed to improve accessibility, efficiency, convenience, engagement, and digital transformation within universities and youth communities across Africa.
# VISION
To become Africa’s leading student digital ecosystem, transforming campuses into smart, connected, and digitally empowered communities.
---
# MISSION
* To provide secure, convenient, and innovative digital solutions for student identity and transactions.
* To empower campus businesses through digital transformation and marketplace integration.
* To enhance student experiences through seamless event discovery and digital ticketing.
* To foster accessibility, efficiency, trust, and engagement across student ecosystems.
* To drive digital transformation within higher education institutions across Africa.
___
