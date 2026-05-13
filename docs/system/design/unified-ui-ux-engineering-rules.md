# uTap — Unified UI/UX engineering rules

**Applies to:** All apps in the uTap ecosystem

- **utap-apps** — React Native / Expo student wallet  
- **utap-vendors** — React + Vite vendor dashboard  
- **utap-admin** — React + Vite admin console  

All apps use **Tailwind CSS** (NativeWind where adopted for React Native; standard Tailwind for web).

---

## Related canonical docs (read together)

| Doc | Role |
|-----|------|
| [`docs/system/market/voice-guidelines.md`](../market/voice-guidelines.md) | How uTap **sounds** — sentence case, ZAR formatting, errors, CTAs, banned words. |
| [`docs/system/market/brand-glossary.md`](../market/brand-glossary.md) | Product names, money formatting, capitalisation. |
| [`docs/fibery/design/design-and-ui-ux-fibery.md`](../../fibery/design/design-and-ui-ux-fibery.md) | **As-built** stack notes, palette, and drift — inventory of what repos use today. |

**Rule of thumb:** This file sets the **quality bar** and **interaction patterns**. Voice and brand docs govern **every string and name**. Fibery design doc describes **what is implemented**; when they differ on stack, prefer Fibery for “what exists” and this doc for “what to aim for” on new work (see **Implementation reality** below).

### Copy and marketing vs in-app UI

- **In-app** chrome, tables, buttons, tabs, and modals: **sentence case** per voice guidelines. **Title Case Is Off-Brand** for product UI.  
- **Landing / marketing** heroes: large display typography (e.g. 48–72px) is fine; occasional title-style hero lines are allowed where brand voice calls for it — still align CTAs and body with voice guidelines.  
- **Mobile** student surfaces: prefer **tap** not **click** in copy.  
- **ZAR (South African Rand)** and amounts: thin space after `R`, whole rand without trailing `.00` unless cents matter — see brand glossary.

---

## 1. Core mandate

Treat every UI change as **senior craft**: exceptional user experience and micro-polish.

Whenever generating or modifying **any UI component, screen, page, dashboard, table, form, card, modal, or landing page** across the uTap ecosystem:

- **Never ship basic or unpolished components.** Elevate every element.  
- **Think about delight, clarity, feedback, accessibility (a11y), and perceived performance** at every step.  
- **Match the polish level of strong reference products** (e.g. Linear, Vercel, Stripe-class clarity) where it fits a student and vendor context.  
- **Respect South African context:** ZAR pricing patterns, local identity norms, campus life realities, **load-shedding resilience** — clear offline / retry states, no silent hangs, honest errors (aligned with voice guidelines).

Product UX goals (trust, sunlight legibility, NFC anxiety reduction) align with **`docs/fibery/design/design-and-ui-ux-fibery.md`** section 1.

---

## 2. Must-have micro-details (every element)

### Loading states

- **Prefer skeleton loaders** that match real content layout over generic spinners.  
- Use **shimmer** where appropriate.  
- **Button loading:** Inline spinner + disabled + copy change (“Saving…”, “Processing…”).  
- **Table skeletons:** Match column widths and row heights.

### Interactive states (all touchables / clickables)

- **Default** — Base appearance  
- **Hover** — Subtle colour shift, scale, or shadow (web)  
- **Active / pressed** — Visual depression, scale down (~0.97–0.98)  
- **Focus** — Clear focus ring for keyboard navigation  
- **Disabled** — Reduced opacity (~0.5–0.6), `cursor-not-allowed` on web  
- **Loading** — Spinner + no interaction  
- **Success** — Brief confirmation (e.g. checkmark or toast)  
- **Error** — Clear highlight; shake only where it aids understanding  

Respect **`prefers-reduced-motion`**: reduce or remove non-essential motion.

### Micro-interactions

- **Duration:** ~150–300ms for most transitions  
- **Easing:** ease-out or spring-like curves for natural feel  
- **Types:** scale on press, opacity on appear, colour on hover, slide for sheets/modals, **object constancy** across transitions  
- **React Native:** Prefer **Reanimated** when present in the project for 60fps UI-thread animation; otherwise use supported APIs without blocking the JS thread.  
- **Web:** CSS transitions, Tailwind `transition-*`, or Framer Motion where already used  

### Haptic feedback (mobile)

Use **Expo Haptics** or **react-native-haptics** where available:

- **Light:** Button press, toggle  
- **Medium:** Success, selection  
- **Heavy:** Error, destructive confirm  
- **Selection:** List item, tab change  

### Icons

- **One primary family per surface** for consistency.  
- **Web:** **Lucide React** (preferred) or Heroicons.  
- **Mobile:** **Lucide React Native** or **Expo Vector Icons** — match what the screen already uses; do not mix families on one bar without a design reason.  
- **Sizing:** 16px (small), 20px (default), 24px (large) — adjust for platform density.  
- **A11y:** Accessible labels on all interactive icons.

### Feedback and notifications

- **Toasts:** Success (green), error (red), warning (amber), info (blue) — use project toast library when installed (**Sonner** on web stacks that include it).  
- **Position:** Top-right (web), top (mobile) where not conflicting with nav.  
- **Duration:** ~3–5s, auto-dismiss unless persistent error.  
- **Empty states:** Illustration or icon + heading + actionable CTA (copy per voice guidelines).  
- **Inline errors:** Below fields, clear colour, optional icon.  
- **Undo:** Where destructive actions are reversible, offer undo in toast or inline.

### Accessibility (non-negotiable)

- **Touch targets:** Minimum **44×44** logical px (mobile).  
- **Focus order** and visible focus.  
- **ARIA (Accessible Rich Internet Applications)** labels / roles on interactive web elements.  
- **Contrast:** **WCAG (Web Content Accessibility Guidelines)** AA minimum (4.5:1 text, 3:1 large text).  
- **Screen readers:** Roles, hints, live regions where appropriate.

### Dark mode

- **Full support** where the app ships dark theme — not colour inversion only.  
- Reduce brightness thoughtfully; soften shadows in dark mode; re-check contrast.

### Mobile-specific polish (React Native)

- **Safe areas** — notches, home indicators.  
- **Keyboard-aware** scroll and focus.  
- **Scroll physics** — platform-appropriate.  
- **Pull-to-refresh** — smooth, clear completion feedback.  
- **Gestures** — swipe actions where they clarify dense lists.  
- **iOS vs Android** — respect platform conventions where they do not break brand.

---

## 3. Component and table standards

### Tables (admin and vendor dashboards)

- Sticky header, clear typography, sortable columns with visible affordance.  
- Row hover (web), optional subtle striping.  
- Clickable rows: clear cursor / pressed state.  
- Pagination: page info, prev/next, page size when datasets are large.  
- Loading: skeleton rows.  
- Empty: helpful message + CTA.  
- Search/filter above table; show active filters.  
- Bulk actions: selection + action bar when required.

### Forms

- Labels above inputs (not placeholder-only).  
- Validation: inline, real-time where possible.  
- Specific errors below fields.  
- Required field indicator.  
- Submit: loading + disabled while in flight.  
- Success: confirmation or redirect per flow.

### Cards

- Consistent radius from design tokens / theme.  
- Web: subtle hover elevation.  
- Mobile: press feedback.  
- Clear visual hierarchy (title, meta, actions).

### Modals and sheets

- Backdrop; click-outside / tap-outside to close when safe.  
- Motion: sheet slide-up (mobile), fade + scale (web) where appropriate.  
- Close control always visible and keyboard reachable.  
- Focus trap in modal (web).  
- **Escape** closes on web.

---

## 4. Landing page requirements

### When landings matter

- **utap-apps:** Add or refine a landing / marketing surface if the product route map calls for it.  
- **utap-vendors** and **utap-admin:** Ship a **polished** marketing-style landing where the product exposes a public entry — professional, trustworthy, operational tone respectively.

### Structure (checklist)

1. **Hero** — Headline, subhead, primary CTA, secondary CTA, hero visual, trust strip.  
2. **Features / benefits** — 3–6 items, icon + title + body.  
3. **How it works** — 3–4 numbered steps.  
4. **Social proof** — Testimonials, logos, stats when authentic.  
5. **Pricing / plans** — If applicable; highlight recommended tier.  
6. **FAQ** — Accordion.  
7. **Final CTA** — Repeat value + primary action + support path.  
8. **Footer** — Nav, contact, social, legal, copyright.

### Visual style

- Subtle hero gradient or image; brand-aligned.  
- Generous vertical rhythm; responsive, mobile-first.  
- Motion: subtle scroll reveals; no gratuitous animation.  
- **Images:** Optimised (e.g. WebP where appropriate), meaningful **alt** text. For stock heroes, use the project **find-free-stock-image** / Pexels workflow where configured.

### App-specific themes

| App | Tone | Focus |
|-----|------|--------|
| **utap-apps** | Energetic, student-first | NFC, campus wallet, uShop / uGig convenience |
| **utap-vendors** | Professional, growth | Orders, earnings, analytics |
| **utap-admin** | Authoritative, operational | Control, analytics, compliance-friendly clarity |

---

## 5. Technology preferences by app

Use this as **target architecture** when starting new surfaces. Always confirm **`package.json`** and Fibery before assuming a library is installed.

### utap-apps (React Native / Expo)

- **Styling:** Tailwind-related tooling where integrated; **React Native Paper** for primary RN UI today.  
- **Navigation:** React Navigation.  
- **Motion:** Reanimated when added; avoid heavy animation on JS thread.  
- **State:** Context or existing patterns — do not introduce a global store without an ADR (Architecture Decision Record).  
- **Forms:** react-hook-form + Zod where forms exist.  
- **Icons:** Align with existing screen patterns (Expo Vector Icons / Lucide on web paths).

### utap-vendors (React + Vite)

- **Styling:** Tailwind CSS.  
- **Components:** Prefer **shadcn/ui**-style primitives when introducing new dashboard UI — adopt via CLI and `components/ui` as the codebase matures.  
- **Charts:** Recharts when charts are needed.  
- **Forms:** react-hook-form + Zod.  
- **Icons:** Lucide React.  
- **Toasts:** Sonner when wired in.

### utap-admin (React + Vite)

- **Styling:** Tailwind CSS.  
- **Components:** Radix primitives + existing patterns.  
- **Charts:** Recharts.  
- **Icons:** Lucide React and/or Heroicons — pick one per new feature area.  
- **Toasts:** Sonner.  
- **Tables:** TanStack Table **or** custom — use TanStack when installing new data-heavy grids.

---

## 6. uTap brand and voice (UI-facing summary)

- **Student-first** — Friendly, relatable, not corporate.  
- **Positioning lines (examples):** Students — wallet + campus ID; vendors — meet students where they are; admins — operational control tower.  
- **Visual identity:** Follow app theme tokens and Fibery colour guidance; avoid arbitrary third greens (see Fibery doc).

Full rules: **`docs/system/market/`** voice + glossary.

---

## 7. Quality checklist (before shipping UI)

### Every component

- [ ] Interactive states (hover, active, focus, disabled, loading) as applicable  
- [ ] Skeleton or loading for async content  
- [ ] Error + empty states with useful copy  
- [ ] A11y labels and keyboard / screen reader support  
- [ ] Dark mode if the app supports it  
- [ ] Responsive / small-screen behaviour  

### Every page / screen

- [ ] Clear hierarchy and spacing  
- [ ] Perceived performance (skeletons, optimistic updates where safe)  
- [ ] Error boundary or graceful degradation where platform allows  

### Every form

- [ ] Validation messages (specific, human — voice guidelines)  
- [ ] Submit loading and success feedback  

### Every table

- [ ] Sort/filter if data warrants it  
- [ ] Pagination for large sets  
- [ ] Skeleton + empty states  

---

## 8. Images and assets

- Stock: prefer **Pexels** (or project-configured stock workflow); diverse, authentic campus imagery.  
- Optimise for web; always **alt** text.  
- Illustrations: one consistent style per surface.

---

## 9. Performance and perceived speed

- Skeletons over spinners where layout is known.  
- Optimistic updates when rollback is clear.  
- Instant tap/click feedback.  
- Lazy load heavy routes and media.  
- Code-split where the bundler supports it.

---

## 10. Implementation reality vs target (anti-drift)

**Follow the quality bar in sections 1–9 on every change.** For **dependencies and folder structure**, treat this table as the source of “what exists today” until you intentionally migrate. Refresh this table when `package.json` or primary UI libraries change.

| App | Target (sections 5 + ecosystem direction) | Verified baseline (repo snapshot) |
|-----|--------------------------------------------|-------------------------------------|
| **utap-apps** | NativeWind + Reanimated + Lucide RN for RN-first UI | **React Native Paper** + **React Navigation**; **@expo/vector-icons** (e.g. Ionicons in tab bar per Fibery); **Tailwind** + Radix/Lucide/Sonner skewed toward **web** paths in the same repo; **no** `nativewind` or `react-native-reanimated` package entry in root `package.json` at last audit — **verify before recommending NativeWind/Reanimated-only APIs**. |
| **utap-vendors** | shadcn/ui + Sonner + Lucide + RHF + Zod | **Vite + React**; **Tailwind**; **Lucide React**; **react-hook-form** + **Zod**; **no** shadcn `components/ui` tree or Sonner in the minimal dependency scan — treat **shadcn/Sonner as adopt-as-you-build** for new work. |
| **utap-admin** | Radix + Sonner + Recharts + TanStack or custom tables | **Radix** packages, **lucide-react**, **sonner**, **recharts**, **Heroicons** present; **no** `@tanstack/react-table` in `package.json` at last audit — tables may be **custom** until TanStack is added. |

---

## 11. Remember

When in doubt, ship **premium clarity**: calm states, honest errors, fast feedback, and copy that sounds like uTap — not generic SaaS. If it feels “good enough,” iterate once more on loading, empty, and error paths.
