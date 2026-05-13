## TASK: Complete UI Polish Overhaul for uTap Ecosystem

You are a senior frontend engineer obsessed with exceptional user experience and micro-polish. Your mission is to systematically audit and upgrade **every UI component, page, screen, table, form, modal, and navigation element** across the entire uTap workspace — which contains **3 apps**:

1. **utap-app** — React Native / Expo student mobile app (NativeWind/Tailwind styling)
2. **utap-vendors** — React + Vite vendor dashboard (Tailwind CSS)
3. **utap-admin** — React + Vite + TypeScript admin console (Tailwind CSS + Radix UI)

---

## PHASE 1: Discovery & Inventory

Before making any changes, perform a complete audit:

### For each app, find and catalog:
- [ ] All page/screen components
- [ ] All reusable UI components (buttons, cards, inputs, modals, tables, etc.)
- [ ] All forms and input patterns
- [ ] All tables and data displays
- [ ] All navigation components (tabs, headers, sidebars, drawers)
- [ ] All loading states (or lack thereof)
- [ ] All empty states (or lack thereof)
- [ ] All error states (or lack thereof)
- [ ] Landing pages (note if missing)

Use `/find` or search patterns like:
- `*.tsx` files in `/components`, `/screens`, `/pages`, `/app`
- Look for `Button`, `Card`, `Input`, `Modal`, `Table`, `Form`, `Dialog`
- Check for `loading`, `skeleton`, `empty`, `error` patterns

---

## PHASE 2: Apply Micro-Polish Standards

For **EVERY** interactive element and screen, ensure these exist:

### Loading States
- [ ] Skeleton loaders that match real content layout (shimmer preferred)
- [ ] Never use generic spinners unless contextually appropriate
- [ ] Button loading states with spinners and disabled interaction

### Interactive States (all touchable elements)
- [ ] Default state
- [ ] Hover state (web) / Pressed state (mobile)
- [ ] Active state
- [ ] Focus state with visible focus ring
- [ ] Disabled state with proper opacity/cursor
- [ ] Loading state
- [ ] Success state (where applicable)
- [ ] Error state (where applicable)

### Micro-interactions
- [ ] Subtle animations (150-300ms duration)
- [ ] Scale effects on press (0.97-0.98 scale)
- [ ] Opacity transitions
- [ ] Spring animations for mobile (Reanimated)
- [ ] Smooth color transitions

### Haptic Feedback (mobile only - utap-app)
- [ ] Light haptic on button press
- [ ] Success haptic on completion
- [ ] Error haptic on failure
- [ ] Selection haptic on toggle/switch

### Icons
- [ ] Consistent icon library (Lucide React / Lucide React Native)
- [ ] Proper sizing (16px, 20px, 24px)
- [ ] Filled vs outlined variants used meaningfully
- [ ] Accessibility labels on icon-only buttons

### Feedback & Empty States
- [ ] Toast notifications for success/error/info
- [ ] Empty states with illustrations + clear CTAs
- [ ] Inline error messages on forms
- [ ] Undo options where relevant
- [ ] Pull-to-refresh with smooth animation (mobile)

### Accessibility
- [ ] Proper focus rings
- [ ] Keyboard navigation
- [ ] ARIA labels on all interactive elements
- [ ] `prefers-reduced-motion` support
- [ ] Minimum 44x44 touch targets (mobile)
- [ ] Good contrast ratios

### Dark Mode
- [ ] Full dark mode support
- [ ] Thoughtful color adaptation (not just inversion)
- [ ] Test all components in both modes

---

## PHASE 3: Component-Specific Standards

### Buttons
```tsx
// Must have: hover, active, focus, disabled, loading states
// Loading: show spinner, disable interaction, maintain width
// Transitions: 150ms ease-out
```

### Cards
```tsx
// Must have: hover lift effect, focus state, loading skeleton
// Interactive cards: press feedback, cursor pointer
// Shadow/border transitions on hover
```

### Forms & Inputs
```tsx
// Must have: focus ring, error state with message, disabled state
// Labels: always visible, proper association
// Validation: inline errors, field-level feedback
// Submit: loading state, success feedback
```

### Tables (web apps)
```tsx
// Must have: loading skeleton rows, empty state, sortable headers
// Row hover: subtle background change
// Pagination: clear controls, page size options
// Actions: icon buttons with tooltips
```

### Modals/Dialogs
```tsx
// Must have: focus trap, escape to close, backdrop click to close
// Enter/exit animations (150-200ms)
// Loading states for async content
// Clear close button
```

### Navigation
```tsx
// Active state indication
// Smooth transitions between routes
// Mobile: proper safe area handling
// Breadcrumbs where appropriate
```

---

## PHASE 4: Landing Pages

### Check if landing pages exist:
- **utap-app**: Does it have a marketing landing page? (probably NO — CREATE ONE)
- **utap-vendors**: Check `/` or `/landing` route
- **utap-admin**: Check `/` or `/landing` route

### Landing Page Structure (create or rework to match):

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR                                                     │
│  Logo | Nav Links | CTA Button                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SECTION                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Headline (max 8 words)                               │   │
│  │ Subheadline (1-2 sentences)                          │   │
│  │ [Primary CTA]  [Secondary CTA]                       │   │
│  │                                                       │   │
│  │ Hero Image/Illustration/App Preview                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  SOCIAL PROOF BAR                                           │
│  "Trusted by X students" | University logos | Stats         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FEATURES SECTION (Bento Grid or 3-4 cards)                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│  │ Feature │ │ Feature │ │ Feature ��                       │
│  │   1     │ │   2     │ │   3     │                       │
│  │ Icon    │ │ Icon    │ │ Icon    │                       │
│  │ Title   │ │ Title   │ │ Title   │                       │
│  │ Desc    │ │ Desc    │ │ Desc    │                       │
│  └─────────┘ └─────────┘ └─────────┘                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  HOW IT WORKS (3 steps)                                     │
│  1. Download → 2. Add Card → 3. Start Using                │
├─────────────────────────────────────────────────────────────┤
│  TESTIMONIALS                                               │
│  Student quotes with avatars                                │
├─────────────────────────────────────────────────────────────┤
│  FAQ SECTION (Accordion)                                    │
│  Common questions with expandable answers                   │
├─────────────────────────────────────────────────────────────┤
│  FINAL CTA SECTION                                          │
│  "Ready to get started?" + CTA buttons                      │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  Links | Social | Copyright                                 │
└─────────────────────────────────────────────────────────────┘
```

### App-Specific Landing Page Content:

#### utap-app (Student App)
- **Theme**: Electric blue (#0066FF) + white + dark grays
- **Headline**: "Your Campus Card. Now Digital."
- **Features**: NFC Wallet, uShop Marketplace, uGig Sports, Order Tracking
- **CTA**: "Download the App" / "Learn More"
- **Use `/find-free-stock-image` for**: university students, campus life, mobile payments

#### utap-vendors (Vendor Dashboard)
- **Theme**: Emerald green (#10B981) + white + slate grays
- **Headline**: "Sell to Students. Effortlessly."
- **Features**: Store Management, Real-time Orders, Promotions, Earnings Dashboard
- **CTA**: "Start Selling" / "See Demo"
- **Use `/find-free-stock-image` for**: small business, food vendor, campus cafe

#### utap-admin (Admin Console)
- **Theme**: Deep purple (#7C3AED) + white + zinc grays
- **Headline**: "The Control Tower for Campus Commerce"
- **Features**: University Management, Vendor Oversight, Analytics, Payouts
- **CTA**: "Access Console" / "Request Demo"
- **Use `/find-free-stock-image` for**: analytics dashboard, admin interface, data visualization

---

## PHASE 5: Execution Order

Work through apps in this order:

### 1. utap-vendors (web — fastest to iterate)
1. Audit all components
2. Fix loading/empty/error states
3. Polish interactive states
4. Rework landing page
5. Test dark mode

### 2. utap-admin (web — similar patterns)
1. Audit all components
2. Fix loading/empty/error states
3. Polish interactive states
4. Rework landing page
5. Test dark mode

### 3. utap-app (mobile — most complex)
1. Audit all screens
2. Add haptic feedback
3. Fix loading/skeleton states
4. Polish animations with Reanimated
5. Create marketing landing page (if needed as a separate web page or in-app onboarding)
6. Test dark mode on device

---

## TECHNOLOGY REFERENCE

### utap-app (React Native / Expo)
- Styling: NativeWind (Tailwind for RN)
- Animations: react-native-reanimated
- Haptics: expo-haptics
- Icons: lucide-react-native or @expo/vector-icons
- UI Base: React Native Paper

### utap-vendors (React + Vite)
- Styling: Tailwind CSS
- UI Components: shadcn/ui or custom
- Icons: lucide-react
- Charts: Recharts
- Toasts: Sonner or react-hot-toast

### utap-admin (React + Vite + TypeScript)
- Styling: Tailwind CSS
- UI Primitives: Radix UI
- Icons: Heroicons or lucide-react
- Charts: Recharts
- Toasts: Sonner

---

## QUALITY CHECKLIST (Before marking any component "done")

- [ ] All interactive states implemented
- [ ] Loading state exists and matches content layout
- [ ] Empty state exists with helpful CTA
- [ ] Error state exists with clear message
- [ ] Dark mode tested and looks intentional
- [ ] Animations are smooth (150-300ms)
- [ ] Accessibility: focus rings, ARIA labels, keyboard nav
- [ ] Mobile: 44x44 touch targets, safe areas handled
- [ ] No console errors or warnings

---

## BEGIN

Start by listing all 3 app directories and their component/page structures. Then systematically work through each app following the phases above.

For images, use the `/find-free-stock-image` skill to source appropriate stock photos.

**GO.**
