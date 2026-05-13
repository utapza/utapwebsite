# Platform feature inventory — utap-apps & utap-vendors

**Purpose**  
Single inventory of **user-facing** capabilities surfaced in the **utap-apps** (React Native / Expo student app) and **utap-vendors** (React / Vite vendor web app) codebases, grouped by app → screen/module → feature. Use it to design **feature bundles** and **billing packages** (one-off or recurring); this document does **not** rank or bundle features.

**Method**  
Static code audit of repository paths `/Users/nonwork/dev/utap-apps` and `/Users/nonwork/dev/utap-vendors` (navigation, screens/pages, major components, and representative services) as of **2026-05-12**. No claim of exhaustive manual QA of every branch or runtime path.

**Abbreviations**  
- **NFC (Near Field Communication):** short-range contactless chip/tap between phone and card or reader.  
- **KPI (Key Performance Indicator):** summary business metric.  
- **IANA (Internet Assigned Numbers Authority):** standard timezone name registry (e.g. `Africa/Johannesburg`).  
- **PDF (Portable Document Format):** document format for tickets.  
- **RPC (Remote Procedure Call):** database stored procedure invoked by name (e.g. payout request).

---

## Part A — utap-apps (student / mobile)

**Shell & global behaviour**

| Area | Feature | User can do / sees |
|------|-----------|-------------------|
| **App entry / providers** | Loading gate while auth resolves | Sees full-screen spinner until session is known. |
| **Navigation** | Auth vs main stack | Unauthenticated: auth stack. Authenticated: bottom tabs + stack screens (card detail, store, order, scan). |
| **Navigation** | Password recovery mode | When recovery is active, only **Reset password** stack screen is shown until flow completes. |
| **Feature policy** | Tab and NFC gates | Tabs (Cards, Ushop, uGig, Profile, Orders) and NFC scan/write can be hidden per merged policy (build + university + profile). |
| **Feature policy** | Screen guard | Visiting a stack screen for a disabled feature replaces route with **Main** (tabs). |

---

### A1 — Authentication stack

| Screen / flow | Functional area | Feature | User actions & interactions |
|---------------|-----------------|---------|------------------------------|
| **Login** | Auth | Email + password sign-in | Enter email/password, toggle password visibility, submit, read field/general errors, open **Forgot Password**, switch to **Register**. |
| **Register** | Auth + profile bootstrap | Account creation with campus context | Enter display name, email, password + confirm, **South African cellphone** (10 digits starting with 0), **student number**, pick **university** from loaded list (menu), submit registration, handle validation errors, navigate back to login. |
| **Forgot password** | Auth | Email reset request | Enter email, submit; on success see confirmation and **Back to Login**; handles “user not found” style errors. |
| **Update password** (recovery) | Auth | Set new password after deep link | Enter new + confirm password (min 8 chars), submit; on success finishes recovery and signs out (per implementation). |

---

### A2 — Main tabs (bottom navigation)

| Tab (screen) | Functional area | Feature | User actions & interactions |
|--------------|-----------------|---------|------------------------------|
| **Cards** (`HomeScreen`) | Wallet / NFC | Card list | Scroll wallet; tap card → **Card details**; see count in header; loading state “Loading your wallet…”. |
| **Cards** | NFC | Device NFC support check | On focus, checks support; shows inline warning if NFC unavailable. |
| **Cards** | NFC scan (policy + device) | Add card via scan | **FAB** “Scan Card” / empty-state “Scan Your First Card”: confirm alert, hold card, dialog “Scanning…”, **Cancel** aborts native scan; duplicate-card and failure alerts. |
| **Cards** | Empty state | No cards | Copy adapts if NFC off, device unsupported, or scan encouraged; optional scan CTA when allowed. |
| **Ushop** | Marketplace discovery | Store listing for profile university | Pull-to-refresh; loads categories + campus list; default campus selection. |
| **Ushop** | Search & filters | Find stores/products | **Search bar** (switches to combined store+product search mode); **category** menu; **campus** menu (including “all campus” behaviour per implementation); **clear filters** control. |
| **Ushop** | Store availability | Open/closed hints | Each store card can show availability chip/row from `storeAvailabilityService` (ordering open vs blocked). |
| **Ushop** | Navigation | Enter store | Tap store card → **Store detail**; from search, tap product → store detail with product pre-selected. |
| **Ushop** | Deals (data-driven) | Promo badge on card | If `storeHasDeal` + `storeDealLabel`, deal strip on card artwork. |
| **Ushop** | Contact on card | Store contact block | When phone/email/owner present, compact “Contact details” section on card. |
| **uGig** | Sports marketplace | Sports-filtered stores | Search bar; pull-to-refresh; result counts; clear search on empty; navigates to **Store detail** on tap. |
| **uGig** | Gating | University required | If profile has no `university_id`, full-screen prompt to open **Profile** tab. |
| **Profile** | Identity | Avatar + display | Initials avatar, display name, email, university name + location when present. |
| **Profile** | Campus | Paid university change | Card explains fee; **Change university (R100)** opens dialog: radio list of other universities, **Cancel** / **Pay & switch**; loads universities list; **Yoco** checkout in embedded web checkout; success refreshes profile and alerts. |
| **Profile** | Shortcuts | Quick navigation | If Orders tab enabled: jump to Orders tab; if Cards enabled: jump to Cards tab. |
| **Profile** | Placeholder | Account security row | “Password and sign-in (coming soon)” list row (disabled). |
| **Profile** | Session | Logout | Confirm dialog, loading state on button. |
| **Orders** | Orders list | Tab: **My Orders** | Header styling; pull-to-refresh; **status filter** menu anchored to chip showing current filter: **All**, **Pending**, **Confirmed**, **Preparing**, **Ready**, **Completed**, **Cancelled**. |
| **Orders** | Order row | Order summary card | Order number, date, status chip, store block, totals (full or discount breakdown: subtotal, discount, “you paid”), pickup code, delivery method label, ready time / estimated wait, payment status row, special instructions block. |
| **Orders** | Order actions | View / cancel | **View details** → **Order detail**; **Cancel order** when status `pending` with confirm. |
| **Orders** | Tickets list | Tab: **My Tickets** | Segmented control **Orders** vs **Tickets**; ticket cards show linked order, pricing breakdown when present, **View ticket** opens **PDF** URL via system browser (`Linking`). |
| **Orders** | Empty states | No data | Different copy for orders vs tickets; optional clear of status filter on orders empty. |

---

### A3 — Stack screens (non-tab)

| Screen | Functional area | Feature | User actions & interactions |
|--------|-----------------|---------|------------------------------|
| **Card details** | Wallet | Card presentation | Cover image (placeholder URL pattern), fields: student ID, university, faculty, expiry, optional additional info. |
| **Card details** | CRUD | Edit / delete / NFC write | **Edit card** → **Add card** with `editCard`; **Delete** with confirm dialog; **Write to tag** (policy `nfcWrite`): dialog instructions, **Start** writes via native NFC; cancel NFC from alert. |
| **Add card** | CRUD | Manual add or edit | Form: name, student ID, university, faculty, expiry (text + **date picker** icon), additional info multiline; validation errors; **Add/Update** vs **Cancel**; scanned flow shows highlighted “NFC scanned” banner when `isScanned`. |
| **Store detail** | Catalog | Store hero & meta | Store logo, gradient overlay, category badge, name, building/location, description, tag pills (up to 4), refresh on pull. |
| **Store detail** | Availability | Ordering blocked banner | If store not accepting orders, informational banner while browsing. |
| **Store detail** | Catalog | Product list | Search products; **category** menu; **sort** menu (name A-Z, price low/high, fastest first); clear filters; tap product → **Product order** (disabled tap when ordering blocked per `ProductCard`). |
| **Product order** | Commerce | Quantity & instructions | Increment/decrement quantity within stock; **order-level** special instructions; **per-line** product instructions text fields. |
| **Product order** | Promotions | Voucher entry | Voucher text field, **Apply** (validates via `promotionService`); auto re-validation when quantity changes; shows promotion refresh warning string on soft failure. |
| **Product order** | Pricing | Running totals | Subtotal/discount/total display paths tied to promotion summary; note copy references **Yoco** checkout amount. |
| **Product order** | Checkout | Place order + pay | **Place Order & Pay** creates order then **Yoco** checkout URL; handles store closed / cutoff errors with reason-specific alerts; **YocoCheckoutWebView** for payment; disabled label when ordering blocked. |
| **Order detail** | Post-purchase | Read-only detail | Same style of header as list: status, store, totals, pickup code, delivery method, pickup time, line items, special instructions (as implemented); **Go back** on missing order. |
| **Scan NFC** | NFC / MIFARE | Dedicated scan workflow | Start scan (with Expo Go / module guard messaging on unsupported builds); Android native **card scanned** listener path; iOS read path; **Cancel** while scanning; **Save to Supabase** / wallet flows; **debug** modal for raw scan; **Add to wallet** via modal; navigate **Add card** manual path buttons; `AddCardModal` integration. |
| **Scan NFC** | Observability | Error reporting | User-visible alerts; Sentry capture on certain failures (implementation-specific). |

**Note on `Scan` screen**  
`ScanNFCScreen` is registered on the root stack as `Scan`, but **no in-app `navigation.navigate('Scan')` call was found** in the audited paths—entry may be via deep link, future UI, or tooling. It remains part of the registered surface.

---

### A4 — Card list item (`CardItem` component)

| Feature | User actions & interactions |
|---------|------------------------------|
| **Open card** | Tap card → parent `onPress` (navigate to details). |
| **Preview fields** | Name, university, ID, faculty, expiry on card face. |
| **Android: NFC emulation** | **Emulate card** button: starts emulation with native module; success alert offers **Stop emulation**; errors if unsupported or write fails. |
| **iOS: QR fallback** | **Show QR code** opens modal with **QR code** payload (student identity JSON), student ID text, hint, **Close**. |

---

### A5 — Supporting components & services (user-visible outcomes)

| Item | Role |
|------|------|
| **`YocoCheckoutWebView`** | In-app browser checkout for **orders** and **university change** payments. |
| **`SearchResultCard`** | Unified list row for mixed product/store search in Ushop. |
| **`ProductCard` (apps)** | Respects `orderingDisabled` to reflect closed store. |
| **`AddCardModal`** | Modal editor used from scan flow for confirming parsed card fields. |
| **`NFCScanner.js`** | Standalone modal scanner component — **not referenced** elsewhere in the audited tree (still a shipped UI primitive). |
| **`PremiumCardWallet.js`** | Alternate wallet presentation — **not referenced** in audited navigation/screens. |
| **`SettingsScreen.js`** | Full settings screen file exists — **not mounted** in `AppNavigator` (no route found). |
| **`stripePaymentService.js`** | Service module exists; **student checkout path audited uses Yoco**, not this service, for product orders. |

---

## Part B — utap-vendors (vendor / web)

**Shell & global behaviour**

| Area | Feature | User can do / sees |
|------|---------|---------------------|
| **Initial load** | Auth + vendor bootstrap | Full-page “Loading…” until auth and vendor profile resolve (first load). |
| **Routing** | Public vs authenticated | Public layout for marketing + contact + password reset + payment result URLs; `/login` redirects if already signed in; `/dashboard/*` requires user; vendor-less user sees **Vendor setup** (or loading). |
| **Dashboard layout** | Responsive chrome | Desktop sidebar + mobile top bar + bottom icon nav; **Sign out** in sidebar and mobile header. |
| **Realtime** | Live order refresh | `OrdersPage` and `DashboardOverview` subscribe to Supabase `postgres_changes` on `orders` for the vendor where implemented. |

---

### B1 — Public marketing & support (`PublicLayout` routes)

| Page | Functional area | Feature | User actions & interactions |
|------|-----------------|---------|------------------------------|
| **Landing (`/`)** | Marketing | Hero, value props, benefits list, university logos strip, testimonials, CTA sections | Read content; follow in-page links/buttons as built (e.g. toward login). |
| **About (`/about`)** | Marketing | Static story / team-style page | Read. |
| **Contact (`/contact`)** | Lead / support | Contact form | Name, email, company, subject, message, inquiry type; submit sends transactional email when env configured; fallback message to mail **support@utap.co.za**; success/error states. |
| **Contact** | Static contact cards | Email / phone / chat blurbs | Display-only cards (chat CTA is presentational unless wired elsewhere). |
| **Contact** | Office list | Regional office blocks | Display addresses/phones/emails. |
| **Reset password (`/reset-password`)** | Auth | Password reset completion | Validates session / recovery event; set password + confirm; submit; redirects to login; invalid link messaging. |
| **Payment result (`/payment/:status`)** | Payments | Order checkout return | Success / cancelled / failed messaging for **Yoco**; optional `orderId` query display; **Back to uTap** link. |
| **Payment result (`/payment/university-change/:status`)** | Payments | University-change return | Variant copy for success/fail/cancel referencing app profile update. |

---

### B2 — Authentication (`/login`, `/setup`)

| Screen | Functional area | Feature | User actions & interactions |
|--------|-----------------|---------|------------------------------|
| **Auth page** | Auth | Login vs sign-up toggle | Switch between **LoginForm** and **SignupForm** without route change. |
| **Login form** | Auth | Email/password | Submit, show errors, toggle password visibility, link to register mode. |
| **Signup form** | Auth + onboarding fields | Registration UI | Collects full name, email, password, **store name**, **university**, **store type**, **phone**; submits `supabase.auth.signUp` (vendor record may be created by backend trigger—user sees success path / errors). |
| **Vendor setup** | Onboarding | First vendor + store creation | Multi-field form: vendor name, store name/description, **university** → loads **campuses**, **store category**, building, owner name, contact email/phone; **Sign out**; submit creates vendor + initial store via `createVendor`; validation (campus required). |

---

### B3 — Dashboard tabs (`/dashboard/*` single-page shell)

#### B3.1 — Dashboard (overview)

| Feature | User actions & interactions |
|---------|------------------------------|
| **Welcome header** | Vendor name, active store count, university coverage counts (desktop card). |
| **Date range** | Toggle KPI range: **7d / 14d / 30d** buttons. |
| **Finance snapshot strip** | Shows available balance, pending payout, link **Earnings & payouts →**. |
| **KPI cards** | Net vendor revenue, orders count, avg order value, paid/total conversion %, in-progress orders, catalog product count; month-on-month deltas where available. |
| **Chart** | Line chart: daily orders + vendor net; empty state when no series data; **Recharts** tooltips/legend. |
| **Quick actions** | Buttons jump shell tab: **Products**, **Orders**, **Earnings**, **Stores**. |
| **Recent orders** | List of recent order number, status, payment status, timestamp, vendor net. |
| **Low stock alert** | When products ≤5 stock, pill list + **Manage products** link. |
| **Error + retry** | Failed stats load shows error panel + **Retry**. |

#### B3.2 — Stores

| Feature | User actions & interactions |
|---------|------------------------------|
| **List stores** | Grid of `StoreCard` entries. |
| **Add store** | Opens modal `StoreForm` (fields include name, description, **university** → **campus**, **store category**, building, comma-separated **tags**, owner name, email, phone, **active** toggle, **logo** file upload with preview + URL fields, embedded **ordering hours & cutoff** section same as availability page); empty state CTA **Open a store**. |
| **Edit store** | From card, open form with existing data (same field set, including weekly hours load for edits). |
| **Delete store** | Confirm browser dialog; destructive messaging in copy. |
| **Save pipeline** | On save: create/update store then persist **weekly hours** schedule via `persistStoreWeeklyHours`. |
| **Cross-link copy** | Page explains **Hours & orders** sidebar for ordering rules. |

#### B3.3 — Hours & orders (`StoreAvailabilityPage`)

| Feature | User actions & interactions |
|---------|------------------------------|
| **Store selector** | Pick which store to edit. |
| **Timezone** | IANA text field (default `Africa/Johannesburg`). |
| **Operational mode** | Select: open / closing soon / closed / pause new orders. |
| **Cutoff buffer** | Minutes-before-close numeric buffer (optional = platform default). |
| **Closing soon lead** | Minutes hint for UX messaging. |
| **Pause until** | `datetime-local` optional pause end. |
| **Weekly hours** | Per weekday enable + open/close time rows (`StoreOrderingHoursSection`). |
| **Save** | Persists store patch + weekly hours; success/error banners. |
| **Empty state** | Prompt to create store first. |

#### B3.4 — Products

| Feature | User actions & interactions |
|---------|------------------------------|
| **Paginated grid** | Page size 12; prev/next pagination controls. |
| **Search** | Debounced text search across name + description (`ilike`). |
| **Filters** | Category dropdown (dynamic from existing product categories), status filter (all/active/inactive). |
| **Sort** | `created_at` vs `name`. |
| **Add product** | Opens `ProductForm` modal. |
| **Edit / delete** | From cards; delete confirm. |
| **Product form** | Fields include: store picker, name, description, **price**, **product category**, **ingredients** (especially for food category), **prep / waiting time**, **availability window** preset (`all-day`, `morning`, etc.), **stock qty**, **active** toggle, **event ticket** toggle, **image upload** (file picker, 5MB image types, preview) with Supabase storage upload, optional custom fields in remainder of form file; new products set to `pending_review` status on save. |

#### B3.5 — Orders (vendor fulfillment)

| Feature | User actions & interactions |
|---------|------------------------------|
| **Date range** | `dateFrom` / `dateTo` pickers + **Last 90 days** reset. |
| **Status tabs** | All, Confirmed, Preparing, Ready, Completed with counts. |
| **Pagination** | Page N of M with chevrons; scroll to top on page change. |
| **Order cards** | Show totals, payment method string, pickup code, delivery method badge, line items. |
| **Status progression** | Primary button advances: pending→confirmed→preparing→ready→completed (implementation updates `pickup_time` when moving to **ready**). |
| **Realtime refresh** | List updates on order table changes. |

#### B3.6 — Customers

| Feature | User actions & interactions |
|---------|------------------------------|
| **Aggregate stats** | Unique paid buyers, new (one paid order), repeat (two+). |
| **Segment filter** | Buttons: All / New / Repeat. |
| **Sort** | Dropdown: last paid, lifetime spend, paid order count. |
| **Table** | Rows with derived display name, counts, spend, first/last paid timestamps. |

#### B3.7 — Promotions

| Feature | User actions & interactions |
|---------|------------------------------|
| **List promotions** | Cards showing saved promotions (read-oriented list). |
| **Create promotion** | Form: name, type (**voucher** vs **app discount**), conditional voucher code, discount type (% vs fixed), values, max discount, min order, start/end datetime, usage limits, per-user limit, **stackable** checkbox, optional **target** (all stores / one store / product category) + target picker; **Save** / **Cancel**. |

#### B3.8 — Earnings

| Feature | User actions & interactions |
|---------|------------------------------|
| **Balance metrics** | Available, lifetime earned, pending payouts, paid out (from `vendor_finance_balances`). |
| **Recent earnings table** | Gross, Yoco fee, platform fee, vendor net, status per earning row. |
| **Payout history** | Recent payout requests with fees + status. |
| **Request payout** | Enter amount, submit → `request_vendor_payout` **RPC**; success message + reload. |

#### B3.9 — Banking

| Feature | User actions & interactions |
|---------|------------------------------|
| **Load / save bank account** | Single active account form: holder, bank name, account type (business/current/savings/transmission), account number, branch code; create vs update. |

#### B3.10 — Settings

| Feature | User actions & interactions |
|---------|------------------------------|
| **Sub-nav** | Tabs: Store profile, Account, Notifications, Security. |
| **Store profile** | If multiple stores: picker; edit name, description, **store type**, **university**, phone, **logo URL** (paste/URL style field with upload icon in UI); save with success toast-style message. |
| **Account** | Update vendor **name** + **email** (attempts Supabase auth email change when different); **change password** form; **email me a reset link** button. |
| **Notifications / Security** | Placeholder panels: “coming soon”. |

---

### B4 — Present in vendor repo but not wired to current router

| File / component | Notes |
|------------------|-------|
| **`src/components/home/HomePage.tsx`** | Marketing-style page exists; **not imported** in `App.tsx` routes. |
| **`src/components/analytics/AnalyticsPage.tsx`** | Analytics UI exists; **not included** in `Dashboard.tsx` tab switch. |

---

## Part C — Cross-app flows touching both surfaces

| Flow | utap-apps | utap-vendors / web |
|------|-----------|---------------------|
| **Student pays for food/product** | Browse → order → **Yoco** in-app webview. | Vendor sees order, updates status; earnings/payout data updates. |
| **Student changes university (paid)** | Profile dialog + **Yoco** checkout. | `PaymentResultPage` under `/payment/university-change/:status` shows result + reference id. |
| **Store hours / pause / cutoff** | Student sees availability + blocked ordering in Ushop/store/product flows. | Vendor edits **Hours & orders** (+ optional overlap in store form). |
| **Promotions** | Student applies voucher on **Product order**. | Vendor creates promotions + targets. |

---

## Part D — Inventory gaps & honesty

- **Runtime-only features** (push notifications, deep links, OS permission prompts) may exist beyond what static routing shows.  
- **Backend-only capabilities** (email templates, cron, admin-only tools) are out of scope for this “user-facing app shell” inventory unless the app exposes them.  
- **Third-party dashboards** (Supabase studio, Yoco merchant portal) are not duplicated here.

---

*End of inventory document.*
