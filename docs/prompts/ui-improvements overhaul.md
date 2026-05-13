# uTap UI Overhaul — Cursor Action Prompt

**Copy everything below this line and paste into Cursor to trigger the UI overhaul across all 3 apps.**

---

## TASK: Complete UI Polish Overhaul for uTap Ecosystem

You are a senior frontend engineer obsessed with exceptional user experience and micro-polish. Your mission is to systematically audit and upgrade **every UI component, page, screen, table, form, modal, and navigation element** across the entire uTap workspace.

**Live Sites for Reference:**
- Admin: https://utapadmin.netlify.app
- Vendors: https://vendors.utaptech.co.za
- utap-app: React Native mobile app (no website)

**Apps in Workspace:**

| App | Stack | Styling | Purpose |
|-----|-------|---------|---------|
| **utap-app** | React Native / Expo | NativeWind + React Native Paper | Student mobile app |
| **utap-vendors** | Vite + React | Tailwind CSS | Vendor dashboard |
| **utap-admin** | Vite + React + TypeScript | Tailwind CSS | Admin console |

---

## THEMING — PRESERVE THE EXISTING PALETTE

**DO NOT change the brand colors.** uTap uses a green-based palette across all apps.

### Canonical Colors (from App.js theme)
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#4CAF50` | Brand green, primary actions, active states |
| `accent` | `#81C784` | Secondary emphasis |
| `emerald-gradient` | `#10B981` → `#059669` | Headers, hero gradients |
| `background/surface` | `#FFFFFF` | Screen and card surfaces |
| `text-primary` | `#2E7D32` | Primary text |
| `text-secondary` | `#388E3C` | Secondary text |
| `placeholder` | `#A5D6A7` | Placeholders, inactive |
| `disabled` | `#C8E6C9` | Disabled UI |
| `dark-strip` | `#1a1a1a` → `#2d2d2d` | Premium/dark sections |

### Typography
- **Font Family**: Poppins (Regular, Medium, SemiBold)
- **Loaded via**: expo-font (mobile), Google Fonts (web)

**Rule**: Use `theme.colors.*` from React Native Paper's `useTheme()` for mobile. Align web apps to these same hex values.

---

## VOICE & TONE — APPLY TO ALL MICROCOPY

uTap sounds like a **clued-in classmate who's already figured it out and wants you sorted in two taps.**

### The Four Voice Anchors (every string must pass 3/4):
1. **Human** — sounds like a person, not a system
2. **Short** — earns its space, cuts to the action
3. **Specific** — names what happened or what to do next
4. **Calm** — doesn't shout, blame, or over-apologize

### Key Patterns:

| Context | Tone | Example |
|---------|------|---------|
| Loading | Quiet, specific | "Reading your card..." (not "Loading...") |
| Success | Confident, brief | "Card saved. You're ready to tap." |
| Error | Calm, with a way out | "Couldn't read that card. Hold it flat and try again." |
| Empty state | Friendly nudge | "No orders yet. Browse uShop to get started." |
| Payment | Direct, clear about money | "You'll pay R 65 with Yoco. Confirm to pay." |

### CTA Button Copy:
- **DO**: "Get started", "Save card", "Place order", "Pay R 65", "Try again"
- **DON'T**: "Submit", "Continue", "OK", "Process", "Click here"

### Banned Words:
- API, endpoint, token, server error, 500, 404
- Processing..., Submission failed, Please wait
- Leverage, solution, synergy, best-in-class

---

## PHASE 1: Discovery & Inventory

Before making any changes, audit each app:

### Find and catalog:
- All page/screen components
- All reusable UI components (buttons, cards, inputs, modals, tables)
- All forms and validation patterns
- All tables and data displays
- All navigation components
- All loading states (or missing ones)
- All empty states (or missing ones)
- All error states (or missing ones)
- Landing pages (check if exists, needs rework, or missing)

### Search patterns:
```bash
# Find all components
find . -name "*.tsx" -path "*/components/*"
find . -name "*.tsx" -path "*/screens/*"
find . -name "*.tsx" -path "*/pages/*"

# Find state patterns
grep -r "loading" --include="*.tsx"
grep -r "skeleton" --include="*.tsx"
grep -r "empty" --include="*.tsx"
grep -r "error" --include="*.tsx"
```

---

## PHASE 2: Apply Micro-Polish Standards

For **EVERY** interactive element and screen, ensure:

### Loading States
- Skeleton loaders that **match real content layout** (shimmer preferred)
- Specific loading copy: "Reading your card...", "Placing your order...", "Asking your bank..."
- Button loading: spinner + disabled interaction + maintain width
- Never generic "Loading..." or plain ActivityIndicator

### Interactive States (ALL touchable elements)
| State | Web | Mobile |
|-------|-----|--------|
| Default | Base styling | Base styling |
| Hover | Background/color shift | N/A |
| Pressed/Active | Slight scale (0.98) + opacity | Scale (0.97) + haptic |
| Focus | Visible focus ring | Focus indication |
| Disabled | 50% opacity + not-allowed cursor | 50% opacity |
| Loading | Spinner + disabled | Spinner + disabled + haptic |
| Success | Green tint + check icon | Green + success haptic |
| Error | Red tint + message | Red + error haptic |

### Micro-interactions
- Subtle animations: **150-300ms** duration
- Scale on press: **0.97-0.98**
- Use CSS transitions (web) or Reanimated (mobile)
- Spring animations for natural feel
- Respect `prefers-reduced-motion`

### Haptic Feedback (mobile only - utap-app)
```tsx
import * as Haptics from 'expo-haptics';

// Button press
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Success
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// Error
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

// Selection change
Haptics.selectionAsync();
```

### Empty States (every list/table needs one)
Structure:
1. Friendly **one-liner** (not system message)
2. **Suggestion** for what to do next
3. **CTA button** if there's a sensible action

| Where | Headline | Sub | CTA |
|-------|----------|-----|-----|
| No saved cards | "Your wallet is empty." | "Scan your student card to add it." | `Scan a card` |
| No orders | "No orders yet." | "Find food, books, and gear from stores near you." | `Browse uShop` |
| No products (vendor) | "No products yet." | "Add your first item to start selling." | `List a product` |
| No results | "Nothing matches your filters." | "Try adjusting the date range or status." | `Clear filters` |

### Error States
Every error has 3 parts:
1. **What happened** (plain words, never error codes)
2. **Why it matters** (only if user needs to know)
3. **What to do next** (always present)

```tsx
// Pattern
<ErrorState
  title="Couldn't read that card."
  action="Hold it flat against the back of your phone and try again."
  primaryCTA={{ label: "Try again", onClick: retry }}
  secondaryCTA={{ label: "Help with scanning", onClick: openHelp }}
/>
```

### Accessibility
- Focus rings on all interactive elements
- Keyboard navigation (web)
- ARIA labels on icon-only buttons
- Minimum **44x44** touch targets (mobile)
- Good contrast ratios (test green text on white)
- `accessibilityLabel`, `accessibilityRole`, `accessibilityHint` (mobile)

### Dark Mode
- Full support, not just color inversion
- Test all screens in both modes
- Use semantic color tokens that adapt

---

## PHASE 3: Component-Specific Standards

### Buttons
```tsx
// Must have: all interactive states + loading spinner
<Button 
  loading={isLoading}
  disabled={isLoading}
  className="transition-all duration-150 active:scale-[0.98]"
>
  {isLoading ? "Saving..." : "Save card"}
</Button>
```

### Cards
```tsx
// Must have: hover effect, loading skeleton, focus state
<Card className="transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-primary">
  {isLoading ? <CardSkeleton /> : <CardContent />}
</Card>
```

### Forms & Inputs
```tsx
// Must have: labels, focus ring, error state with message
<Field>
  <Label>Email</Label>
  <Input 
    type="email"
    className="focus:ring-2 focus:ring-primary"
    aria-invalid={!!error}
  />
  {error && <FieldError>{error}</FieldError>}
</Field>
```

### Tables (web apps)
```tsx
// Must have: loading skeleton, empty state, sortable headers, row hover
<Table>
  {isLoading ? (
    <TableSkeleton rows={5} />
  ) : data.length === 0 ? (
    <EmptyState message="No orders yet today." />
  ) : (
    <TableBody>
      {data.map(row => (
        <TableRow className="hover:bg-muted/50 transition-colors">
          ...
        </TableRow>
      ))}
    </TableBody>
  )}
</Table>
```

### Modals/Dialogs
```tsx
// Must have: focus trap, escape to close, backdrop click, animations
<Dialog 
  onClose={handleClose}
  className="animate-in fade-in-0 zoom-in-95 duration-200"
>
  <DialogContent>
    {isLoading ? <DialogSkeleton /> : children}
  </DialogContent>
</Dialog>
```

---

## PHASE 4: Landing Pages

### utap-vendors — REWORK existing landing page
**Purpose**: Marketing page to attract vendors
**Theme**: Emerald green gradient (`#10B981` → `#059669`)

**Structure**:
```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Features | Pricing | [Start selling]       │
├─────────────────────────────────────────────────────────────┤
│  HERO                                                       │
│  "Sell to students. Effortlessly."                         │
│  Subline about reaching campus customers                   │
│  [Start selling]  [See how it works]                       │
│  Hero image: vendor serving students                       │
├─────────────────────────────────────────────────────────────┤
│  SOCIAL PROOF: "X vendors | X students | X universities"   │
├─────────────────────────────────────────────────────────────┤
│  FEATURES (3-4 cards/bento):                               │
│  - Store management                                         │
│  - Real-time orders                                         │
│  - Promotions & deals                                       │
│  - Instant payouts                                          │
├─────────────────────────────────────────────────────────────┤
│  HOW IT WORKS (3 steps):                                   │
│  1. Sign up → 2. Add products → 3. Start selling           │
├─────────────────────────────────────────────────────────────┤
│  TESTIMONIALS: Vendor quotes                               │
├─────────────────────────────────────────────────────────────┤
│  FAQ: Accordion with common questions                      │
├─────────────────────────────────────────────────────────────┤
│  FINAL CTA: "Ready to reach campus?" [Start selling]       │
├─────────────────────────────────────────────────────────────┤
│  FOOTER: Links | Contact | Social | Legal                  │
└─────────────────────────────────────────────────────────────┘
```

Use `/find-free-stock-image` for: food vendor, campus cafe, small business owner

---

### utap-admin — NO MARKETING HERO NEEDED
**Purpose**: Internal tool for uTap staff
**Approach**: Skip marketing landing page. Go straight to login or dashboard.

**If there's a landing page currently**: Remove marketing fluff, keep it minimal:
- Logo
- "uTap Admin Console"
- [Sign in] button
- That's it

**Focus admin polish on**:
- Dashboard widgets and charts
- Data tables (orders, vendors, users, payouts)
- Forms and filters
- Empty states for no-data scenarios

---

### utap-app — CREATE a landing page (if doesn't exist)
**Purpose**: Marketing page for students (could be web page or in-app onboarding)
**Theme**: Green gradient matching app theme

**If creating as a web landing page**:
```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Features | Download                         │
├─────────────────────────────────────────────────────────────┤
│  HERO                                                       │
│  "Your campus card. Now digital."                          │
│  "Tap in. Order up. Skip the queue."                       │
│  [Download for iOS] [Download for Android]                 │
│  Phone mockup showing app                                   │
├─────────────────────────────────────────────────────────────┤
│  FEATURES:                                                  │
│  - Digital student card (NFC)                              │
│  - uShop marketplace                                        │
│  - uGig events & sports                                     │
│  - Order tracking                                           │
├─────────────────────────────────────────────────────────────┤
│  HOW IT WORKS:                                              │
│  1. Download → 2. Scan your card → 3. Tap anywhere         │
├─────────────────────────────────────────────────────────────┤
│  FOOTER: Links | Support | Social                          │
└─────────────────────────────────────────────────────────────┘
```

**If creating as in-app onboarding** (React Native):

Each carousel screen MUST have:
1. **Illustration or image** (top 50-60% of screen)
2. **Headline** (bold, 1 line)
3. **Subtext** (2-3 lines max, explains the benefit)
4. **Progress dots** (shows position in carousel)
5. **Skip button** (top right, all screens except last)
6. **Next/Get Started button** (bottom, always visible)

**4-Screen Content:**

| Screen | Illustration | Headline | Subtext |
|--------|--------------|----------|---------|
| 1 | Student tapping phone on terminal | **"Your card, digitized."** | "No more digging for your student card. Just tap your phone to check in, pay, and access campus." |
| 2 | Food ordering on phone | **"Order ahead. Skip the queue."** | "Browse menus from campus vendors. Pay in-app. Walk in and grab your food—no waiting." |
| 3 | Student at campus event | **"Stay in the loop."** | "Sports, parties, study groups—see what's happening on campus and book your spot." |
| 4 | Hand holding phone with checkmark | **"Ready to tap in?"** | "Scan your student card once to get started. Takes 10 seconds." |

**Screen 4 CTA:** "Get started" (primary button, leads to card scanning)

**Layout Structure:**
```
┌─────────────────────────────────────────┐
│                              [Skip]     │
│                                         │
│         ┌───────────────────┐          │
│         │                   │          │
│         │   ILLUSTRATION    │          │
│         │   (image/lottie)  │          │
│         │                   │          │
│         └───────────────────┘          │
│                                         │
│         Your card, digitized.          │
│                                         │
│    No more digging for your student    │
│    card. Just tap your phone to        │
│    check in, pay, and access campus.   │
│                                         │
│              ● ○ ○ ○                   │
│                                         │
│         ┌─────────────────┐            │
│         │      Next       │            │
│         └─────────────────┘            │
└─────────────────────────────────────────┘
```

**Interactions:**
- Swipe left/right to navigate
- Auto-advance: NO (let user control pace)
- Progress dots are tappable
- "Skip" goes directly to screen 4
- Screen 4: "Get started" button (no skip)

Use `/find-free-stock-image` for: student with phone, campus food court, university event, mobile payment

---

## PHASE 5: Execution Order

### Order of Operations:

**1. utap-vendors** (web — fastest iteration)
```
a. Audit all components (find missing states)
b. Fix loading/empty/error states across all pages
c. Polish interactive states (hover, focus, transitions)
d. Rework landing page with proper structure
e. Test dark mode
f. Verify accessibility (keyboard nav, focus rings)
```

**2. utap-admin** (web — similar patterns)
```
a. Audit all components
b. Fix loading/empty/error states (especially tables)
c. Polish interactive states
d. Simplify landing to login-focused (remove marketing fluff)
e. Focus on dashboard and data table polish
f. Test dark mode
```

**3. utap-app** (mobile — most complex)
```
a. Audit all screens
b. Add haptic feedback to all touchable elements
c. Fix loading states (use skeletons, not ActivityIndicator)
d. Polish animations with Reanimated
e. Ensure all empty states follow the pattern
f. Create onboarding or landing page if missing
g. Test dark mode on actual device
h. Test NFC feedback states (scanning, success, error)
```

---

## TECHNOLOGY REFERENCE

### utap-app (React Native / Expo)
| Purpose | Package |
|---------|---------|
| Styling | NativeWind (Tailwind for RN) |
| UI Components | React Native Paper |
| Animations | react-native-reanimated |
| Haptics | expo-haptics |
| Icons | @expo/vector-icons (Ionicons) |
| Fonts | Poppins via expo-font |
| Theme | PaperProvider with custom theme in App.js |

### utap-vendors (Vite + React)
| Purpose | Package |
|---------|---------|
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Toasts | sonner or react-hot-toast |
| Charts | Recharts |

### utap-admin (Vite + React + TypeScript)
| Purpose | Package |
|---------|---------|
| Styling | Tailwind CSS |
| UI Primitives | Radix UI |
| Icons | lucide-react or heroicons |
| Toasts | sonner |
| Charts | Recharts |

---

## QUALITY CHECKLIST (Before marking any component "done")

### States
- [ ] Loading state exists and matches content layout
- [ ] Empty state exists with friendly copy + CTA
- [ ] Error state exists with clear message + recovery action
- [ ] All interactive states implemented (hover/pressed, focus, disabled)

### Polish
- [ ] Animations are smooth (150-300ms)
- [ ] Transitions use ease-out or spring
- [ ] No jarring layout shifts
- [ ] Consistent spacing (use design tokens)

### Accessibility
- [ ] Focus rings visible on keyboard navigation
- [ ] ARIA labels on icon-only buttons
- [ ] Touch targets minimum 44x44 (mobile)
- [ ] Color contrast passes WCAG AA

### Mobile-Specific (utap-app)
- [ ] Haptic feedback on key actions
- [ ] Safe areas handled properly
- [ ] Pull-to-refresh where appropriate
- [ ] Keyboard avoiding on forms

### Dark Mode
- [ ] Tested in dark mode
- [ ] Colors look intentional (not just inverted)
- [ ] Text readable on dark backgrounds

### Copy
- [ ] Follows voice guidelines (human, short, specific, calm)
- [ ] No banned words (loading..., submit, please wait)
- [ ] CTAs are outcome-focused verbs

---

## BEGIN

1. List all 3 app directories
2. Audit component/page structures in each
3. Identify missing states and polish opportunities
4. Work through apps in order: vendors → admin → app
5. For images, use `/find-free-stock-image` skill

**Preserve the existing green theme. Elevate the polish. Ship something that feels premium.**

**GO.**
