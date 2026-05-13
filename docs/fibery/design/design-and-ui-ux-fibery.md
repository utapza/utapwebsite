# Design, UI, and UX (uTap) — Fibery edition

**Fibery edition:** This version removes markdown hyperlinks so it pastes cleanly into Fibery. Related documents are referenced by **path inside the `utap-docs` repo** (`docs/fibery/…`, `docs/system/…`).

**Audience:** Designers, mobile engineers, and anyone changing how the product *feels* or *reads*.

**Scope:** This document describes what the repository **actually uses** today, where visual language is **centralised**, and where it has **drifted**—so we can improve UI consistently without a separate Figma file always being in sync.

**Canonical UI engineering rules** (interaction patterns, quality checklist, landing structure, accessibility expectations, and a **target vs installed** stack table) live in **`docs/system/design/unified-ui-ux-engineering-rules.md`**. Treat that file as the cross-app **quality contract**; treat this Fibery document as **as-built inventory and drift notes**—keep both in mind when shipping UI.

---

## 1. Product UX goals

uTap serves **students** in real-world contexts (campus, shops, turnstiles). The interface should:

1. **Feel trustworthy** — money, identity, and NFC operations need clear states (loading, success, error).  
2. **Stay legible in sunlight and on the move** — enough contrast; avoid tiny touch targets.  
3. **Reduce anxiety for NFC** — tell users *when* to hold the card, *what* is happening, and *what* to do if nothing happens.  
4. **Keep commerce scannable** — Ushop / uGig lists and product detail should prioritise **price, place, and next action** (order, view store).

These are direction statements; individual screens may not all meet them yet.

---

## 2. Mobile app (utap-apps) — stack

| Layer | Choice |
|-------|--------|
| **Components** | React Native Paper — Material Design–aligned primitives (upstream docs: Callstack, React Native Paper). |
| **Theme** | `PaperProvider` in **`App.js`** with a custom theme extending React Native Paper’s `DefaultTheme` |
| **Icons (tabs & common UI)** | `@expo/vector-icons` — **Ionicons** in `AppNavigator.js` for bottom tabs |
| **Motion / depth** | `expo-linear-gradient` for headers, cards, and empty states on many screens |
| **Typography** | **Poppins** (loaded via `expo-font` in `app.json`); theme maps `regular`, `medium`, `light`, `thin` in `App.js` |
| **Navigation** | React Navigation — stack for auth, stack + bottom tabs for main app |

There is also **Tailwind + shadcn-style** config in the repo (`tailwind.config.ts`, `components.json`) aimed at **web/Next-style** paths. The **primary student experience is still React Native screens** under `src/screens/`, not those web components, unless you explicitly work on that web surface.

---

## 3. Colour language (mobile)

### 3.1 Canonical theme tokens (`App.js`)

The global Paper theme defines the **intended** brand palette:

| Token | Hex (approx.) | Role |
|-------|----------------|------|
| `primary` | `#4CAF50` | Brand green, primary actions, active tab hint |
| `accent` | `#81C784` | Secondary emphasis |
| `background` / `surface` | `#FFFFFF` | Screen and card surfaces |
| `text` | `#2E7D32` | Primary text |
| `onSurface` | `#388E3C` | Secondary on-surface text |
| `placeholder` | `#A5D6A7` | Placeholders, inactive hints |
| `disabled` | `#C8E6C9` | Disabled UI |
| `backdrop` | Green-tinted semi-transparent | Modals / overlays |

### 3.2 Frequently used accent greens (in navigation and screens)

Several screens and **`AppNavigator.js`** use **Tailwind-style emerald** greens for gradients and headers:

- **`#10B981`**, **`#059669`** — headers, login/register hero gradients, some product accents  
- **`#4CAF50`** — aligns with theme `primary`; used for tabs and refresh controls  

**Dark “premium” strips** (orders, some modals): **`#1a1a1a`** → **`#2d2d2d`** gradients.

### 3.3 Practical guidance

- Prefer **`theme.colors.*`** from React Native Paper’s `useTheme()` for new work **inside Paper components**.  
- When using **inline hex** (common today for `LinearGradient` and `RefreshControl`), align with **either** the Material greens (`#4CAF50` family) **or** the emerald pair above—avoid introducing a third unrelated green without a design decision.  
- **Wallet / card chrome** (`PremiumCardWallet.js`) uses **multi-colour** gradients for card types; that is intentional variety for cards, not necessarily for global chrome.

---

## 4. Typography (mobile)

- **Family:** Poppins (`Poppins-Regular`, `Poppins-Medium`, etc.), registered in **`app.json`** under the `expo-font` plugin.  
- **Navigation titles:** `Poppins-SemiBold` is referenced in **`AppNavigator.js`** — ensure that font file exists under **`assets/fonts/`** if you see fallback fonts on device.  
- **Paper theme** maps weights to named slots (`regular`, `medium`, …). Use those slots when configuring Paper components so future theme tweaks propagate.

---

## 5. Navigation patterns

- **Auth:** Stack with **green header** (`#10B981`) and white title tint.  
- **Main app:** Bottom tabs — **Cards, Ushop, uGig, Profile, Orders** with Ionicons; active **`#4CAF50`**, inactive light green **`#A5D6A7`**, white tab bar.  
- **Stacks inside tabs:** Card flows, store detail, checkout—follow existing header patterns per screen.

When adding a tab or stack screen, match **header colours** and **font** to neighbours so the app does not feel like five different products.

---

## 6. Key UX flows (mobile)

### 6.1 NFC scan and emulation

- Users need **explicit feedback**: scanning state, success, retry, and errors (no tag, read failed).  
- Avoid jargon in user-visible strings (“MIFARE”, “sector”) unless you support power users; plain language reads better.  
- **Emulation** may behave differently on **Android vs iOS** — surface platform-specific hints where behaviour diverges. For NFC behaviour detail, see **nfc-module-playbook.md** at: `docs/fibery/nfc/nfc-module-playbook.md` (**utap-docs** repo).

### 6.2 Ushop / uGig

- Same underlying commerce model; **uGig** is a **filtered** experience (e.g. sports-oriented). Keep **filters, empty states, and search** behaviour aligned so users learn once.  
- List rows should expose **store name, distance/context, and primary CTA** without clutter.

### 6.3 Orders and payments

- Show **order status**, **pickup code**, and **payment state** in plain language.  
- **Yoco** checkout runs in a **WebView**; treat paid state as authoritative only when the **webhook** path has written Postgres (see **pitfalls-and-risks.md** at: `docs/fibery/risk-and-compliance/pitfalls-and-risks.md` — **utap-docs** repo).

---

## 7. Accessibility (baseline)

- **Touch targets:** aim for at least ~44×44 pt for primary actions (platform HIG guidance).  
- **Contrast:** green-on-white in the theme is generally readable; test **placeholder** and **disabled** greens against WCAG for small text.  
- **Screen readers:** Paper components help; add **`accessibilityLabel`** where icons are tappable without text.  
- **Motion:** respect OS “reduce motion” where you add animations (future improvement if not universal today).

---

## 8. Web apps (admin, vendor, marketing)

Sibling repos (**utap-admin**, **utap-vendors**, **utapwebsiite**) use **Vite + React** and typically **Tailwind-style** utility CSS. They do **not** share the same `App.js` Paper theme as mobile.

**Consistency tips:**

- Reuse the **same emotional palette** (greens, white space, trust-focused copy) where those surfaces face partners or the public.  
- Do **not** copy mobile hex values blindly into admin charts if it hurts data density—prioritise **readability** for operators.

---

## 9. Design debt and opportunities (honest)

1. **Colour drift** — mix of `#4CAF50`, emerald `#10B981` / `#059669`, and dark greys; consolidating **tokens** (e.g. a single `theme.js` or constants file for gradients) would speed polish.  
2. **Paper vs custom** — many screens use **custom `StyleSheet` + LinearGradient** rather than Paper alone; that is fine, but new screens should **reuse existing components** (`ProductCard`, `SearchResultCard`, etc.) before inventing new card patterns.  
3. **Dark mode** — Settings references theme toggling; verify end-to-end behaviour if you ship dark mode broadly.  
4. **Web vs native** — unused or partial **shadcn/Tailwind** paths in **`utap-apps`** can confuse contributors; treat **`src/screens`** there as the source of truth for the student app UI unless you are explicitly building the web bundle.

---

## 10. Related documents (paths in **utap-docs** repo)

Use these filenames to locate the markdown originals in Git or your doc mirror:

| Topic | Location (under **utap-docs** / `docs/`) |
|-------|------------------------------------------|
| Voice and microcopy (product-wide) | **`docs/system/market/`** (do not duplicate here) |
| UI engineering (states, tables, landings, a11y, stack reality) | **`docs/system/design/unified-ui-ux-engineering-rules.md`** |
| Architecture | **`docs/fibery/architecture/domain-level-knowledge.md`** |
| NFC behaviour | **`docs/fibery/nfc/nfc-module-playbook.md`** |
| Risks (payments, data) | **`docs/fibery/risk-and-compliance/pitfalls-and-risks.md`** |
| Terms | **`docs/fibery/reference/glossary.md`** |

Canonical linked version (for IDE/GitHub): **`docs/fibery/design/design-and-ui-ux.md`**

---

## 11. Contributing UI changes

1. **Screenshot or screen recording** in PR when visuals change materially.  
2. Test on **one Android + one iOS** device when touching layout, safe areas, or NFC screens.  
3. Prefer **reusing** components under **`utap-apps`** `src/components/` before adding parallel patterns.  
4. If you introduce a **new global colour or font**, document it in **design-and-ui-ux.md** (and this Fibery edition if you keep both in sync) in the same PR.
